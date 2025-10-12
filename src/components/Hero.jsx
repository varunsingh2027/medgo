import React, { useState } from 'react';
import './Hero.css';
import apiService from '../services/api.js';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      // Try to fetch from backend API
      const result = await apiService.searchMedicines(searchQuery);
      setSearchResults(result.data || []);
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to empty results
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find Your Medicine at Your Price</h1>
          <p className="price-match-text">Price Match Ensure on Conventional Prescriptions</p>
          
          <div className="medicine-search">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Type your drug name (e.g., Paracetamol, Ibuprofen)" 
                className="search-input"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="search-btn"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="search-results-dropdown">
                {isSearching ? (
                  <div className="loading-message">
                    <div className="loading-spinner"></div>
                    Searching for medicines...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="results-header">
                      <h4>Found {searchResults.length} medicine(s)</h4>
                    </div>
                    <div className="results-list">
                      {searchResults.slice(0, 5).map((medicine, index) => (
                        <div key={index} className="result-item">
                          <div className="medicine-image" onClick={() => setEnlargedImage(medicine.image)} style={{ cursor: 'zoom-in' }}>
                            <img src={medicine.image} alt={medicine.name} />
                          </div>
                          <div className="medicine-info">
                            <h5 className="medicine-name">{medicine.name}</h5>
                            <p className="brand-name">{medicine.brand}</p>
                          </div>
                          <div className="price-info">
                            <span className="price">{medicine.price}</span>
                            <span className={`availability ${medicine.availability.toLowerCase().replace(' ', '-')}`}>
                              {medicine.availability}
                            </span>
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <div className="more-results">
                          <p>+{searchResults.length - 5} more results available</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="no-results">
                    <p>No medicines found for "{searchQuery}"</p>
                    <p className="suggestion">Try searching with generic names like "Paracetamol" or brand names like "Crocin"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enlarged image modal */}
      {enlargedImage && (
        <div className="image-modal" onClick={() => setEnlargedImage(null)}>
          <div className="image-modal-content">
            <img src={enlargedImage} alt="Medicine Enlarged" />
            <span className="close-modal">×</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
