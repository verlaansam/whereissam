import { useState, useEffect } from "react";

const WeatherTides = () => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateToday = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Haal het weer op
        const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=2b1271583cca4496a17111647252704&q=Terschelling&lang=nl`);
        const weatherData = await weatherRes.json();
        
        // Haal weerwaarschuwingen op
        const alertRes = await fetch(`https://api.weatherapi.com/v1/alerts.json?key=2b1271583cca4496a17111647252704&q=Terschelling&lang=nl`);
        const alertData = await alertRes.json();

        // Zet de opgehaalde data in de state
        setWeather(weatherData.current);
        setAlerts(alertData.alerts || []);  // Alerts kan een lege array zijn als er geen waarschuwingen zijn
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateToday]);

  if (loading) return <p className="text-white p-4">Laden...</p>;

  if (!weather) return <p className="text-white p-4">Er is een fout opgetreden bij het ophalen van de gegevens.</p>;

  return (
    <div className="grid-cols-1 md:grid-cols-1 gap-6 p-6 bg-slate-950 text-white rounded-lg shadow-lg">
      {/* Weerbericht */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Weerbericht (Terschelling)</h2>
        <div className="border-b border-gray-700 pb-4 mb-4">
          <p>🌡️ {weather.temp_c}°C Heden</p>
          <p>🌬️ {weather.wind_kph} km/u Wind</p>
          <p>🔄 Windrichting: {weather.wind_dir}</p>
          <p>☁️ {weather.condition.text}</p>
          <img src={`https:${weather.condition.icon}`} alt="Weather icon" />
        </div>
      </div>

      {/* Weeralarmen */}
      {alerts.length > 0 ? (
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-xl font-bold mb-4">Weeralarmen</h3>
          {alerts.map((alert, index) => (
            <div key={index} className="mb-4 p-4 bg-red-600 rounded-lg">
              <h4 className="text-lg font-semibold">{alert.event}</h4>
              <p>{alert.headline}</p>
              <p><strong>Details:</strong> {alert.description}</p>
              <p><strong>Geldig van:</strong> {alert.valid_from}</p>
              <p><strong>Tot:</strong> {alert.valid_to}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <p className="text-green-400 p-4">Er zijn momenteel geen weerswaarschuwingen van kracht.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherTides;