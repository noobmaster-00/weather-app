import React from 'react';
import '../styling/global.css';

function TemperatureToggle({ unit, setUnit }) {
  return (
    <div className="temperature-toggle">
      <button 
        className={`temperature-button ${unit === 'metric' ? 'active' : ''}`}
        onClick={() => setUnit('metric')}
      >
        °C
      </button>
      <button 
        className={`temperature-button ${unit === 'imperial' ? 'active' : ''}`}
        onClick={() => setUnit('imperial')}
      >
        °F
      </button>
    </div>
  );
}

export default TemperatureToggle;
