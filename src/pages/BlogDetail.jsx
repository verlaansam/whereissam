// src/pages/BlogDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, collection, query, where, getDocs } from "../firebase";
import DOMPurify from "dompurify";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

function BlogDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "logEntries"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setPost({ id: doc.id, ...doc.data() });
        } else {
          console.error("No blog post found for slug:", slug);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p className="text-white p-4">{t("Loading")}</p>;

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
        {t("Back")}
      </button>
      <article>
        <header>
          <h1 className="text-3xl font-roboto-slab mb-2">{post.title}</h1>
          <p className="text-gray-400 mb-2">{t("BlogPostDate")}{formattedDate}</p>
          <div className="flex gap-2 flex-col md:flex-row mb-4">
            <p>{t("BlogPostWindSpeed")} {post.windSpeed} {t("BlogPostWindDirection")}{post.windDirection}</p>
            <p>{t("SeaState")} {post.seaState}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="bg-orange-500 text-gray-900 px-2 py-1 text-sm rounded">
                {tag.trim()}
              </span>
            ))}
          </div>
        </header>
        <section
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.notes || "<em>Geen notities beschikbaar</em>"),
          }}
        />
      </article>
    </div>
  );
}

export default BlogDetail;
