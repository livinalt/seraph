// src/components/directory/DirectorySearch.tsx
import { Search, RefreshCw } from "lucide-react";

interface DirectorySearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const DirectorySearch = ({ value, onChange }: DirectorySearchProps) => {
    return (
        <div className="relative flex items-center w-full max-w-xl">
            <div className="absolute left-3">
                <Search className="text-gray-400" size={18} />
            </div>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by domain, contract, project name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f0f11] border border-white/6 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {value && (
                <button onClick={() => onChange("")} className="ml-3 text-gray-400 hover:text-white">
                    <RefreshCw size={18} />
                </button>
            )}
        </div>
    );
};