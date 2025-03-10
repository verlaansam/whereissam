import { useState } from "react";
import { X } from "lucide-react"; // Close button icon
import ReactMarkdown from "react-markdown";

function BlogItem({ post }) {
  const [isOpen, setIsOpen] = useState(false); // Control popup visibility
  const formattedDate = post.date?.toDate().toLocaleDateString("nl-NL"); // ✅ Convert Firestore timestamp

  return (
    <>
      <section
        className="border-b border-gray-700 p-4 cursor-pointer hover:bg-gray-800 transition duration-200 w-11/12"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
        <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
        <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>
        <div className="mt-2 text-gray-200 truncate">
              <ReactMarkdown >{post.notes || "*Geen notities beschikbaar*"}</ReactMarkdown>
            </div>
      </section>
      

      {/* Popup Modal */}
      {isOpen && (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
        <div className="bg-slate-950 p-6 rounded-lg max-w-lg w-full relative  max-h-[80vh] overflow-y-auto">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-roboto-slab text-gray-200">{post.title}</h2>
          <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
          <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>
          {/* Markdown-rendered notes */}
          <div className="mt-2 text-gray-200 prose prose-invert">
            <ReactMarkdown>{post.notes || "*Geen notities beschikbaar*"}</ReactMarkdown>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default BlogItem;
