// src/pages/BlogDetails.tsx
import { useParams, Navigate } from "react-router-dom";
import { blogs } from "./data/blogs";

const BlogDetails = () => {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) return <Navigate to="/blog" />;

  return (
    <main className="bg-[#F7F8FA] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-10">
          {/* ================= LEFT AD ================= */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <p className="text-xs text-slate-400 text-center">
                Advertisement
              </p>
              <div className="h-[600px] bg-white border border-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-400">
                Ad slot
              </div>
            </div>
          </aside>

          {/* ================= ARTICLE ================= */}
          <article className="bg-[#F7F8FA] rounded-3xl overflow-hidden">
            {/* Hero */}
            {post.coverImage && (
              <div className="relative h-[420px]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 h-full flex items-end">
                  <div className="p-8 sm:p-12 max-w-3xl">
                    <p className="text-sm text-white/80 mb-2">
                      {post.publishedAt}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-8 sm:px-12 py-12 max-w-3xl mx-auto">
              <div className="prose prose-lg prose-slate max-w-none">
                {post.content
                  .trim()
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
            </div>
          </article>

          {/* ================= RIGHT AD ================= */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <p className="text-xs text-slate-400 text-center">
                Advertisement
              </p>
              <div className="h-[600px] bg-white border border-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-400">
                Ad slot
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogDetails;
