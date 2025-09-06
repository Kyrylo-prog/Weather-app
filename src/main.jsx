import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function InputField() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
  if (!city) return;

  async function callApi() {
    const fetched = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8e10573c5c1cf1b3efe8ba3f031fcc00`);
    const geoData = await fetched.json();
    console.log("геодата:", geoData);
    // Получаем погоду по широте и долготе
    const { lat, lon } = geoData[0];

const forecastResp = await fetch(
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=8e10573c5c1cf1b3efe8ba3f031fcc00&units=metric&lang=ru`
);
const forecastData = await forecastResp.json();
console.log(forecastData);
setWeather(forecastData);
  }


  callApi();
}, [city]);


  return (
    <>
      <input 
        placeholder="Введите свой город" 
        value={city}
        onChange={(e) => setCity(e.target.value)} 
      />
{weather && weather.daily && (
  <div>
    <h1>Прогноз на 7 дней </h1>
    <ul>
      {weather.daily.slice(0, 7).map((day, index) => (
        <li key={index}>
          <p>
            {new Date(day.dt * 1000).toLocaleDateString("ru-RU", {
              weekday: "long",
              day: "numeric",
              month: "long"
            })}
          </p>
          <p>Температура: {day.temp.day}°C</p>
          <p>Погода: {day.weather[0].description}</p>
          <img 
  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
  alt={day.weather[0].description} 
/>
        </li>
      ))}
    </ul>
  </div>
)}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <InputField />
);