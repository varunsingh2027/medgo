import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, service, message } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject: subject || `${service ? service.charAt(0).toUpperCase() + service.slice(1) : 'General'} Inquiry`,
      service,
      message,
      ipAddress,
      userAgent,
      source: 'website'
    });

    // Send confirmation email to user
    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting PharmaExport-Distributor',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">Thank you for your inquiry!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
              <p><strong>Subject:</strong> ${contact.subject}</p>
              ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
              <p><strong>Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-left: 3px solid #2c5aa0;">${message}</p>
            </div>
            
            <p>In the meantime, you can:</p>
            <ul>
              <li>Browse our product catalog</li>
              <li>Read our latest health tips and news</li>
              <li>Contact us directly at +91-9311459973</li>
            </ul>
            
            <p>Best regards,</p>
            <p><strong>PharmaExport-Distributor Team</strong></p>
            <p>Email: varunsingh04.online@gmail.com</p>
            <p>Phone: +91-9311459973</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('User confirmation email failed:', emailError);
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'varunsingh04.online@gmail.com',
        subject: `New Contact Form Submission - ${contact.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc3545;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${contact.subject}</p>
              ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p>${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 5px;">
              <p style="margin: 0;"><strong>Technical Info:</strong></p>
              <p style="margin: 5px 0; font-size: 12px;">IP: ${ipAddress}</p>
              <p style="margin: 5px 0; font-size: 12px;">User Agent: ${userAgent}</p>
            </div>
            
            <p style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Re: ${contact.subject}" 
                 style="background-color: #2c5aa0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Reply to Customer
              </a>
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Admin notification email failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        contactId: contact._id,
        status: contact.status,
        submittedAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error submitting your message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const service = req.query.service;
    const search = req.query.search;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (service) filter.service = service;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email')
      .lean();

    const total = await Contact.countDocuments(filter);

    // Get statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        },
        statistics: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

// @desc    Get single contact (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { contact }
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact'
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContact = async (req, res) => {
  try {
    const { status, priority, assignedTo, responseMessage, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (responseMessage) {
      updateData.responseMessage = responseMessage;
      updateData.responseDate = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Add note if provided
    if (notes) {
      contact.notes.push({
        message: notes,
        addedBy: req.user.id,
        addedAt: new Date()
      });
      await contact.save();
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact'
    });
  }
};

// @desc    Delete contact (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
};
