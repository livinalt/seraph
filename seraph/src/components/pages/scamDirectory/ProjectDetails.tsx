// src/pages/scamDirectory/ProjectDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  FileCode,
  Coins,
  Layers,
  ShieldAlert,
  TrendingUp,
  Flag,
  Loader2,
} from "lucide-react";

import Header from "../../Header";
import ShareButton from "../home/ShareButton";
import AdBanner from "../../ads/AdBanner";

interface ScamDetails {
  _id: string;
  title: string;
  name: string;
  category: string;
  screenshot?: string;
  verdict: string;
  explanation: string;
  reports: number;
}

interface TrendingScam {
  _id: string;
  title: string;
  summary?: string;
  explanation: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [scam, setScam] = useState<ScamDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const [trending, setTrending] = useState<TrendingScam[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);

  /** Fetch main project */
  useEffect(() => {
    if (!id) return;

    fetch(`https://seraph-1.onrender.com/api/scams/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setScam)
      .catch((err) => {
        console.error("Failed to load project:", err);
        setScam(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /** Fetch trending */
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://seraph-1.onrender.com/api/scams?limit=4&sort=reports"
        );
        const data = await res.json();
        setTrending(data.scams || []);
      } catch (e) {
        console.error("Failed to load trending:", e);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrending();
  }, []);

  const getCategoryIcon = () => {
    switch (scam?.category?.toLowerCase()) {
      case "website":
        return <Globe size={16} className="text-blue-600" />;
      case "token":
        return <Coins size={16} className="text-yellow-600" />;
      case "contract":
        return <FileCode size={16} className="text-purple-600" />;
      default:
        return <Layers size={16} className="text-green-600" />;
    }
  };

  const handleReport = async () => {
    if (!scam || reporting || reported) return;

    try {
      setReporting(true);
      await fetch(`https://seraph-1.onrender.com/api/scams/${scam._id}/report`, {
        method: "POST",
      });

      setScam((prev) => (prev ? { ...prev, reports: prev.reports + 1 } : prev));
      setReported(true);
    } catch (err) {
      console.error("Report failed:", err);
    } finally {
      setReporting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          <Loader2 size={32} className="animate-spin mr-3" />
          Loading project details...
        </div>
      </>
    );
  }

  if (!scam) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Project not found
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-white px-,std py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ================= MAIN CONTENT ================= */}
          <section className="lg:col-span-7">
            {/* Back Button - Takes to previous page */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-900 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* Project Header */}
            <div className="flex gap-5 mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">
                {scam.screenshot ? (
                  <img
                    src={scam.screenshot}
                    alt={scam.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShieldAlert size={40} />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{scam.title}</h1>
                <p className="text-gray-600 mb-2">{scam.name}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {getCategoryIcon()}
                  <span>{scam.category}</span>
                  <span>•</span>
                  <span>{scam.reports} reports</span>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-gray-700 leading-relaxed mb-8 text-base">
              {scam.explanation}
            </p>

            {/* Verdict Box */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Verdict</h3>
              <p className="text-xl font-medium text-gray-800">{scam.verdict}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <ShareButton title={scam.title} url={window.location.href} />

              <button
                onClick={handleReport}
                disabled={reporting || reported}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border font-medium transition
                  ${reported
                    ? "bg-green-50 border-green-300 text-green-700 cursor-default"
                    : "border-red-300 text-red-600 hover:bg-red-50"
                  }`}
              >
                {reporting && <Loader2 size={14} className="animate-spin" />}
                <Flag size={14} />
                {reported ? "Reported" : "Report this project"}
              </button>
            </div>
          </section>

          {/* ================= ADS (Sticky) ================= */}
          <aside className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-24">
              <AdBanner />
            </div>
          </aside>

          {/* ================= TRENDING (Sticky) ================= */}
          <aside className="lg:col-span-3">
            <div className="static top-24 space-y-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-700">
                  <TrendingUp size={16} />
                  Trending reports
                </div>

                {loadingTrending ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 bg-white rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trending.map((item) => (
                      <Link
                        key={item._id}
                        to={`/project/${item._id}`}
                        className="block pb-4 border-b border-gray-100 last:border-none hover:bg-gray-100 p-3 rounded-lg transition"
                      >
                        <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {item.summary || item.explanation}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <AdBanner />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default ProjectDetails;