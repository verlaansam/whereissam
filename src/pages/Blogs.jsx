import Header from "../components/Header"
import { useState, useEffect } from "react";
import { db, collection, getDocs, query, orderBy, limit } from "../firebase";
import BlogItem from "../components/BlogItem";


function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);

  // Fetch latest 3 blog posts from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogQuery = query(collection(db, "logEntries"), orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(blogQuery);
        const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center  border-b border-gray-700 p-5 bg-slate-950 h-screen">
        <Header title="Logboek"/>
        <h2 className="text-2xl font-roboto-slab  text-gray-200 pl-2 w-screen">Het Logboek</h2>
        <h4 className="text-sm text-gray-600 border-b border-gray-700 pl-2 w-screen">Op spelfouten voorbehouden</h4>
        <ul className="p-2 w-screen flex flex-col items-center">
        {/* Display Blog Items */}
        <ul className="p-2 w-screen flex flex-col items-center">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => <BlogItem key={post.id} post={post} />)
          ) : (
            <p className="text-gray-500">Geen blogposts beschikbaar.</p>
          )}
      </ul>
        </ul>
      </div>
  )
}

export default Blogs