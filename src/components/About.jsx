import React from "react";
import "./About.css";
import leadershipImg from "../assets/about-leadership.svg";

const About = () => {
  return (
    <section className="about-medgo" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Medgo</h2>
            <p>
              Medgo is a trusted Indian pharmaceutical exporter with 6+ years of
              experience in medicine distribution. We ensure regulatory
              compliance, quality assurance, and on-time deliveries to global
              clients.
            </p>
            <button className="know-more-btn">Know More About Us</button>
          </div>
          <div className="about-image">
            <img
              src={leadershipImg}
              alt="medgo Leadership"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
