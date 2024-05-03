import React from 'react';
import '../styling/global.css'; // Ensure this is correctly pointing to your CSS file

const WeatherDisplay = ({ data }) => {
  const { main, weather, wind, name } = data;
  const temperature = Math.round(main.temp); // Rounded temperature
  const humidity = main.humidity;
  const windSpeed = Math.round(wind.speed * 3.6); // Convert m/s to km/h and round it
  const conditions = weather[0].description;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; // Using @2x for a larger icon
  
  let suggestions = '';
  if (conditions.includes('clear')) {
    suggestions = '☀️ Clear skies, perfect day for a stroll!';
  } else if (conditions.includes('clouds')) {
    suggestions = '🌥️ Partly cloudy, enjoy the pleasant weather!';
  } else if (conditions.includes('rain')) {
    suggestions = '🌧️ Rainy day ahead, don\'t forget your umbrella!';
  } else if (conditions.includes('thunderstorm')) {
    suggestions = '⛈️ Thunderstorms expected, stay indoors and safe!';
  } else if (conditions.includes('snow')) {
    suggestions = '❄️ Snowfall warning, dress warmly!';
  } else if (conditions.includes('mist') || conditions.includes('fog')) {
    suggestions = '🌫️ Foggy conditions, drive safely!';
  } else {
    suggestions = '🌤️ Enjoy the weather!';
  }


  return (
    <div className="weather-container">
      <div className="weather-title">{name} Weather</div>
      <div className="weather-content">
        <div className="weather-icon">
          <img src={iconUrl} alt="Weather Icon" />
        </div>
        <div className="weather-data">
          <p className='temperature-data'>{temperature}°C | °F</p>
          <div className='rest-data'>
            <p>Precipitation: 0%</p> {/* Static value for now */}
            <p>Humidity: {humidity}%</p>
            <p>Wind: {windSpeed} km/h</p>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <h3>Suggestions:</h3>
        <p>{suggestions}</p>
      </div>
      <div className="weather-footer">Source: OpenWeatherMap</div>
    </div>
  );
};

export default WeatherDisplay;
