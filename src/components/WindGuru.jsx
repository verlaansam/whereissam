//werkt nog niet
import { useEffect } from "react";

function Windguru() {
  useEffect(() => {
    const existingScript = document.getElementById("wg_fwdg_48259_100_1746892997942");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "wg_fwdg_48259_100_1746892997942";
    script.src =
      "https://www.windguru.cz/js/widget.php?s=48259&m=100&uid=wg_fwdg_48259_100_1746892997942&wj=knots&tj=c&waj=m&tij=cm&odh=0&doh=24&fhours=240&hrsm=1&vt=forecasts&lng=en&idbs=1&p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6 p-4 bg-slate-800 rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold text-white mb-4">Windguru Voorspelling</h2>
      <div id="wg_fwdg_48259_100_1746892997942" className="min-w-[600px]" />
    </div>
  );
}

export default Windguru;
