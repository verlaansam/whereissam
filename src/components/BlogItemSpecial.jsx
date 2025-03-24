import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { db, doc, deleteDoc, updateDoc } from "../firebase";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function BlogItemSpecial({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...post });
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle Quill input change
  const handleQuillChange = (value) => {
    setUpdatedData({ ...updatedData, notes: value });
  };

  // Update Firestore
  const handleUpdate = async () => {
    try {
      const postRef = doc(db, "logEntries", post.id);
      await updateDoc(postRef, updatedData);
      setIsEditing(false);
      setSuccessMessage("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      setFailedMessage("Failed to update blog post.");
    }
  };

  // Delete Firestore
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "logEntries", post.id));
        setSuccessMessage("Blog post deleted.");
      } catch (error) {
        console.error("Error deleting post:", error);
        setFailedMessage("Failed to delete blog post.");
      }
    }
  };

  return (
    <section className="border-b border-gray-700 w-11/12 flex flex-col m-2 p-2">
      {successMessage && <div className="text-green-600 font-medium bg-green-100 p-2 rounded-md mb-4">{successMessage}</div>}
      {failedMessage && <div className="text-green-600 font-medium bg-red-100 p-2 rounded-md mb-4">{failedMessage}</div>}

      {isEditing ? (
        <div className="flex flex-col gap-2 items-center">
          <input type="text" name="title" value={updatedData.title} onChange={handleChange} className="p-1  rounded w-7/8" />
          
          {/* 🔹 Quill Editor in plaats van textarea */}
          <ReactQuill value={updatedData.notes} onChange={handleQuillChange} className="w-full bg-slate-950 h-80 mb-24 text-white" />

          <div className="flex gap-2 flex-col md:flex-row">
            <button onClick={handleUpdate} className="text-green-500 bg-green-100 rounded-lg w-36 hover:bg-green-300">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-red-500 bg-red-100 rounded-lg w-36 hover:bg-red-300">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center truncate">
          <div className="w-9/10 overflow-hidden">  
            <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date?.toDate().toLocaleDateString("nl-NL")}</p>
            
            {/* 🔹 Quill slaat op als HTML, dus render het correct */}
            <div className="mt-2 text-gray-200" dangerouslySetInnerHTML={{ __html: post.notes || "<em>Geen notities beschikbaar</em>" }} />

          </div>
          <div className="flex gap-2 z-50">
            <button onClick={() => setIsEditing(true)} className="text-blue-500"><Pencil /></button>
            <button onClick={handleDelete} className="text-red-500"><Trash2 /></button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogItemSpecial;

