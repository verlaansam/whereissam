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

  const [tags, setTags] = useState([]); // ✅ Tags als array
  const [tagInput, setTagInput] = useState(""); // Input voor nieuwe tags
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, notes: value });
  };

  // ✅ Tags opslaan bij spatie of enter
  const handleTagInput = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() !== "") {
        setTags([...tags, tagInput.trim()]);
        setTagInput(""); // Reset input
      }
    }
  };

  // ✅ Tags verwijderen
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await addDoc(collection(db, "logEntries"), {
        ...formData,
        tags, // ✅ Tags opslaan als array
        date: Timestamp.fromDate(new Date(formData.date)), // ✅ Firestore Timestamp
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
      setTags([]); // Reset tags
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
        <div className="w-full flex flex-col xl:flex-row xl:space-x-4">
          <div className="xl:w-1/2">
            <label className="block text-sm font-medium">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />

            <label className="block text-sm font-medium">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />

            <label className="block text-sm font-medium">Wind</label>
            <div className="flex space-x-2">
              <select name="windSpeed" value={formData.windSpeed} onChange={handleChange} className="w-1/2 p-2 border rounded">
                <option value="">Speed (knots)</option>
                {["0-5", "6-10", "11-15", "16-20", "21-25", "26-30", "Da Fuck we doing here"].map((speed, index) => (
                  <option key={index} value={speed}>{speed}</option>
                ))}
              </select>
              <select name="windDirection" value={formData.windDirection} onChange={handleChange} className="w-1/2 p-2 border rounded">
                <option value="">Direction</option>
                {["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"].map((dir, index) => (
                  <option key={index} value={dir}>{dir}</option>
                ))}
              </select>
            </div>
            
            <label className="block text-sm font-medium">Sea state</label>
            <select name="seaState" value={formData.seaState} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Sea State</option>
              {["plat", "rustig", "stromend", "normaal", "golvend", "schuimend", "verward", "wild"].map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>

            {/* ✅ Tags input en display */}
            <label className="block text-sm font-medium">Tags</label>
            <div className="border rounded p-2 flex flex-wrap gap-2 min-h-[40px]">
              {tags.map((tag, index) => (
                <span key={index} className="bg-orange-500 text-gray-200 px-2 py-1 rounded-2xl flex items-center">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)} className="ml-2 text-red-500">&times;</button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="Type a tag and press space"
                className="outline-none flex-1"
              />
            </div>
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


