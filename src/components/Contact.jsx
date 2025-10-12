import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields (Name, Email, and Message).");
      setIsLoading(false);
      return;
    }

    // Create email content
    const emailSubject = `Contact Form: ${formData.name} - ${
      formData.service || "General Inquiry"
    }`;
    const emailBody = `Hello,

You have received a new message from your website contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Service Interest: ${formData.service || "General Inquiry"}

MESSAGE:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please reply directly to this email to respond to the customer.

Sent from: PharmaExport-Distributor Website
Time: ${new Date().toLocaleString()}`;

    try {
      // Create mailto link
      const mailtoLink = `mailto:varunsingh04.online@gmail.com?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      setTimeout(() => {
        alert(
          'Your email client should open with the message. Please click "Send" in your email application to complete the submission.'
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }, 500);
    } catch (error) {
      console.error("Error opening email client:", error);
      alert(
        "Unable to open email client. Please manually send an email to varunsingh04.online@gmail.com with your inquiry."
      );
    }

    setIsLoading(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>
            Ready to take the next step in your healthcare journey? Contact us
            today to schedule an appointment or ask any questions.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>
                123 Medical Street
                <br />
                Healthcare District
                <br />
                New Delhi - 110001
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>
                Main: +91-9311459973
                <br />
                Emergency: +91-9311459973
                <br />
                WhatsApp: +91-9311459973
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email Us</h3>
              <p>
                varunsingh04.online@gmail.com
                <br />
                appointment@medgo.com
                <br />
                emergency@medgo.com
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">🕒</div>
              <h3>Working Hours</h3>
              <p>
                Monday - Friday: 9:00 AM - 8:00 PM
                <br />
                Saturday: 9:00 AM - 6:00 PM
                <br />
                Sunday: Emergency Only
              </p>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="general">General Medicine</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="laboratory">Laboratory Tests</option>
                  <option value="specialized">Specialized Care</option>
                  <option value="emergency">Emergency Care</option>
                  <option value="pharmacy">Pharmacy Services</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your inquiry or appointment request..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Opening Email..." : "Send Message"}
              </button>

              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <p
                  style={{ fontSize: "14px", color: "#666", margin: "10px 0" }}
                >
                  Having trouble with the form?
                </p>
                <a
                  href="mailto:varunsingh04.online@gmail.com?subject=Contact%20Inquiry&body=Hi,%0D%0A%0D%0APlease%20enter%20your%20message%20here.%0D%0A%0D%0AThank%20you!"
                  style={{
                    color: "#2c5aa0",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Click here to email us directly
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
