import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdownName, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleNavigation = (targetId, e) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Close any active dropdowns
    setActiveDropdown(null);

    // Smooth scroll to target section with offset for sticky header
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 120; // Height of sticky header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDropdownNavigation = (targetId, e) => {
    e.preventDefault();
    e.stopPropagation();

    // Close mobile menu and dropdowns
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    // Smooth scroll to target section with offset for sticky header
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 120; // Height of sticky header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* First Header Component - Language dropdown, middle links, social icons - WILL SCROLL AWAY */}
      <div className="header-top">
        <div className="container">
          {/* Left Section - Language Dropdown */}
          <div className="header-top-left">
            <div className="language-dropdown">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="language-dropdown"
              >
                <option value="Select Language" disabled>
                  Select Language
                </option>
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
                <option value="Punjabi">ਪੰਜਾਬੀ</option>
              </select>
            </div>
          </div>

          {/* Center Section - Middle Links */}
          {/* <div className="header-top-center">
            <div className="top-center">
              <a href="#track-parcel" className="top-link">Track Parcel</a>
              <a href="#helpdesk" className="top-link">Helpdesk</a>
              <a href="#review" className="top-link">Review</a>
            </div>
          </div> */}

          {/* Right Section - Social Media Icons */}
          <div className="header-top-right">
            <div className="social-icons">
              <a
                href="#facebook"
                className="social-icon facebook"
                aria-label="Facebook"
              >
                <span className="icon-fb">f</span>
              </a>
              <a
                href="#instagram"
                className="social-icon instagram"
                aria-label="Instagram"
              >
                <span className="icon-ig"></span>
              </a>
              <a
                href="#twitter"
                className="social-icon twitter"
                aria-label="Twitter"
              >
                <span className="icon-tw"></span>
              </a>
              <a
                href="#linkedin"
                className="social-icon linkedin"
                aria-label="LinkedIn"
              >
                <span className="icon-li">in</span>
              </a>
              <a
                href="#youtube"
                className="social-icon youtube"
                aria-label="YouTube"
              >
                <span className="icon-yt"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header - WILL STAY FIXED */}
      <header className="header-sticky-wrapper">
        {/* Second Header Component - Email, Contact, Logo, Get a Quote */}
        <div className="header-middle">
          <div className="container">
            {/* Contact Info - Left */}
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div className="contact-details">
                  <span>MAIL US TODAY</span>
                  <span>info@medgo.com</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <span>CALL US FOR MORE DETAILS</span>
                  <span>+91-9311459973</span>
                </div>
              </div>
            </div>

            {/* Logo - Center */}
            <div className="logo-section">
              <div className="logo">
                <div className="logo-container">
                  <img src={logo} alt="" className="logoImage" />
                  <div className="logo-text">
                    <div className="logo-line">MEDGO LLP</div>
                    <div className="logo-line"></div>
                  </div>
                </div>
                <p className="tagline">Your Health, Our Priority</p>
              </div>
            </div>

            {/* Get Quote Button - Right */}
            <div className="quote-section">
              <button className="get-quote-btn">Get a Quote</button>
            </div>
          </div>
        </div>

        {/* Third Header Component - Main Navigation */}
        <div className="header-bottom">
          <div className="container">
            <nav className="main-navigation">
              <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                <li>
                  <a
                    href="#home"
                    className="nav-link"
                    onClick={(e) => handleNavigation("home", e)}
                  >
                    <span className="nav-icon">🏠</span>Home
                  </a>
                </li>

                <li className="dropdown">
                  <a
                    href="#about"
                    className="nav-link"
                    onClick={(e) => handleNavigation("about", e)}
                  >
                    <span className="nav-icon">ℹ️</span>About
                    <span className="dropdown-arrow">▼</span>
                  </a>
                  <span
                    className={`mobile-dropdown-toggle ${
                      activeDropdown === "about" ? "active" : ""
                    }`}
                    onClick={(e) => toggleMobileDropdown("about", e)}
                  >
                    ▼
                  </span>
                  <ul
                    className={`dropdown-menu ${
                      activeDropdown === "about" ? "mobile-show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleDropdownNavigation("about", e)}
                      >
                        Our Story
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleDropdownNavigation("about", e)}
                      >
                        Mission & Vision
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleDropdownNavigation("about", e)}
                      >
                        Our Team
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleDropdownNavigation("about", e)}
                      >
                        Awards & Certifications
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleDropdownNavigation("about", e)}
                      >
                        Customer Testimonials
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a
                    href="#categories"
                    className="nav-link"
                    onClick={(e) => handleNavigation("categories", e)}
                  >
                    Categories
                    <span className="dropdown-arrow">▼</span>
                  </a>
                  <span
                    className={`mobile-dropdown-toggle ${
                      activeDropdown === "categories" ? "active" : ""
                    }`}
                    onClick={(e) => toggleMobileDropdown("categories", e)}
                  >
                    ▼
                  </span>
                  <ul
                    className={`dropdown-menu ${
                      activeDropdown === "categories" ? "mobile-show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Medicines
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Supplements
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Medical Equipment
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Ayurvedic Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Surgical Instruments
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        onClick={(e) =>
                          handleDropdownNavigation("categories", e)
                        }
                      >
                        Diagnostic Kits
                      </a>
                    </li>
                  </ul>
                </li>

                {/* <li className="dropdown">
                  <a
                    href="#salt-manufacturer"
                    className="nav-link"
                    onClick={(e) => handleNavigation("salt-manufacturer", e)}
                  >
                    Salt & Manufacturer
                    <span className="dropdown-arrow">▼</span>
                  </a>
                  <span
                    className={`mobile-dropdown-toggle ${
                      activeDropdown === "salt-manufacturer" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      toggleMobileDropdown("salt-manufacturer", e)
                    }
                  >
                    ▼
                  </span>
                  <ul
                    className={`dropdown-menu ${
                      activeDropdown === "salt-manufacturer"
                        ? "mobile-show"
                        : ""
                    }`}
                  >
                    <li>
                      <a
                        href="#salt-manufacturer"
                        onClick={(e) =>
                          handleDropdownNavigation("salt-manufacturer", e)
                        }
                      >
                        Search by Salt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#salt-manufacturer"
                        onClick={(e) =>
                          handleDropdownNavigation("salt-manufacturer", e)
                        }
                      >
                        Search by Manufacturer
                      </a>
                    </li>
                    <li>
                      <a
                        href="#salt-manufacturer"
                        onClick={(e) =>
                          handleDropdownNavigation("salt-manufacturer", e)
                        }
                      >
                        Generic Alternatives
                      </a>
                    </li>
                    <li>
                      <a
                        href="#salt-manufacturer"
                        onClick={(e) =>
                          handleDropdownNavigation("salt-manufacturer", e)
                        }
                      >
                        Brand Comparison
                      </a>
                    </li>
                    <li>
                      <a
                        href="#salt-manufacturer"
                        onClick={(e) =>
                          handleDropdownNavigation("salt-manufacturer", e)
                        }
                      >
                        Drug Interactions
                      </a>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="dropdown">
                <a href="#consultation" className="nav-link">
                  Consultation 
                  <span className="dropdown-arrow">▼</span>
                </a>
                <span 
                  className={`mobile-dropdown-toggle ${activeDropdown === 'consultation' ? 'active' : ''}`}
                  onClick={(e) => toggleMobileDropdown('consultation', e)}
                >▼</span>
                <ul className={`dropdown-menu ${activeDropdown === 'consultation' ? 'mobile-show' : ''}`}>
                  <li><a href="#online-consultation">Online Consultation</a></li>
                  <li><a href="#book-appointment">Book Appointment</a></li>
                  <li><a href="#specialist-doctors">Specialist Doctors</a></li>
                  <li><a href="#health-checkup">Health Checkup Packages</a></li>
                  <li><a href="#prescription-upload">Upload Prescription</a></li>
                </ul>
              </li> */}

                {/* <li><a href="#generic" className="nav-link">Generic</a></li>
              <li><a href="#registration" className="nav-link">Registration</a></li>
              <li><a href="#blog" className="nav-link">Blog</a></li> */}

                <li className="dropdown">
                  <a
                    href="#contact"
                    className="nav-link"
                    onClick={(e) => handleNavigation("contact", e)}
                  >
                    Contact Us
                    <span className="dropdown-arrow">▼</span>
                  </a>
                  <span
                    className={`mobile-dropdown-toggle ${
                      activeDropdown === "contact" ? "active" : ""
                    }`}
                    onClick={(e) => toggleMobileDropdown("contact", e)}
                  >
                    ▼
                  </span>
                  <ul
                    className={`dropdown-menu ${
                      activeDropdown === "contact" ? "mobile-show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleDropdownNavigation("contact", e)}
                      >
                        Contact Form
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleDropdownNavigation("contact", e)}
                      >
                        Store Locations
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleDropdownNavigation("contact", e)}
                      >
                        Customer Support
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleDropdownNavigation("contact", e)}
                      >
                        Bulk Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleDropdownNavigation("contact", e)}
                      >
                        Feedback & Complaints
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
