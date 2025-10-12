import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"PharmaExport-Distributor" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
};

// Send bulk emails
export const sendBulkEmail = async (recipients, subject, content) => {
  try {
    const transporter = createTransporter();
    const results = [];

    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_FROM || `"PharmaExport-Distributor" <${process.env.EMAIL_USER}>`,
          to: recipient.email,
          subject: subject,
          html: content.replace(/{{name}}/g, recipient.name || 'Valued Customer')
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({
          email: recipient.email,
          success: true,
          messageId: info.messageId
        });
      } catch (error) {
        results.push({
          email: recipient.email,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Bulk email sending error:', error);
    throw new Error('Bulk emails could not be sent');
  }
};

// Email templates
export const emailTemplates = {
  welcome: (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2c5aa0; margin: 0;">Welcome to PharmaExport-Distributor!</h1>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-top: 0;">Hello ${name}!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Thank you for joining PharmaExport-Distributor, your trusted partner in pharmaceutical distribution and healthcare solutions.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          With our platform, you can:
        </p>
        <ul style="font-size: 16px; line-height: 1.8; color: #555;">
          <li>Browse our extensive catalog of pharmaceutical products</li>
          <li>Get competitive pricing for bulk orders</li>
          <li>Access detailed product information and certifications</li>
          <li>Connect with verified manufacturers and suppliers</li>
          <li>Request custom quotes for your specific needs</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'https://varunsingh2027.github.io/PharmaExport-Distributor'}" 
           style="background-color: #2c5aa0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Explore Our Platform
        </a>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
        <p style="color: #888; font-size: 14px; text-align: center;">
          Need help? Contact us at <a href="mailto:varunsingh04.online@gmail.com">varunsingh04.online@gmail.com</a> or call +91-9311459973
        </p>
      </div>
    </div>
  `,
  
  contactConfirmation: (name, subject, message) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c5aa0;">Thank you for contacting us!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: white; padding: 15px; border-left: 3px solid #2c5aa0;">${message}</p>
      </div>
      
      <p>Best regards,<br>PharmaExport-Distributor Team</p>
    </div>
  `,
  
  quoteRequest: (customerName, quoteNumber, items) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c5aa0;">Quote Request Confirmation</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your quote request. We have received your inquiry and will prepare a detailed quote for you.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Quote Details:</h3>
        <p><strong>Quote Number:</strong> ${quoteNumber}</p>
        <p><strong>Items Requested:</strong></p>
        <ul>
          ${items.map(item => `<li>${item.productName} - Quantity: ${item.quantity}</li>`).join('')}
        </ul>
      </div>
      
      <p>Our team will review your requirements and send you a competitive quote within 2-3 business days.</p>
      <p>Best regards,<br>PharmaExport-Distributor Team</p>
    </div>
  `
};
