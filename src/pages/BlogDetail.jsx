// src/pages/BlogDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../firebase";
import DOMPurify from "dompurify";
import { ArrowLeft } from "lucide-react"; // or any icon library
import { useNavigate } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "logEntries", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p className="text-white p-4">Loading...</p>;

  const formattedDate = post.date?.toDate().toLocaleDateString("nl-NL");
  const tags = Array.isArray(post.tags) ? post.tags : post.tags?.split(",") || [];

    return (
        <div className="min-h-screen bg-slate-950 text-gray-200 p-6 mt-10">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white hover:underline mb-4"
                aria-label="Go back"
            >
                <ArrowLeft className="mr-2" />
                Terug
            </button>
            <h1 className="text-3xl font-roboto-slab mb-2">{post.title}</h1>
            <p className="text-gray-400 mb-2">Geplaatst op {formattedDate}</p>
            <div className="flex gap-2 flex-col md:flex-row mb-4">
                <p>Woei van {post.windSpeed} knoopjes uit {post.windDirection}</p>
                <p>Zeetje is {post.seaState}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                <span key={index} className="bg-orange-500 text-gray-900 px-2 py-1 text-sm rounded">
                    {tag.trim()}
                </span>
                ))}
            </div>

            <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.notes || "<em>Geen notities beschikbaar</em>") }}
            />
        </div>
  );
}

export default BlogDetail;
