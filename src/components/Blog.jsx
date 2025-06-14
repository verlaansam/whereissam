import { useState, useEffect } from "react";
import { db, collection, query, orderBy, limit, getDocs } from "../firebase";
import BlogItem from "./BlogItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Blog() {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: show loading

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogQuery = query(
          collection(db, "logEntries"),
          orderBy("date", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(blogQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center border-b border-gray-700 p-2">
      <h2 className="text-2xl font-roboto-slab text-gray-200 pl-2 w-screen md:w-3/4">{t("BlogHeader")}</h2>
      <h3 className="text-sm text-gray-200 border-b border-gray-700 pl-2 w-screen md:w-3/4">
        {t("BlogSubHeader")}
      </h3>

      <ul className="p-2 w-screen flex flex-col items-center md:w-3/4">
        {loading ? (
          <p className="text-gray-500">{t("BlogLoading")}</p>
        ) : blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <li key={post.id} className="w-full">
              <Link to={`/blog/${post.slug}`} aria-label={`Bekijk blogpost: ${post.title}`}>
                <BlogItem post={post} />
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">{t("BlogNoPost")}</p>
        )}
      </ul>

      <button
        aria-label="Meer Blogs"
        className="text-sm text-white font-roboto-slab border p-2 ml-4 w-3/4 hover:bg-white hover:text-black"
      >
        <Link to="/Blog" className="block p-3 md:p-0 hover:underline">
          {t("BlogMorePosts")}
        </Link>
      </button>
    </div>
  );
}

export default Blog;


