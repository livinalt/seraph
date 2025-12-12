// src/pages/ScamDirectory.tsx
import { useMemo, useState } from "react";
import ScamCard from "../../ScamCard";
import { ScamTable } from "../scamDirectory/ScamTable";
import { DirectorySearch } from "../scamDirectory/DirectorySearch";
import { DirectoryFilters } from "../scamDirectory/DirectoryFilters";
import AdBanner from "../../ads/AdBanner";
import { ScamDetailModal } from "../scamDirectory/ScamDetailModal";
import Header from "../../Header";

const mockData = [
    // Your 3 real ones stay here...
    // ... the 3 you already have ...

    // Then add the full 21 more realistic ones
    ...Array(21).fill(null).map((_, i) => ({
        id: 4 + i,
        name: ["moonshot-finance.app", "defi-yieldpro.io", "nft-giveaway.live", "btc-miner.cloud", "elon-giveaway.net"][i % 5],
        title: ["Moonshot Finance Rug", "YieldPro Fake Farm", "NFT Giveaway Scam", "Fake BTC Miner", "Elon Musk Impersonator"][i % 5],
        summary: "High-risk project with anonymous team and unsafe contract functions detected.",
        category: ["Token", "Website", "NFT", "Cloud Mining", "Impersonation"][i % 5],
        tags: i % 2 ? ["rug-pull", "anonymous-team"] : ["phishing", "fake-giveaway"],
        reports: Math.floor(Math.random() * 800) + 50,
        firstSeen: `2024-${String(Math.floor(Math.random() * 3) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        screenshot: `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&text=Scam+${i + 4}`,
        communitySafe: Math.floor(Math.random() * 25),
        explanation: "AI detected multiple red flags: anonymous team, unsafe contract functions, and suspicious tokenomics.",
        logoUrl: "https://via.placeholder.com/150/6366f1/ffffff?text=SCAM"
    }))
];

export default function ScamDirectory() {
    const [data] = useState(mockData);
    const categories = useMemo(() => Array.from(new Set(data.map(d => d.category))), [data]);

    const [query, setQuery] = useState("");
    const [view, setView] = useState<"grid" | "table">("grid");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(9);
    const [filters, setFilters] = useState({ risk: null, category: [], tags: [] });
    const [selected, setSelected] = useState<typeof mockData[0] | null>(null);

    const filtered = useMemo(() => {
        let out = data;
        if (query) {
            const q = query.toLowerCase();
            out = out.filter(i =>
                i.title.toLowerCase().includes(q) ||
                i.name.toLowerCase().includes(q) ||
                i.summary.toLowerCase().includes(q) ||
                i.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        if (filters.category.length) out = out.filter(i => filters.category.includes(i.category));
        if (filters.tags.length) out = out.filter(i => filters.tags.every(t => i.tags.includes(t)));
        return out;
    }, [data, query, filters]);

    const pageItems = filtered.slice(0, page * pageSize);

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#0b0b0c] text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* HERO: Title Left + Controls Right */}
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
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${view === "grid"
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
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${view === "table"
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

                    {/* Elegant Ad */}
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
                        {/* Filters */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                <DirectoryFilters
                                    filters={filters}
                                    setFilters={setFilters}
                                    categories={categories}
                                    onReset={() => setFilters({ risk: null, category: [], tags: [] })}
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
                                <p className="text-lg text-gray-300">{filtered.length} projects found</p>
                            </div>

                            {view === "grid" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {pageItems.map((item) => (
                                        <div key={item.id} className="h-full">
                                            <ScamCard
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

                            {/* Quiet Load More */}
                            {page * pageSize < filtered.length && (
                                <div className="mt-16 text-center">
                                    <button
                                        onClick={() => setPage(p => p + 1)}
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
                            <button className="text-yellow-400 font-bold text-xl hover:underline">
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