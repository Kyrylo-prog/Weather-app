import { Routes, Route } from "react-router-dom";
import WeatherPage from "./WeatherPage";
import DayDetails from "./DayDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WeatherPage />} />
      <Route path="/day/:id" element={<DayDetails />} />
    </Routes>
  );
}
