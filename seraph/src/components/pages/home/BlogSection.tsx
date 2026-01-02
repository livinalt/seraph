import BlogCard from "../blog/BlogCard";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const posts = [
    {
      slug: "how-ai-detects-crypto-scams",
      title: "How AI Detects Crypto Scams Before You Fall for Them",
      excerpt:
        "A deep dive into how machine learning models analyze on-chain data, patterns, and community signals to identify scams early.",
      publishedAt: "Jan 12, 2026",
      readTime: "6 min read",
      coverImage: "/blog/ai-scam-detection.jpg",
    },
    {
      slug: "common-web3-scam-patterns",
      title: "The Most Common Web3 Scam Patterns You Should Know",
      excerpt:
        "From fake airdrops to rug pulls — learn the most frequent scam techniques and how to spot them early.",
      publishedAt: "Jan 5, 2026",
      readTime: "5 min read",
      coverImage: "/blog/web3-scams.jpg",
    },
    {
      slug: "community-reporting-importance",
      title: "Why Community Reporting Is Critical for Web3 Safety",
      excerpt:
        "Decentralized safety relies on people. Here’s how community-driven reporting strengthens scam detection.",
      publishedAt: "Dec 28, 2025",
      readTime: "4 min read",
      coverImage: "/blog/community-reports.jpg",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Insights & Security Research
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Learn how scams work, how we detect them, and how to stay protected
              in Web3.
            </p>
          </div>

          <Link
            to="/blog"
            className="
              inline-flex
              items-center
              gap-2
              text-sm font-medium
              text-emerald-600
              hover:text-emerald-700
            "
          >
            View all articles
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
