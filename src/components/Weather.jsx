// src/components/WeatherTides.jsx
import { useState, useEffect } from "react";

const WeatherTides = () => {
  const [weather, setWeather] = useState(null);
  const [tides, setTides] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateToday = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

  useEffect(() => {
    const fetchData = async () => {
      try {
        // WeatherAPI (vervang YOUR_API_KEY!)
        const weatherRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b1271583cca4496a17111647252704&q=Terschelling&days=3&lang=nl`);
        const weatherData = await weatherRes.json();
        setWeather(weatherData.forecast.forecastday);

        // Tides via Rijkswaterstaat + CORS Proxy
        const corsProxy = "https://corsproxy.io/?url=";
        const tideUrl = `https://opendata.rijkswaterstaat.nl/feiten-en-cijfers/getijdata/getij/gegevens?station=terschelling&datum=${dateToday}`;
        const tideRes = await fetch(corsProxy + encodeURIComponent(tideUrl));
        const tideData = await tideRes.json();
        console.log(tideData);
        setTides(tideData.Getijgegevens?.Getij || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateToday]);

  if (loading) return <p className="text-white p-4">Laden...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-6 bg-slate-950 text-white rounded-lg shadow-lg hidden sm:block">
      {/* Weather */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Weerbericht (Terschelling)</h2>
        {weather?.map((day) => (
          <div key={day.date} className="border-b border-gray-700 pb-4 mb-4">
            <h3 className="text-xl">{new Date(day.date).toLocaleDateString('nl-NL')}</h3>
            <p>🌡️ {day.day.avgtemp_c}°C Gemiddeld</p>
            <p>🌬️ {day.day.maxwind_kph} km/u Wind</p>
            <p>🔄 Windrichting: {day.day.wind_dir}</p>
            <p>☁️ {day.day.condition.text}</p>
          </div>
        ))}
      </div>

      {/*tides rws doet niet 
      <div>
        <h2 className="text-2xl font-bold mb-4">Getijden (Harlingen)</h2>
        {tides.length > 0 ? (
          tides.map((tide, index) => (
            <div key={index} className="border-b border-gray-700 pb-2 mb-2">
              <p className="font-semibold">
                {tide.soortWaterstand === "HW" ? "🌊 Hoogwater" : "🏖️ Laagwater"}
              </p>
              <p>Tijd: {tide.tijd.split("T")[1].slice(0,5)} uur</p>
              <p>Waterstand: {tide.waterstand} cm</p>
            </div>
          ))
        ) : (
          <p>Geen getijdata beschikbaar.</p>
        )}
      </div>
      */}
    </div>
  );
};

export default WeatherTides;

