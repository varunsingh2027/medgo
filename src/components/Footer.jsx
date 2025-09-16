import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>medgo</h3>
              <p>Your Healthcare Partner</p>
            </div>
            <p>
              Providing quality healthcare services for over two decades. Your
              health and well-being are our top priorities.
            </p>
            <div className="social-links">
              <a
                href="#"
                className="social-icon facebook"
                aria-label="Facebook"
                title="Facebook"
              >
                <span className="icon-fb">f</span>
              </a>
              <a
                href="#"
                className="social-icon twitter"
                aria-label="Twitter"
                title="Twitter"
              >
                <span className="icon-tw"></span>
              </a>
              <a
                href="#"
                className="social-icon instagram"
                aria-label="Instagram"
                title="Instagram"
              >
                <span className="icon-ig"></span>
              </a>
              <a
                href="#"
                className="social-icon linkedin"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <span className="icon-li">in</span>
              </a>
              <a
                href="#"
                className="social-icon youtube"
                aria-label="YouTube"
                title="YouTube"
              >
                <span className="icon-yt"></span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#appointments">Book Appointment</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#general">General Medicine</a>
              </li>
              <li>
                <a href="#vaccination">Vaccination</a>
              </li>
              <li>
                <a href="#laboratory">Laboratory Tests</a>
              </li>
              <li>
                <a href="#emergency">Emergency Care</a>
              </li>
              <li>
                <a href="#pharmacy">Pharmacy</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <span className="icon">📍</span>
              <div>
                <p>123 Medical Street</p>
                <p>New Delhi - 110001</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="icon">📞</span>
              <div>
                <p>+91-9311459973</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="icon">📧</span>
              <div>
                <p>info@medgo.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 medgo. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#disclaimer">Medical Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
