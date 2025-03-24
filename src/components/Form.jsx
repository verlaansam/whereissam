import { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { Timestamp } from "firebase/firestore";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // ✅ Quill styles

const LogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    windSpeed: "",
    windDirection: "",
    seaState: "",
    notes: "", // ✅ Quill gebruikt HTML
  });

  const [successMessage, setSuccessMessage] = useState(""); 

  const windSpeeds = ["0-5", "6-10", "11-15", "16-20", "21-25", "26-30", "Da Fuck we doing here"];
  const windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const seaState = ["plat", "rustig", "stromend", "normaal", "golvend", "schuimend", "verward", "wild"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, notes: value }); // ✅ Opslaan als HTML
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await addDoc(collection(db, "logEntries"), {
        ...formData,
        date: Timestamp.fromDate(new Date(formData.date)) // ✅ Firestore Timestamp
      });
  
      setSuccessMessage("Log entry saved successfully!");
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0], 
        windSpeed: "",
        windDirection: "",
        seaState: "",
        notes: "",
      });
  
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving log entry:", error);
      alert("Failed to save log entry.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 w-screen shadow-md rounded-lg lg:max-w-screen">
      <h2 className="text-xl font-bold mb-4">Log Entry Form</h2>

      {successMessage && (
        <div className="text-green-600 font-medium bg-green-100 p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center">
        <div className=" w-full flex flex-col xl:flex-row xl:space-x-4">
          <div className="xl:w-1/2">
            <label className="block text-sm font-medium">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />

            <label className="block text-sm font-medium">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />

            <label className="block text-sm font-medium">Wind</label>
            <div className="flex space-x-2">
              <select name="windSpeed" value={formData.windSpeed} onChange={handleChange} className="w-1/2 p-2 border rounded">
                <option value="">Speed (knots)</option>
                {windSpeeds.map((speed, index) => (
                  <option key={index} value={speed}>{speed}</option>
                ))}
              </select>
              <select name="windDirection" value={formData.windDirection} onChange={handleChange} className="w-1/2 p-2 border rounded">
                <option value="">Direction</option>
                {windDirections.map((dir, index) => (
                  <option key={index} value={dir}>{dir}</option>
                ))}
              </select>
            </div>
            
            <label className="block text-sm font-medium">Sea state</label>
            <select name="seaState" value={formData.seaState} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Sea State</option>
              {seaState.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="xl:w-1/2">
            <label className="block text-sm font-medium">Notes (Rich Text)</label>
            <ReactQuill value={formData.notes} onChange={handleQuillChange} className="w-full bg-slate-950 h-80 mb-4 text-white" />
          </div>
        </div>

        <button type="submit" className="text-sm text-black font-roboto-slab border p-2 w-full bg-white hover:text-white hover:bg-slate-950 mt-4 xl:w-36">
          Submit Log Entry
        </button>
      </form>
    </div>
  );
};

export default LogForm;

