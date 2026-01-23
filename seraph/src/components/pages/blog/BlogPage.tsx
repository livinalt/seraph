import { useMemo, useState } from "react";
import BlogCard from "../blog/BlogCard";
import { blogs } from "./data/blogs";

const TABS = ["All", "Research", "Guides", "Analysis"] as const;
type Tab = (typeof TABS)[number];

const BlogListing = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredBlogs = useMemo(() => {
    if (activeTab === "All") return blogs;
    return blogs.filter((post) => post.category === activeTab);
  }, [activeTab]);

  return (
    <main className="bg-[#F7F8FA] min-h-screen text-slate-900">
      {/* ================= HERO ================= */}
      <section className="bg-white pt-24 pb-10">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <p className="text-sm font-medium text-slate-500">
            Insights & Research
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Articles & Guides
          </h1>

          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Deep dives, explainers, and research articles on scams,
            cybersecurity threats, and emerging risks.
          </p>
        </div>
      </section>

      {/* ================= FILTER TABS ================= */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-4 py-1.5 text-sm font-medium rounded-full
                      transition
                      ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }
                    `}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <span className="text-sm text-slate-500 whitespace-nowrap">
              {filteredBlogs.length} articles
            </span>
          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="py-20 text-center text-sm text-slate-500">
            No articles found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogListing;
