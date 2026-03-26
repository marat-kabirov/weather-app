import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    if (data.cod === 200) {
      setWeather(data);
      setError('');
    } else {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <div className="details">
            <span>💧 {weather.main.humidity}%</span>
            <span>🌡️ Feels like {Math.round(weather.main.feels_like)}°C</span>
            <span>💨 {weather.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;