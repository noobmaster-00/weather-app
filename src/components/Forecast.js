import React, { useState, useEffect } from 'react';
import '../styling/Forecast.css'; // Make sure the path is correct

const Forecast = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = '20225d096ea96d983e25d1b3c2f487bd'; // Secure your API key
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&cnt=80&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const data = await response.json();
        const formattedData = parseForecastData(data);
        setForecastData(formattedData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    if (city) {
      fetchForecastData();
    }
  }, [city, unit]); // Include 'unit' as a dependency

  const parseForecastData = (data) => {
    // Check if data is available
    if (!data || !data.list || data.list.length === 0) {
      return [];
    }

    // Group forecast data by date
    const groupedByDate = {};
    data.list.forEach((item) => {
      // Extract date from timestamp
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });

      // Check if date already exists
      if (!groupedByDate[date]) {
        // Create a new entry for the date
        groupedByDate[date] = {
          date: date,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`, // Weather icon URL
          weather: item.weather[0].main, // Weather condition
          temperature: item.main.temp, // Temperature
        };
      }
    });

    // Convert grouped data to array of objects
    const formattedData = Object.values(groupedByDate);

    // Sort the data by date
    formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return formattedData;
  };

  return (
    <div className="forecast-container">
      <div className="forecast-scrollable">
        {forecastData.length > 0 ? (
          forecastData.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="forecast-date">{day.date}</div>
              <div className="forecast-item">
                <img className="weather-image" src={day.icon} alt="Weather Icon" />
                <div className="forecast-weather">{day.weather}</div>
                <div className="forecast-temperature">{Math.round(day.temperature)}°{unit === 'metric' ? 'C' : 'F'}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No forecast data available</div>
        )}
      </div>
    </div>
  );
};

export default Forecast;
