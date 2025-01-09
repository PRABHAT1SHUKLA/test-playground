import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./WeatherDashboard.css";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherDashboard: React.FC = () => {
  const [location, setLocation] = useState("New York");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState("light");

  // Memoize the API URL to avoid unnecessary re-computations
  const apiUrl = useMemo(
    () => `https://fake-weather-api.com/location/${location}`,
    [location]
  );

  // Fetch weather data when location changes
  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData({
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  }, [apiUrl]);

  // useEffect to trigger data fetch
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`weather-dashboard ${theme}`}>
      <header className="dashboard-header">
        <h1>Weather Dashboard</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>

      {weatherData ? (
        <div className="weather-info">
          <h2>{weatherData.location}</h2>
          <img src={weatherData.icon} alt={weatherData.condition} />
          <p>{weatherData.condition}</p>
          <h3>{weatherData.temperature}°C</h3>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherDashboard;
