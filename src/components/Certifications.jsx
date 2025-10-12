import React from 'react';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      name: 'WHO-GMP',
      description: 'World Health Organization Good Manufacturing Practice'
    },
    {
      name: 'ISO Certified',
      description: 'International Organization for Standardization'
    },
    {
      name: 'DGFT',
      description: 'Directorate General of Foreign Trade'
    },
    {
      name: 'FIEO',
      description: 'Federation of Indian Export Organizations'
    },
    {
      name: 'IEC',
      description: 'Import Export Code'
    },
    {
      name: 'Pharmexcil',
      description: 'Pharmaceuticals Export Promotion Council'
    }
  ];

  return (
    <section className="certifications-section" id="certifications">
      <div className="container">
        <div className="section-header">
          <h2>Certifications & Compliance</h2>
          <p>Our commitment to quality and regulatory standards</p>
        </div>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="cert-icon">🏆</div>
              <h3>{cert.name}</h3>
              <p>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
