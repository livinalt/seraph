import { Search, X } from "lucide-react";

interface DirectorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const DirectorySearch = ({ value, onChange }: DirectorySearchProps) => {
  return (
    <div className="relative w-full max-w-xl">
      {/* Search Icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      {/* Input */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by domain, contract, project name..."
        className="
          w-full h-12
          pl-11 pr-10
          rounded-full
          bg-white
          border border-slate-300
          text-sm text-slate-900
          placeholder-slate-400
          focus:outline-none
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/20
          transition
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-slate-600
            transition
          "
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
