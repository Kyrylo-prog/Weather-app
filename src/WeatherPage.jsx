import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  
  // Загружаем сохранённые данные
  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    const savedWeather = localStorage.getItem("weather");
    if (savedCity && savedWeather) {
      setCity(savedCity);
      setWeather(JSON.parse(savedWeather));
    }
  }, []);

  // Сохраняем данные при изменении
  useEffect(() => {
    if (city) localStorage.setItem("city", city);
    if (weather) localStorage.setItem("weather", JSON.stringify(weather));
  }, [city, weather]);

  // 🧠 Debounce: задерживаем вызов API на 1 секунду после последнего ввода
useEffect(() => {
  if (!city) return;
  
  const timeoutId = setTimeout(async () => {
    try {

      
const fetched = await fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_API_KEY}`
);

      const geoData = await fetched.json();
      if (!geoData[0]) return;
      const { lat, lon } = geoData[0];

      const forecastResp = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=ru`
      );
      const forecastData = await forecastResp.json();
      setWeather(forecastData);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    }
  }, 1000);

  return () => clearTimeout(timeoutId);
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
          <h1>Прогноз на 7 дней {city}</h1>
          <ul>
            {weather.daily.slice(0, 7).map((day, index) => (
              <li key={index}>
                <Link to={`/day/${index}`} state={{ day }}>
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("ru-RU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p>Температура: {day.temp.day}°C</p>
                  <p>Погода: {day.weather[0].description}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
