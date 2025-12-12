interface Filters {
    category: string[];
    risk: string | null;
    tags: string[];
}

interface FiltersProps {
    filters: Filters;
    setFilters: (fn: (f: Filters) => Filters) => void;
    categories: string[];
    onReset: () => void;
}

export const DirectoryFilters = ({ filters, setFilters, categories, onReset }: FiltersProps) => {
    const toggleCategory = (cat: string) =>
        setFilters((f: Filters) => ({
            ...f,
            category: f.category.includes(cat)
                ? f.category.filter((c: string) => c !== cat)
                : [...f.category, cat],
        }));

    const toggleTag = (tag: string) =>
        setFilters((f: Filters) => ({
            ...f,
            tags: f.tags.includes(tag) ? f.tags.filter((t: string) => t !== tag) : [...f.tags, tag],
        }));

    const toggleRisk = (r: string) =>
        setFilters((f: Filters) => ({
            ...f,
            risk: f.risk === r ? null : r,
        }));

    return (
        <div className="bg-[#0f0f11] p-4 rounded-xl border border-white/6">
            <div className="flex justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-200">Filters</h3>
                <button onClick={onReset} className="text-sm text-gray-400 hover:text-white">Reset</button>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="text-xs text-gray-300 mb-2">Risk</div>
                    <div className="flex gap-2">
                        {["High", "Medium", "Low"].map((r) => (
                            <button
                                key={r}
                                onClick={() => toggleRisk(r)}
                                className={`px-3 py-1 text-sm rounded-md font-medium transition ${filters.risk === r
                                        ? r === "High" ? "bg-red-600 text-white" : r === "Medium" ? "bg-yellow-500 text-black" : "bg-green-600 text-white"
                                        : "bg-[#111] text-gray-300 border border-white/6"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-gray-300 mb-2">Category</div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => toggleCategory(c)}
                                className={`px-3 py-1 text-sm rounded-md ${filters.category.includes(c) ? "bg-yellow-400 text-black" : "bg-[#111] text-gray-300 border border-white/6"}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-gray-300 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                        {["honeypot", "phishing", "fake-airdrop", "impersonation"].map((t) => (
                            <button
                                key={t}
                                onClick={() => toggleTag(t)}
                                className={`px-2 py-1 text-xs rounded-md ${filters.tags.includes(t) ? "bg-[#222] text-yellow-300 border border-yellow-400" : "bg-[#111] text-gray-400 border border-white/6"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};