import Header from "../components/Header";
import { useState, useEffect } from "react";
import { db, collection, getDocs, query, orderBy, limit } from "../firebase";
import BlogItem from "../components/BlogItem";

function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [sortOption, setSortOption] = useState("date-desc"); // Default: nieuwste eerst

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogQuery = query(collection(db, "logEntries"), orderBy("date", "desc"), limit(10));
        const querySnapshot = await getDocs(blogQuery);
        const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, []);

  const sortPosts = (posts, option) => {
    const sortedPosts = [...posts];
    
    const getDate = (date) => {
      if (!date) return new Date(0); // Default naar 1970 als er geen datum is
      return date.seconds ? new Date(date.seconds * 1000) : new Date(date); // Firestore Timestamp check
    };
    
    switch (option) {
      case "date-desc":
        return sortedPosts.sort((a, b) => getDate(b.date) - getDate(a.date)); // Nieuwste eerst
      case "date-asc":
        return sortedPosts.sort((a, b) => getDate(a.date) - getDate(b.date)); // Oudste eerst
      case "title-asc":
        return sortedPosts.sort((a, b) => a.title.localeCompare(b.title)); // A-Z
      case "title-desc":
        return sortedPosts.sort((a, b) => b.title.localeCompare(a.title)); // Z-A
      case "tags-asc":
        return sortedPosts.sort((a, b) => (a.tags?.[0] || "").localeCompare(b.tags?.[0] || "")); // Tags A-Z
      case "tags-desc":
        return sortedPosts.sort((a, b) => (b.tags?.[0] || "").localeCompare(a.tags?.[0] || "")); // Tags Z-A
      default:
        return sortedPosts;
    }
  };
  

  return (
    <div className="w-screen flex flex-col items-center border-b border-gray-700 p-5 bg-slate-950" key='1'>
      <Header title="Logboek" />
      <h2 className="text-2xl font-roboto-slab text-gray-200 pl-2 w-screen">Het Logboek</h2>
      <h4 className="text-sm text-gray-200 border-b border-gray-700 pl-2 w-screen">
        Op spelfouten voorbehouden
      </h4>

      {/* Sorteer dropdown */}
      <div className="w-full flex justify-end pr-4 my-3">
        <select
          aria-label="Sort options"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm text-white font-roboto-slab border p-2 hover:bg-white hover:text-black"
        >
          <option aria-label="date new-old" value="date-desc">Datum (Nieuw → Oud)</option>
          <option aria-label="date old-new" value="date-asc">Datum (Oud → Nieuw)</option>
          <option aria-label="title a-z" value="title-asc">Titel (A-Z)</option>
          <option aria-label="tags a-z" value="tags-asc">Tags (A-Z)</option>
        </select>
      </div>

      {/* Blog Items weergeven */}
      <ul className="p-2 w-screen flex flex-col items-center">
        {blogPosts.length > 0 ? (
          sortPosts(blogPosts, sortOption).map((post) => <li><BlogItem key={post.id} post={post} /></li>)
        ) : (
          <p className="text-gray-500">Geen blogposts beschikbaar.</p>
        )}
      </ul>
    </div>
  );
}

export default Blogs;
