import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  readTime?: string;
}

const BlogCard = ({
  slug,
  title,
  excerpt,
  coverImage,
  publishedAt,
  readTime,
}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${slug}`}
      className="
        group
        bg-white
        border border-gray-200
        rounded-2xl
        overflow-hidden
        shadow-sm
        transition
        hover:shadow-md
        hover:border-emerald-300
        flex flex-col
      "
    >
      {/* Cover */}
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="
              h-full w-full object-cover
              transition-transform duration-300
              group-hover:scale-[1.02]
            "
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            Seraph Blog
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {publishedAt}
          </span>
          {readTime && <span>• {readTime}</span>}
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-6">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-emerald-600">
          Read article
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
