// src/components/blog/BlogCard.tsx
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "./data/blogs";

const BlogCard = ({ slug, title, excerpt, coverImage, publishedAt }: BlogPost) => (
  <Link
    to={`/blog/${slug}`}
    className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
  >
    {coverImage && (
      <div className="h-40 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    )}
    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Calendar size={12} />
        {publishedAt}
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-3">{excerpt}</p>
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-600">
        Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default BlogCard;
