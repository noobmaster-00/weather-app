import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import TemperatureToggle from './components/TemperatureToggle';
import Header from './components/Header';
import TemperatureGraph from './components/TemperatureGraph';
import Forecast from './components/Forecast'; // Import Forecast component


function App() {
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const fetchWeather = async (city, unit) => {
    const apiKey = '20225d096ea96d983e25d1b3c2f487bd';  // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);  // Log the data to see what is returned
      if (data && data.weather) {
        setWeatherData(data);
      } else {
        setWeatherData(null); // Ensure handling of null data
        console.error("No weather data found:", data);
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherData(null); // Ensure handling of null data
    }
  };

  const fetchGraphData = useCallback(async (city) => {
    const apiKey = '20225d096ea96d983e25d1b3c2f487bd';  // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch graph data: " + response.statusText);
      }
      const result = await response.json();
      console.log("API Response:", result);
      // Handle the case where 'result' is undefined
      if (!result || !result.list) {
        throw new Error("Graph data is undefined or malformed");
      }
      const formattedGraphData = result.list.map(item => ({
        name: new Date(item.dt * 1000).getHours() + ":00",
        temp: item.main.temp
      }));
      console.log(formattedGraphData);
      setGraphData(formattedGraphData);
    } catch (error) {
      console.error("Failed to fetch graph data:", error);
      setGraphData([]);
    }
  }, [unit]);

  const handleSearch = (city) => {
    setCity(city);
    fetchWeather(city, unit);
    fetchGraphData(city);
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city, unit);
      fetchGraphData(city);
    }
  }, [unit, city, fetchGraphData]); 

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Header />
      <TemperatureToggle unit={unit} setUnit={setUnit} />
      <div className="dashboard">
        {weatherData ? <WeatherDisplay data={weatherData} /> : <div>Loading or no weather data...</div>}
        {graphData && graphData.length > 0 ? <TemperatureGraph data={graphData} /> : <div>Loading or no graph data...</div>}
      </div>
      <Forecast city={city} unit={unit} />
    </div>
  );
}

export default App;
