import React, { useState } from 'react';
import '../styling/global.css';
import searchIcon from '../assets/image.png'; // Adjust the path as necessary

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(city);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="search-button"
        onClick={() => onSearch(city)}
      >
        <img src={searchIcon} alt="Search" style={{ width: '110%', height: '70%' }} />
      </button>
    </div>
  );
}

export default SearchBar;
