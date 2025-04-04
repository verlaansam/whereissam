import { useState } from "react";
import { X } from "lucide-react"; // Close button icon
import DOMPurify from "dompurify"; // Security for rendering HTML safely

function BlogItem({ post }) {
  const [isOpen, setIsOpen] = useState(false); // Control popup visibility
  const formattedDate = post.date?.toDate().toLocaleDateString("nl-NL"); // ✅ Convert Firestore timestamp

  // ✅ Zorg dat tags altijd een array zijn
  const tags = Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(",") : []);

  return (
    <>
      <section
        aria-label="Click for Full blog post"
        className="border-b border-gray-700 p-4 cursor-pointer hover:bg-gray-800 transition duration-200 w-screen"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
        <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
        <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>

        {/* ✅ Tags als blokjes weergeven */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span key={index} className="bg-orange-500 text-gray-900 px-2 py-1 text-sm rounded">
                {tag.trim()}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-600">Geen tags</p>
          )}
        </div>

        {/* ✅ Render Quill content safely */}
        <div
          className="mt-2 text-gray-200 truncate"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.notes || "*Geen notities beschikbaar*") }}
        />
      </section>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-slate-950 p-6 rounded-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto md:max-w-2xl">
            
            {/* Close button */}
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-roboto-slab text-gray-200">{post.title}</h2>
            <div className="flex gap-2 flex-col md:flex-row">
              <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
              <p className="text-gray-200">Zeetje is {post.seaState}</p>
            </div>
            <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>

            {/* ✅ Tags in de popup als blokjes weergeven */}
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span key={index} className="bg-orange-500 text-gray-200 px-2 py-1 text-sm rounded">
                    {tag.trim()}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-600">Geen tags</p>
              )}
            </div>

            {/* ✅ Render full Quill content */}
            <div
              className="mt-2 text-gray-200 prose prose-invert"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.notes || "*Geen notities beschikbaar*") }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BlogItem;