import { useEffect, useState } from "react";
import ScamCard from "../../pages/home/ScamCard";
import { type ScamItem } from "../../../types/ScamItem";
import { Link } from "react-router-dom";

const TrendingScams = () => {
  const [scams, setScams] = useState<ScamItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://seraph-1.onrender.com/api/scams?limit=8&sort=reports"
        );
        const data = await res.json();
        setScams(data.scams || []);
      } catch (err) {
        console.error("Failed to load trending scams:", err);
        setScams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="w-full py-24 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Community intelligence
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Latest reports
            </h2>
          </div>

          <Link
            to="/directory"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
          >
            View all
            <span>→</span>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && scams.length === 0 && (
          <p className="text-gray-500 text-center py-16">
            No reports yet. Be the first to report a scam.
          </p>
        )}

        {/* Grid */}
        {!loading && scams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {scams.map((scam) => (
              <ScamCard
                key={scam._id}
                _id={scam._id}
                title={scam.title}
                entityType={scam.category}
                summary={scam.summary}
                tags={scam.tags}
                communitySafe={scam.communitySafe}
                explanation={scam.explanation}
                thumbnailUrl={scam.screenshot}
                logoUrl={scam.logoUrl}
                reportedCount={scam.reports}
              />
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="text-center mt-12 sm:hidden">
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all reports
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingScams;
