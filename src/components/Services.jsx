import React, { useState } from 'react';
import './Services.css';
import apiService from '../services/api.js';

const Services = () => {
  const [activeTab, setActiveTab] = useState('search-salt');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (type) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      let results = [];
      
      if (type === 'salt') {
        const response = await apiService.searchBySalt(searchQuery);
        results = response.data || [];
      } else if (type === 'manufacturer') {
        const response = await apiService.searchByManufacturer(searchQuery);
        results = response.data || [];
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const renderSearchBySalt = () => (
    <div className="tab-content">
      <h3>🔍 Search by Salt (Generic Name)</h3>
      <p>Find medicines by their active ingredient or generic name</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter salt/generic name (e.g., Paracetamol, Ibuprofen)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={() => handleSearch('salt')} 
          className="search-btn"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          {searchResults.map((item, index) => (
            <div key={index} className="result-card">
              <h5>{item.name}</h5>
              <p><strong>Available Brands:</strong> {item.brands.join(', ')}</p>
              <p><strong>Manufacturers:</strong> {item.manufacturers.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <div className="popular-salts">
        <h4>Popular Generic Medicines:</h4>
        <div className="salt-grid">
          <div className="salt-card">
            <h5>Paracetamol</h5>
            <p>3 brands available</p>
            <small>3 manufacturers</small>
          </div>
          <div className="salt-card">
            <h5>Ibuprofen</h5>
            <p>3 brands available</p>
            <small>3 manufacturers</small>
          </div>
          <div className="salt-card">
            <h5>Amoxicillin</h5>
            <p>3 brands available</p>
            <small>3 manufacturers</small>
          </div>
          <div className="salt-card">
            <h5>Metformin</h5>
            <p>3 brands available</p>
            <small>3 manufacturers</small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchByManufacturer = () => (
    <div className="tab-content">
      <h3>🏭 Search by Manufacturer</h3>
      <p>Find medicines by pharmaceutical company</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter manufacturer name (e.g., Sun Pharma, Cipla)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={() => handleSearch('manufacturer')} 
          className="search-btn"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          {searchResults.map((item, index) => (
            <div key={index} className="result-card">
              <h5>{item.name}</h5>
              <p><strong>Products:</strong> {item.products.join(', ')}</p>
              <p><strong>Specialties:</strong> {item.specialties.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <div className="popular-manufacturers">
        <h4>Top Pharmaceutical Manufacturers:</h4>
        <div className="manufacturer-grid">
          <div className="manufacturer-card">
            <h5>Sun Pharma</h5>
            <p>3 products</p>
            <small>Generic Medicines, Oncology</small>
          </div>
          <div className="manufacturer-card">
            <h5>Cipla</h5>
            <p>3 products</p>
            <small>Respiratory, HIV/AIDS</small>
          </div>
          <div className="manufacturer-card">
            <h5>Dr. Reddy's</h5>
            <p>3 products</p>
            <small>Generic Drugs, Biosimilars</small>
          </div>
          <div className="manufacturer-card">
            <h5>Abbott</h5>
            <p>3 products</p>
            <small>Nutrition, Diagnostics</small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericAlternatives = () => (
    <div className="tab-content">
      <h3>💊 Generic Alternatives</h3>
      <p>Find cost-effective generic alternatives to branded medicines</p>
      
      <div className="alternatives-grid">
        <div className="alternative-card">
          <div className="brand-info">
            <h5>Crocin</h5>
            <p className="generic-name">Generic: Paracetamol</p>
          </div>
          <div className="savings-info">
            <span className="savings-badge">Save 60%</span>
          </div>
          <div className="alternatives-list">
            <strong>Alternatives:</strong>
            <ul>
              <li>Dolo 650</li>
              <li>Pacimol</li>
              <li>Pyrigesic</li>
            </ul>
          </div>
        </div>
        <div className="alternative-card">
          <div className="brand-info">
            <h5>Brufen</h5>
            <p className="generic-name">Generic: Ibuprofen</p>
          </div>
          <div className="savings-info">
            <span className="savings-badge">Save 55%</span>
          </div>
          <div className="alternatives-list">
            <strong>Alternatives:</strong>
            <ul>
              <li>Ibugesic</li>
              <li>Ibuclin</li>
              <li>Advil</li>
            </ul>
          </div>
        </div>
        <div className="alternative-card">
          <div className="brand-info">
            <h5>Lipitor</h5>
            <p className="generic-name">Generic: Atorvastatin</p>
          </div>
          <div className="savings-info">
            <span className="savings-badge">Save 70%</span>
          </div>
          <div className="alternatives-list">
            <strong>Alternatives:</strong>
            <ul>
              <li>Atorlip</li>
              <li>Storvas</li>
              <li>Atocor</li>
            </ul>
          </div>
        </div>
        <div className="alternative-card">
          <div className="brand-info">
            <h5>Augmentin</h5>
            <p className="generic-name">Generic: Amoxicillin + Clavulanate</p>
          </div>
          <div className="savings-info">
            <span className="savings-badge">Save 65%</span>
          </div>
          <div className="alternatives-list">
            <strong>Alternatives:</strong>
            <ul>
              <li>Amoclav</li>
              <li>Clavam</li>
              <li>Mega-CV</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="generic-benefits">
        <h4>Benefits of Generic Medicines:</h4>
        <ul>
          <li>✅ Same active ingredients as branded medicines</li>
          <li>✅ Equivalent therapeutic effects</li>
          <li>✅ 50-80% cost savings</li>
          <li>✅ FDA/WHO approved quality standards</li>
        </ul>
      </div>
    </div>
  );

  const renderBrandComparison = () => (
    <div className="tab-content">
      <h3>⚖️ Brand Comparison</h3>
      <p>Compare different brands of the same generic medicine</p>
      
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Generic Name</th>
              <th>Brand 1</th>
              <th>Brand 2</th>
              <th>Price Difference</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paracetamol 500mg</td>
              <td>Crocin - ₹25</td>
              <td>Dolo - ₹18</td>
              <td>₹7 cheaper</td>
              <td>GSK vs Micro Labs</td>
            </tr>
            <tr>
              <td>Ibuprofen 400mg</td>
              <td>Brufen - ₹45</td>
              <td>Ibugesic - ₹32</td>
              <td>₹13 cheaper</td>
              <td>Abbott vs Cipla</td>
            </tr>
            <tr>
              <td>Atorvastatin 10mg</td>
              <td>Lipitor - ₹180</td>
              <td>Atorlip - ₹65</td>
              <td>₹115 cheaper</td>
              <td>Pfizer vs Cipla</td>
            </tr>
            <tr>
              <td>Omeprazole 20mg</td>
              <td>Prilosec - ₹95</td>
              <td>Omez - ₹42</td>
              <td>₹53 cheaper</td>
              <td>AstraZeneca vs Dr. Reddy's</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDrugInteractions = () => (
    <div className="tab-content">
      <h3>⚠️ Drug Interactions Checker</h3>
      <p>Check for potential interactions between medications</p>
      
      <div className="interaction-checker">
        <div className="checker-inputs">
          <input
            type="text"
            placeholder="Enter first medicine"
            className="interaction-input"
          />
          <span className="vs-text">vs</span>
          <input
            type="text"
            placeholder="Enter second medicine"
            className="interaction-input"
          />
          <button className="check-btn">Check Interactions</button>
        </div>
      </div>

      <div className="interaction-examples">
        <h4>Common Drug Interactions:</h4>
        <div className="interactions-grid">
          <div className="interaction-card high-severity">
            <div className="interaction-header">
              <h5>Warfarin + Aspirin</h5>
              <span className="severity-badge high">
                High Risk
              </span>
            </div>
            <p><strong>Effect:</strong> Increased bleeding risk</p>
            <p><strong>Recommendation:</strong> Monitor INR closely</p>
          </div>
          <div className="interaction-card medium-severity">
            <div className="interaction-header">
              <h5>ACE Inhibitors + NSAIDs</h5>
              <span className="severity-badge medium">
                Medium Risk
              </span>
            </div>
            <p><strong>Effect:</strong> Reduced kidney function</p>
            <p><strong>Recommendation:</strong> Monitor creatinine levels</p>
          </div>
          <div className="interaction-card high-severity">
            <div className="interaction-header">
              <h5>Digoxin + Diuretics</h5>
              <span className="severity-badge high">
                High Risk
              </span>
            </div>
            <p><strong>Effect:</strong> Digitalis toxicity</p>
            <p><strong>Recommendation:</strong> Monitor digoxin levels</p>
          </div>
          <div className="interaction-card medium-severity">
            <div className="interaction-header">
              <h5>Statins + Macrolides</h5>
              <span className="severity-badge medium">
                Medium Risk
              </span>
            </div>
            <p><strong>Effect:</strong> Muscle toxicity</p>
            <p><strong>Recommendation:</strong> Consider statin dose reduction</p>
          </div>
        </div>
      </div>

      <div className="interaction-warning">
        <p><strong>⚠️ Important:</strong> Always consult with your healthcare provider before combining medications. This tool is for informational purposes only.</p>
      </div>
    </div>
  );

  const services = [
    {
      icon: '🏥',
      title: 'General Medicine',
      description: 'Comprehensive primary healthcare services for all age groups with experienced physicians.',
      features: ['Health Checkups', 'Preventive Care', 'Chronic Disease Management']
    },
    {
      icon: '💉',
      title: 'Vaccination Services',
      description: 'Complete vaccination programs for children and adults following international guidelines.',
      features: ['Child Immunization', 'Travel Vaccines', 'Annual Flu Shots']
    },
    {
      icon: '🔬',
      title: 'Laboratory Tests',
      description: 'State-of-the-art diagnostic laboratory with accurate and timely test results.',
      features: ['Blood Tests', 'Urine Analysis', 'Pathology Services']
    },
    {
      icon: '🩺',
      title: 'Specialized Care',
      description: 'Expert consultation and treatment in various medical specialties.',
      features: ['Cardiology', 'Diabetes Care', 'Hypertension Management']
    },
    {
      icon: '🚑',
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response and critical care.',
      features: ['Emergency Response', 'Critical Care', 'Ambulance Service']
    },
    {
      icon: '💊',
      title: 'Pharmacy Services',
      description: 'Complete pharmacy with genuine medicines and healthcare products.',
      features: ['Prescription Medicines', 'Health Supplements', 'Medical Equipment']
    }
  ];

  return (
    <section className="services" id="salt-manufacturer">
      <div className="container">
        <div className="services-header">
          <h2>Salt & Manufacturer Services</h2>
          <p>
            Comprehensive pharmaceutical search and comparison tools to help you find the right medicines at the best prices.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'search-salt' ? 'active' : ''}`}
            onClick={() => setActiveTab('search-salt')}
          >
            Search by Salt
          </button>
          <button 
            className={`tab-btn ${activeTab === 'search-manufacturer' ? 'active' : ''}`}
            onClick={() => setActiveTab('search-manufacturer')}
          >
            Search by Manufacturer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'generic-alternatives' ? 'active' : ''}`}
            onClick={() => setActiveTab('generic-alternatives')}
          >
            Generic Alternatives
          </button>
          <button 
            className={`tab-btn ${activeTab === 'brand-comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('brand-comparison')}
          >
            Brand Comparison
          </button>
          <button 
            className={`tab-btn ${activeTab === 'drug-interactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('drug-interactions')}
          >
            Drug Interactions
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-container">
          {activeTab === 'search-salt' && renderSearchBySalt()}
          {activeTab === 'search-manufacturer' && renderSearchByManufacturer()}
          {activeTab === 'generic-alternatives' && renderGenericAlternatives()}
          {activeTab === 'brand-comparison' && renderBrandComparison()}
          {activeTab === 'drug-interactions' && renderDrugInteractions()}
        </div>
      </div>
    </section>
  );
};

export default Services;
