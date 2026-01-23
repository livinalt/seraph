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

        {/* Loading State – Single row skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 w-80 flex-shrink-0 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse snap-start"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && scams.length === 0 && (
          <p className="text-gray-500 text-center py-16">
            No reports yet. Be the first to report a scam.
          </p>
        )}

        {/* Cards – Single horizontal row with scroll */}
        {!loading && scams.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {scams.map((scam) => (
              <div key={scam._id} className="flex-shrink-0 w-80 snap-start">
                <ScamCard
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
              </div>
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