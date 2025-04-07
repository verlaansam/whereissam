import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

function getFirstSentence(html) {
  // Strip HTML tags first
  const text = html.replace(/<\/?[^>]+(>|$)/g, ""); 

  // Match the first sentence using punctuation
  const match = text.match(/.*?[.?!](\s|$)/);
  const firstSentence = match ? match[0] : text;

  // Wrap it in a paragraph tag again for safe rendering
  return `<p>${firstSentence.trim()}</p>`;
}


function BlogItem({ post }) {
  const formattedDate = post.date?.toDate().toLocaleDateString("nl-NL");
  const tags = Array.isArray(post.tags) ? post.tags : post.tags?.split(",") || [];

  return (
    <Link to={`/blog/${post.id}`} aria-label={`Bekijk blogpost: ${post.title}`}>
      <section className="border-b border-gray-700 p-4 hover:bg-gray-800 transition duration-200 w-screen">
        <h3 className="text-lg font-roboto-slab text-gray-200">{post.title}</h3>
        <p className="text-gray-200">Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
        <p className="text-sm text-gray-600">Geplaatst op {formattedDate}</p>

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

        <div
          className="mt-2 text-gray-200"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              getFirstSentence(post.notes || "<em>Geen notities beschikbaar</em>")
            ),
          }}
        />
        <span className="text-blue-400 hover:underline ml-1">Lees meer →</span>
      </section>
    </Link>
  );
}

export default BlogItem;
