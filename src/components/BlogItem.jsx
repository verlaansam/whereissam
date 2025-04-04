import { useState, useMemo, memo } from "react";
import { X } from "lucide-react";
import DOMPurify from "dompurify";

function BlogItem({ post }) {
  const [isOpen, setIsOpen] = useState(false);

  // 🧠 Memoize derived values
  const formattedDate = useMemo(() => {
    return post.date?.toDate().toLocaleDateString("nl-NL");
  }, [post.date]);

  const tags = useMemo(() => {
    if (Array.isArray(post.tags)) return post.tags;
    return post.tags ? post.tags.split(",") : [];
  }, [post.tags]);

  return (
    <>
      {/* Preview block */}
      <section
        aria-label="Click for Full blog post"
        className="border-b border-gray-700 p-4 cursor-pointer hover:bg-gray-800 transition duration-200 w-screen"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
        <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
        <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>

        {/* Tags */}
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

        {/* Preview of content */}
        <div
          className="mt-2 text-gray-200 truncate"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.notes || "<em>Geen notities beschikbaar</em>"),
          }}
        />
      </section>

      {/* Lazy-loaded Modal */}
      {isOpen && (
        <Modal post={post} formattedDate={formattedDate} tags={tags} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

// 🧠 Extract modal to prevent unnecessary DOM creation
function Modal({ post, formattedDate, tags, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-slate-950 p-6 rounded-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto md:max-w-2xl">
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-roboto-slab text-gray-200">{post.title}</h2>
        <div className="flex gap-2 flex-col md:flex-row">
          <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
          <p className="text-gray-200">Zeetje is {post.seaState}</p>
        </div>
        <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>

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

        <div
          className="mt-2 text-gray-200 prose prose-invert"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.notes || "<em>Geen notities beschikbaar</em>"),
          }}
        />
      </div>
    </div>
  );
}

// 🧠 Memoize entire component
export default memo(BlogItem);
