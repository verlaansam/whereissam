//to edit a blog item with tags and rich text editor is backend
import { useState } from "react";
import { Trash2, Pencil, X } from "lucide-react";
import { db, doc, deleteDoc, updateDoc } from "../firebase";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function BlogItemSpecial({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [], // Zorg dat tags altijd een array is
  });
  const [tagInput, setTagInput] = useState(""); // Nieuwe tag invoer
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  // Handle Quill input change
  const handleQuillChange = (value) => {
    setUpdatedData({ ...updatedData, notes: value });
  };

  // Tags verwerken bij spatiebalk
  const handleTagKeyDown = (e) => {
    if (e.key === " " && tagInput.trim()) {
      e.preventDefault(); // Voorkomt dat spatie wordt toegevoegd
      setUpdatedData({ ...updatedData, tags: [...updatedData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  // Tag verwijderen
  const removeTag = (index) => {
    setUpdatedData({
      ...updatedData,
      tags: updatedData.tags.filter((_, i) => i !== index),
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Update Firestore
  const handleUpdate = async () => {
    try {
      const postRef = doc(db, "logEntries", post.id);
      await updateDoc(postRef, {
        ...updatedData,
        tags: updatedData.tags, // Opslaan als array
      });
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
          <label className="block text-sm font-medium text-gray-200">Titel</label>
          <input type="text" name="title" value={updatedData.title} onChange={handleChange} className="p-1 rounded  border border-white w-7/8" />

          {/* 🔹 Tags invoer */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-200">Tags</label>
            <div className="flex flex-wrap gap-2 p-2 border rounded w-full bg-gray-800">
              {updatedData.tags.map((tag, index) => (
                <span key={index} className="flex items-center bg-orange-500 text-gray-200 px-2 py-1 text-sm rounded">
                  {tag}
                  <button onClick={() => removeTag(index)} className="ml-1 text-red-600 hover:text-red-800">
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="bg-transparent outline-none p-1 text-gray-200"
                placeholder="Type en druk op spatie..."
              />
            </div>
          </div>

          {/* 🔹 Quill Editor */}
          <ReactQuill value={updatedData.notes} onChange={handleQuillChange} className="w-full bg-slate-950 h-80 mb-24 text-white" />

          <div className="flex gap-2 flex-col md:flex-row">
            <button aria-label="Save blogitem" onClick={handleUpdate} className="text-green-500 bg-green-100 rounded-lg w-36 hover:bg-green-300">Save</button>
            <button aria-label="Cancel" onClick={() => setIsEditing(false)} className="text-red-500 bg-red-100 rounded-lg w-36 hover:bg-red-300">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center truncate">
          <div className="w-9/10 overflow-hidden">  
            <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date?.toDate().toLocaleDateString("nl-NL")}</p>
            
            {/* 🔹 Tags weergeven als blokjes */}
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags && post.tags.length > 0 ? (
                post.tags.map((tag, index) => (
                  <span key={index} className="bg-orange-500 text-gray-900 px-2 py-1 text-sm rounded">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-600">Geen tags</p>
              )}
            </div>

            {/* 🔹 Render Quill content als HTML */}
            <div className="mt-2 text-gray-200" dangerouslySetInnerHTML={{ __html: post.notes || "<em>Geen notities beschikbaar</em>" }} />
          </div>
          <div className="flex gap-2 z-50">
            <button aria-label="edit blogitem" onClick={() => setIsEditing(true)} className="text-blue-500"><Pencil /></button>
            <button aria-label="remove blogitem" onClick={handleDelete} className="text-red-500"><Trash2 /></button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogItemSpecial;




