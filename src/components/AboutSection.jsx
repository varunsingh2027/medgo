import React from "react";
import "./AboutSection.css";

const AboutSection = () => {
  const features = [
    {
      icon: "🚚",
      title: "Worldwide Shipping",
      description:
        "Get your medicine delivered to the desired destination on timely and safely.",
    },
    {
      icon: "💰",
      title: "Money Back Guarantee",
      description: "100% Money back guarantee on all lost or return parcel.",
    },
    {
      icon: "✅",
      title: "Product Quality",
      description:
        "All unprecedented generic products are 100% quality approved product.",
    },
    {
      icon: "🎧",
      title: "24*7 Customer Support",
      description:
        "Our Expert customer support team available 24x7 for quick response.",
    },
    {
      icon: "💲",
      title: "Best Price Guarantee",
      description: "Assurance of best price on all generic medicines.",
    },
  ];

  const whyChooseUs = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      ),
      title: "WHO GMP & ISO Certified",
      description: "",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="2" width="12" height="20" rx="6" />
          <path d="M12 6v6" />
          <circle cx="12" cy="16" r="1.5" />
        </svg>
      ),
      title: "Temperature-Controlled Supply Chain",
      description: "",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
        </svg>
      ),
      title: "Global Export Network",
      description: "",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 7h6" />
          <path d="M9 11h6" />
          <path d="M9 15h2" />
        </svg>
      ),
      title: "Transparent Documentation",
      description: "",
    },
  ];

  const brands = ["Natco", "Biocon", "Emcure", "Cipla", "Hetero", "Roche"];

  return (
    <section className="about-section" id="categories">
      <div className="container">
        {/* Main Content */}
        <div className="about-content">
          <h2>
            <span>BEST </span>
            <span>PHARMACEUTICAL </span>
            <span>EXPORTER </span>
            <span>AND </span>
            <span>SUPPLIER </span>
            <span>IN </span>
            <span className="highlight-india">INDIA</span>
          </h2>
          <p className="about-description">
            The accessible, simple and affordable medicines in no time! medgo,
            one of the world's leading suppliers/ exporters, has been known for
            providing affordable medicines globally around the world for so
            long. We aim to provide prescription medicines so that our customers
            can have smooth and seamless healthcare experience. Your health is
            of paramount importance to us so we cater to provide quality
            medicines at the cost that won't hamper your pocket. With so many
            medicines in the warehouse, we strive to deliver the best in class
            for our patients suffering from chronic ailments. medgo is your
            one-stop shop destination for medicines like Hepatitis B(HIV),
            Hepatitis C, AntiCancer, Ayurvedic, chronic Kidney disease,
            arthritis medicines. For many people around the globe, we have been
            one of the most trusted sources where they can find medicine they
            need for their ailment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us">
          <h2>Why Choose medgo?</h2>
          <div className="why-choose-row">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-choose-card">
                <div className="why-choose-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Brands Section */}
        <div className="brands-section">
          <h2>Our Valuable Brands</h2>
          <div className="brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="brand-card">
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
