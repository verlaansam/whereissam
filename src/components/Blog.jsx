import { useState, useEffect } from "react";
import { db, collection, query, orderBy, limit } from "../firebase";
import { onSnapshot } from "firebase/firestore"; // ✅ Import real-time listener
import BlogItem from "./BlogItem";
import { Link } from "react-router-dom";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const blogQuery = query(
      collection(db, "logEntries"),
      orderBy("date", "desc"), // Sort by newest first
      limit(3) // Limit to the latest 3 posts
    );

    // ✅ Real-time listener for blog posts
    const unsubscribe = onSnapshot(blogQuery, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogPosts(posts);
    });

    return () => unsubscribe(); // ✅ Cleanup listener on unmount
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center border-b border-gray-700 p-2">
      <h2 className="text-2xl font-roboto-slab text-gray-200 pl-2 w-screen md:w-3/4">Het Logboek</h2>
      <h3 className="text-sm text-gray-200 border-b border-gray-700 pl-2 w-screen md:w-3/4">
        Op spelfouten voorbehouden
      </h3>

      {/* Display Blog Items */}
      <ul className="p-2 w-screen flex flex-col items-center md:w-3/4">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => <li><BlogItem key={post.id} post={post} /></li>)
        ) : (
          <p className="text-gray-500">Geen blogposts beschikbaar.</p>
        )}
      </ul>

      <button aria-label="Meer Blogs" className="text-sm text-white font-roboto-slab border p-2 ml-4 w-3/4 hover:bg-white hover:text-black">
          <Link to="/Blog" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              Meer uit het logboek
          </Link>
      </button>

    </div>
  );
}

export default Blog;

