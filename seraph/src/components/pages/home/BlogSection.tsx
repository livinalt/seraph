// src/components/blog/BlogSection.tsx
import BlogCard from "../blog/BlogCard";
import { blogs } from "../blog/data/blogs";
import { Link } from "react-router-dom";

const BlogSection = () => (
  <section id="blog" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Insights & Security Research
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Learn how scams work, how we detect them, and how to stay protected.
          </p>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          View all articles
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((post: { slug: any; }) => (
          <BlogCard title={""} excerpt={""} content={""} publishedAt={""} key={post.slug} {...post} />
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
