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

  const commonTags = [
    "honeypot",
    "phishing",
    "fake-airdrop",
    "impersonation",
    "rug-pull",
    "anonymous-team",
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* CATEGORY CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((c) => {
          const active = filters.category.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggleCategory(c)}
              className={`
                px-4 py-2 rounded-full text-sm whitespace-nowrap
                border transition
                ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* TAG CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {commonTags.map((t) => {
          const active = filters.tags.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`
                px-3 py-1.5 rounded-full text-xs whitespace-nowrap
                border transition
                ${
                  active
                    ? "bg-blue-50 text-blue-700 border-blue-300"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }
              `}
            >
              #{t}
            </button>
          );
        })}
      </div>

      {/* RESET */}
      {(filters.category.length > 0 || filters.tags.length > 0) && (
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-500 ml-2 whitespace-nowrap"
        >
          Reset filters
        </button>
      )}
    </div>
  );
};
