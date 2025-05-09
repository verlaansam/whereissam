//rws is kapot
import { useEffect, useState } from "react";

function TideForecast({ station = "Terschelling" }) {
  const [tideData, setTideData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTides = async () => {
      try {
        const today = new Date();
        const dates = [...Array(3)].map((_, i) => {
          const d = new Date(today);
          d.setDate(d.getDate() + i);
          return d.toLocaleDateString("nl-NL"); // bijv. "09-05-2025"
        });

        const allTideData = [];

        for (const datum of dates) {
          const url = `https://us-central1-whereissam-eda0a.cloudfunctions.net/getTideData?station=${station}&datum=${datum}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Fout bij datum: ${datum}`);
          const data = await response.json();
          allTideData.push(...data);
        }

        setTideData(allTideData);
      } catch (err) {
        setError(err.message || "Onbekende fout");
      } finally {
        setLoading(false);
      }
    };

    fetchTides();
  }, [station]);

  const formatTime = (datetime) =>
    new Date(datetime).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const groupByDate = (entries) =>
    entries.reduce((acc, entry) => {
      const date = new Date(entry.datetime).toLocaleDateString("nl-NL");
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {});

  if (loading) return <p className="text-gray-400">Laden getijgegevens...</p>;
  if (error) return <p className="text-red-500">Fout: {error}</p>;

  const grouped = groupByDate(tideData);

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-md w-full md:w-96">
      <h2 className="text-xl font-bold mb-4 text-white">Getijden – {station}</h2>
      {Object.entries(grouped).map(([date, tides]) => (
        <div key={date} className="mb-4">
          <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">{date}</h3>
          <ul className="space-y-1">
            {tides.map((entry, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{entry.type === "HW" ? "Hoogwater" : "Laagwater"}</span>
                <span>{formatTime(entry.datetime)}</span>
                <span>{entry.height} m</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TideForecast;
