import { useEffect, useState } from "react";

const locaties = {
  "West-Terschelling": { lat: 53.366, long: 5.2167 },
  "Oost-Vlieland": { lat: 53.2931, long: 5.0724 },
  "Texel oudeschild": { lat: 53.0406, long: 4.8523 },
  Harlingen: { lat: 53.1745, long: 5.4224 },
  "Ameland nes": { lat: 53.4490, long: 5.7651 },
  Kornwerderzand: { lat: 53.0706, long: 5.3366 },
};

function Weather() {
  const [plaats, setPlaats] = useState("West-Terschelling");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const { lat, long } = locaties[plaats];
  const url = `https://data.meteoserver.nl/api/zeeweer.php?lat=${lat}&long=${long}&key=c9c74829f1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text);
        setData(json);
      } catch (err) {
        setError("Fout bij ophalen data: " + err.message);
      }
    };

    fetchData();
  }, [url]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-white">Laden...</p>;

  const weer = data.liveweer?.[0];
  const getij = data.getij || [];
  const windKmh = parseFloat(weer.windkmh);
  const windKnopen = (windKmh / 1.852).toFixed(1);

  return (
    <div className="flex flex-col gap-4 text-white p-4 bg-slate-900 rounded-lg shadow-lg">

      {/* Data weergave */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Weergegevens */}
        <div className="w-full md:w-1/2">
          <div className="mb-2">
            <label className="text-xl font-bold mb-2 border-b border-gray-700 pb-1">Weer op</label>
            <select
              className="bg-slate-800 text-white border border-gray-600 rounded px-2 py-1 text-xl font-bold pl-2"
              value={plaats}
              onChange={(e) => setPlaats(e.target.value)}
            >
              {Object.keys(locaties).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-600 text-sm">
            <tbody>
              <tr><td className="border border-gray-600 px-2 py-1">Temperatuur</td><td className="border border-gray-600 px-2 py-1">{weer.temp} °C</td></tr>
              <tr><td className="border border-gray-600 px-2 py-1">Wind</td><td className="border border-gray-600 px-2 py-1">{weer.windr} @ {windKmh} km/u ({windKnopen} kn)</td></tr>
              <tr><td className="border border-gray-600 px-2 py-1">Luchtdruk</td><td className="border border-gray-600 px-2 py-1">{weer.luchtd} hPa</td></tr>
              <tr><td className="border border-gray-600 px-2 py-1">Zicht</td><td className="border border-gray-600 px-2 py-1">{weer.zicht} km</td></tr>
              <tr><td className="border border-gray-600 px-2 py-1">Verwachting</td><td className="border border-gray-600 px-2 py-1">{weer.verw}</td></tr>
              <tr><td className="border border-gray-600 px-2 py-1">Waarschuwing</td><td className="border border-gray-600 px-2 py-1">{weer.waarsch}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Getijden */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2 border-b border-gray-700 pb-1">Getijden</h2>
          {getij.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-600 text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-2 py-1">Datum</th>
                  <th className="border border-gray-600 px-2 py-1">Tijd</th>
                  <th className="border border-gray-600 px-2 py-1">Type</th>
                  <th className="border border-gray-600 px-2 py-1">Hoogte</th>
                </tr>
              </thead>
              <tbody>
                {getij.map((tide, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-slate-700" : "bg-slate-800"}>
                    <td className="border border-gray-600 px-2 py-1">{formatDate(tide.datum)}</td>
                    <td className="border border-gray-600 px-2 py-1">{tide.uur}</td>
                    <td className="border border-gray-600 px-2 py-1">{tide.getij}</td>
                    <td className="border border-gray-600 px-2 py-1">{tide.verschil} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">Geen getijdedata beschikbaar</p>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(str) {
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4)}`;
}

export default Weather;