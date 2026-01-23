import { useEffect, useMemo, useState } from "react";
import Header from "../../Header";
import AdBanner from "../../ads/AdBanner";

import ScamCard from "../home/ScamCard";
import { DirectorySearch } from "./DirectorySearch";
import { DirectoryFilters } from "./DirectoryFilters";
import { ScamDetailModal } from "./ScamDetailModal";

import { fetchScams } from "../../../api/api";
import { type ScamItem } from "../../../types/ScamItem";
import { useReportModal } from "../../../hooks/useReportModal";

interface Filters {
  category: string[];
  tags: string[];
}

export default function ScamDirectory() {
  const { openReportModal } = useReportModal();

  const [scams, setScams] = useState<ScamItem[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  const [filters, setFilters] = useState<Filters>({
    category: [],
    tags: [],
  });

  const [selected, setSelected] = useState<ScamItem | null>(null);

  /* -----------------------------
     Derive categories
  ------------------------------*/
  const categories = useMemo(() => {
    return Array.from(new Set(scams.map((s) => s.category)));
  }, [scams]);

  /* -----------------------------
     Fetch data
  ------------------------------*/
  useEffect(() => {
    const loadScams = async () => {
      setLoading(true);

      try {
        const params: Record<string, string> = {
          page: page.toString(),
          limit: pageSize.toString(),
        };

        if (query) params.search = query;
        if (filters.category.length)
          params.category = filters.category.join(",");
        if (filters.tags.length)
          params.tags = filters.tags.join(",");

        const data = await fetchScams(params);

        setScams((prev) =>
          page === 1 ? data.scams : [...prev, ...data.scams]
        );
        setTotal(data.total ?? data.scams.length);
      } catch (err) {
        console.error("Failed to load scams:", err);
        if (page === 1) setScams([]);
        setTotal(0);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    loadScams();
  }, [query, filters, page]);

  const handleResetFilters = () => {
    setFilters({ category: [], tags: [] });
    setQuery("");
    setPage(1);
  };

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen text-slate-900">
        {/* ================= HERO ================= */}
        <section className="bg-[#F8FAFC] pt-24 pb-10">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-5">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Scam Intelligence Directory
            </h1>

            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Explore AI-analyzed projects, community-reported scams, and
              high-risk entities across Web3 and beyond.
            </p>

            <div className="max-w-xl mx-auto">
              <DirectorySearch value={query} onChange={setQuery} />
            </div>
          </div>
        </section>

        {/* ================= FILTER / TABS BAR ================= */}
        <section className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-6">
              {/* Tab-style filters */}
              <div className="flex-1 overflow-x-auto no-scrollbar">
                <div className="flex gap-3">
                  <DirectoryFilters
                    filters={filters}
                    setFilters={setFilters}
                    categories={categories}
                    onReset={handleResetFilters}
                  />
                </div>
              </div>

              <span className="text-sm text-slate-500 whitespace-nowrap">
                {total} results
              </span>
            </div>
          </div>
        </section>

        {/* ================= AD ================= */}
        <div className="max-w-7xl mx-auto px-6 my-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-400 mb-2">Advertisement</p>
            <AdBanner />
          </div>
        </div>

        {/* ================= GRID ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          {initialLoad && loading ? (
            <div className="py-16 text-center text-sm text-slate-500">
              Loading scams…
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {scams.map((item) => (
                  <ScamCard
                    key={item._id}
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
                ))}

                {!initialLoad &&
                  loading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-64 rounded-xl bg-slate-100 animate-pulse"
                    />
                  ))}
              </div>

              {page * pageSize < total && (
                <div className="mt-14 text-center">
                  <button
                    disabled={loading}
                    onClick={() => setPage((p) => p + 1)}
                    className="
                      px-6 py-2.5 text-sm font-medium
                      bg-white border border-slate-300
                      rounded-lg hover:bg-slate-50
                      transition disabled:opacity-50
                    "
                  >
                    {loading ? "Loading…" : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-[#F8FAFC] py-20 text-center">
          <h3 className="text-2xl font-semibold">
            Found a scam we missed?
          </h3>
          <p className="mt-3 text-slate-500">
            Help protect the community by reporting suspicious activity.
          </p>

          <button
            onClick={openReportModal}
            className="
              mt-6 px-8 py-3
              bg-blue-600 text-white
              font-semibold rounded-xl
              hover:bg-blue-500 transition
            "
          >
            Report a Scam
          </button>
        </section>

        <ScamDetailModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      </main>
    </>
  );
}
