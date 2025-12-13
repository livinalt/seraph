// src/components/scamDirectory/DirectoryFilters.tsx
import type { Dispatch, SetStateAction } from "react";

interface Filters {
    category: string[];
    tags: string[];
}

interface FiltersProps {
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    categories: string[];
    onReset: () => void;
}

export const DirectoryFilters = ({
    filters,
    setFilters,
    categories,
    onReset,
}: FiltersProps) => {
    const toggleCategory = (cat: string) => {
        setFilters((prev) => ({
            ...prev,
            category: prev.category.includes(cat)
                ? prev.category.filter((c) => c !== cat)
                : [...prev.category, cat],
        }));
    };

    const toggleTag = (tag: string) => {
        setFilters((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const commonTags = ["honeypot", "phishing", "fake-airdrop", "impersonation", "rug-pull", "anonymous-team"];

    return (
        <div className="bg-[#0f0f11] p-4 rounded-xl border border-white/6">
            <div className="flex justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-200">Filters</h3>
                <button onClick={onReset} className="text-sm text-gray-400 hover:text-white">
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <div className="text-xs text-gray-300 mb-2">Category</div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => toggleCategory(c)}
                                className={`px-3 py-1 text-sm rounded-md transition ${filters.category.includes(c)
                                        ? "bg-yellow-400 text-black font-medium"
                                        : "bg-[#111] text-gray-300 border border-white/6 hover:bg-white/5"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags Filter */}
                <div>
                    <div className="text-xs text-gray-300 mb-2">Common Tags</div>
                    <div className="flex flex-wrap gap-2">
                        {commonTags.map((t) => (
                            <button
                                key={t}
                                onClick={() => toggleTag(t)}
                                className={`px-2 py-1 text-xs rounded-md transition ${filters.tags.includes(t)
                                        ? "bg-[#222] text-yellow-300 border border-yellow-400 font-medium"
                                        : "bg-[#111] text-gray-400 border border-white/6 hover:bg-white/5"
                                    }`}
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