import {useState} from 'react';
 
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input 
      type ="text" 
      placeholder ="Enter city name" 
      value={city}
      onChange={(e) => setCity(e.target.value)} />
      <button onClick = {handleSearch}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;