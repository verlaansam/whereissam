import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { db, doc, deleteDoc, updateDoc } from "../firebase";
import ReactMarkdown from "react-markdown";

function BlogItemSpecial({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...post });
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message
  const [failedMessage, setFailedMessage] = useState(""); // State for failed message

  // Handle input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Update the blog post in Firestore
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

  // Delete the blog post from Firestore
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
      {/* ✅ Success Message */}
      {successMessage && (
        <div className="text-green-600 font-medium bg-green-100 p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {/* ✅ Failed Message */}
      {failedMessage && (
        <div className="text-green-600 font-medium bg-red-100 p-2 rounded-md mb-4">
          {failedMessage}
        </div>
      )}

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={updatedData.title}
            onChange={handleChange}
            className="p-1 border rounded"
          />
          <textarea
            name="notes"
            value={updatedData.notes}
            onChange={handleChange}
            className="p-1 border rounded h-96"
          />
          <button onClick={handleUpdate} className="text-green-500">Save</button>
          <button onClick={() => setIsEditing(false)} className="text-red-500">Cancel</button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date?.toDate().toLocaleDateString("nl-NL")}</p>
            <p className="mt-2 text-gray-200 truncate w-64">{post.notes || "*Geen notities beschikbaar*"}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500"><Pencil /></button>
            <button onClick={handleDelete} className="text-red-500"><Trash2 /></button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BlogItemSpecial;
