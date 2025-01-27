import React, { useState, useEffect } from 'react';

const RandomColorBackground = () => {
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
      }}
    >
      <h1>Background Color: {color}</h1>
    </div>
  );
};

export default RandomColorBackground;





export default function Post(){
  return <>
    <div style= {{display:"flex" , backgroundColor:"#0D1117", color:"white", height:"100vh" , width:"100vw"}}>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>
      <div style= {{fontSize:'100px' , marginLeft:'20px'}}> hello</div>

    </div>
      <h1 style={{fontFamily:'cursive', color:'#333'}}>Prabhat shukla</h1>
  </>
}

import React, { useState } from "react";

const PaginationExample = () => {
  // Mock data
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pagination Example</h1>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default PaginationExample;


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
