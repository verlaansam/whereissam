import { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { Timestamp } from "firebase/firestore";
import ReactMarkdown from "react-markdown";

const LogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    windSpeed: "",
    windDirection: "",
    seaState: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message

  const windSpeeds = [
    "0-5",
    "6-10",
    "11-15",
    "16-20",
    "21-25",
    "26-30",
    "Da Fuck we doing here",
  ];

  const windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await addDoc(collection(db, "logEntries"), {
        ...formData,
        date: Timestamp.fromDate(new Date(formData.date)) // ✅ Store as Timestamp
      });
  
      setSuccessMessage("Log entry saved successfully!");
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0], // Reset form
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
    <div className="max-w-lg mx-auto p-6 w-screen shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Log Entry Form</h2>

      {/* ✅ Success Message */}
      {successMessage && (
        <div className="text-green-600 font-medium bg-green-100 p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Wind</label>
          <div className="flex space-x-2">
            <select name="windSpeed" value={formData.windSpeed} onChange={handleChange} className="w-1/2 p-2 border rounded">
              <option value="">Speed (knots)</option>
              {windSpeeds.map((speed, index) => (
                <option key={index} value={speed}>
                  {speed}
                </option>
              ))}
            </select>
            <select name="windDirection" value={formData.windDirection} onChange={handleChange} className="w-1/2 p-2 border rounded">
              <option value="">Direction</option>
              {windDirections.map((dir, index) => (
                <option key={index} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Sea State</label>
          <input type="text" name="seaState" value={formData.seaState} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Notes (Markdown Supported)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            placeholder="Write in Markdown (*bold*, _italic_, `code`)..."
          ></textarea>
        </div>
        <button type="submit" className="text-sm text-black font-roboto-slab border p-2 w-full bg-white hover:text-white hover:bg-slate-950 mt-4">
          Submit Log Entry
        </button>
      </form>
    </div>
  );
};

export default LogForm;
