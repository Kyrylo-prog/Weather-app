import { useLocation, useNavigate } from "react-router-dom";

export default function DayDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const day = location.state?.day;

  if (!day) {
    return <p>Нет данных (перейди через главную страницу)</p>;
  }

  return (
    <div className="details">
      <button onClick={() => navigate(-1)}>⬅ Назад</button>
      <h2>
        Подробности:{" "}
        {new Date(day.dt * 1000).toLocaleDateString("ru-RU", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </h2>
      <p>🌡 Утро: {day.temp.morn}°C</p>
      <p>🌡 День: {day.temp.day}°C</p>
      <p>🌡 Вечер: {day.temp.eve}°C</p>
      <p>🌡 Ночь: {day.temp.night}°C</p>
      <p>💧 Влажность: {day.humidity}%</p>
      <p>🌬 Ветер: {day.wind_speed} м/с</p>
      <p>☁ Облачность: {day.clouds}%</p>
      <p>
        🌅 Восход:{" "}
        {new Date(day.sunrise * 1000).toLocaleTimeString("ru-RU")}
      </p>
      <p>
        🌇 Закат:{" "}
        {new Date(day.sunset * 1000).toLocaleTimeString("ru-RU")}
      </p>
    </div>
  );
}
