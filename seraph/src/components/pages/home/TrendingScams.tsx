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

  if (loading) {
    return (
      <section className="w-full py-24 bg-[#02040A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white text-xl">Loading latest reports...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-24 bg-[#02040A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-left mb-12">
          Latest Reports
        </h2>

        {scams.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            No reports yet. Be the first to report a scam!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
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

        <div className="text-center mt-16">
          <Link
            to="/directory"
            className="text-yellow-400 text-lg font-medium hover:underline transition inline-block"
          >
            View all reports →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingScams;
