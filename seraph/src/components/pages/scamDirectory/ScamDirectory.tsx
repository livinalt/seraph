// src/pages/scamDirectory/ScamDirectory.tsx
import { useMemo, useState, useEffect } from "react";
import ScamCard from "../home/ScamCard"; 
import { ScamTable } from "../scamDirectory/ScamTable";
import { DirectorySearch } from "../scamDirectory/DirectorySearch";
import { DirectoryFilters } from "../scamDirectory/DirectoryFilters";
import AdBanner from "../../ads/AdBanner";
import { ScamDetailModal } from "../scamDirectory/ScamDetailModal";
import Header from "../../Header";
import { fetchScams } from "../../../api/api"; 
import { type ScamItem } from "../../../types/ScamItem"; 
import { useReportModal } from "../../../hooks/useReportModal";


interface Filters {
  category: string[];
  tags: string[];
}

export default function ScamDirectory() {
  const [scams, setScams] = useState<ScamItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { openReportModal } = useReportModal();

  const categories = useMemo(() => {
    const cats = new Set(scams.map((s) => s.category));
    return Array.from(cats);
  }, [scams]);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [filters, setFilters] = useState<Filters>({ category: [], tags: [] });
  const [selected, setSelected] = useState<ScamItem | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const loadScams = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          page: page.toString(),
          limit: pageSize.toString(),
        };
        if (query) params.search = query;
        if (filters.category.length > 0) params.category = filters.category.join(",");
        if (filters.tags.length > 0) params.tags = filters.tags.join(",");

        const data = await fetchScams(params);
        setScams(data.scams);
        setTotal(data.total || data.scams.length);
      } catch (err) {
        console.error("Failed to load scams:", err);
        setScams([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    loadScams();
  }, [query, filters, page]);

  const pageItems = scams;

  const handleResetFilters = () => {
    setFilters({ category: [], tags: [] });
    setQuery("");
    setPage(1);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center">
          <p className="text-white text-xl">Loading scams...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#0b0b0c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* HERO: Title + Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
            <div className="max-w-2xl">
              <h1 className="pt-20 text-5xl md:text-6xl font-bold text-white leading-tight">
                Projects Directory
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
              <div className="w-full sm:w-96">
                <DirectorySearch value={query} onChange={setQuery} />
              </div>

              <div className="flex gap-2 bg-[#0f0f11] p-1.5 rounded-xl border border-white/10">
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    view === "grid"
                      ? "bg-yellow-400 text-black shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                    <path fill="currentColor" opacity="0.3" d="M8 4h8v12H8V4zM4 8h4v8H4V8z" />
                  </svg>
                  Grid
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    view === "table"
                      ? "bg-yellow-400 text-black shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Ad Banner */}
          <div className="my-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0f0f11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 px-6 py-3 text-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advertisement</span>
                </div>
                <div className="p-8 bg-[#0b0b0c] flex justify-center">
                  <div className="max-w-2xl w-full">
                    <AdBanner />
                  </div>
                </div>
                <div className="px-6 py-3 text-center">
                  <p className="text-xs text-gray-500">Your support keeps this free for everyone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 space-y-8">
                <DirectoryFilters
                  filters={filters}
                  setFilters={setFilters}
                  categories={categories}
                  onReset={handleResetFilters}
                />
                <div className="bg-[#0f0f11] border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-gray-500 text-center mb-3">Advertisement</p>
                  <AdBanner />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="xl:col-span-3">
              <div className="mb-8 flex justify-between items-center">
                <p className="text-lg text-gray-300">{total} projects found</p>
              </div>

              {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {pageItems.map((item) => (
                    <div key={item._id} className="h-full">
                      <ScamCard
                        _id={item._id}
                        title={item.title}
                        entityType={item.category}
                        summary={item.summary}
                        tags={item.tags}
                        communitySafe={item.communitySafe}
                        explanation={item.explanation}
                        thumbnailUrl={item.screenshot}
                        logoUrl={item.logoUrl}
                        reportedCount={item.reports}
                      />
                    </div>
                  ))}
                </div>
              )}

              {view === "table" && <ScamTable items={pageItems} onView={setSelected} />}

              {/* Load More */}
              {page * pageSize < total && (
                <div className="mt-16 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white bg-[#0f0f11] border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                  >
                    Load more projects
                  </button>
                </div>
              )}

              {/* Mid-content Ad */}
              {pageItems.length > 6 && (
                <div className="my-16">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-[#0f0f11] border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-3">Advertisement</p>
                      <AdBanner />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-24 py-16 border-t border-gray-800">
            <p className="text-lg text-gray-400">
              Found a scam not listed?{" "}
              <button className="text-yellow-400 font-bold text-xl hover:underline"
              onClick={openReportModal}
              >
                Report It Now
              </button>
            </p>
          </div>
        </div>

        <ScamDetailModal item={selected} onClose={() => setSelected(null)} />
      </div>
    </>
  );
}