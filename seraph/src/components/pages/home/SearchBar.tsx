// src/components/home/SearchBar.tsx
import { useState } from "react";
import { FileCode, Globe, Users, Layers, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [active, setActive] = useState("website");
  const [input, setInput] = useState("");

  const tabs = [
    { id: "contract", label: "Contract", icon: <FileCode size={14} /> },
    { id: "website", label: "Website", icon: <Globe size={14} /> },
    { id: "team", label: "Team Name", icon: <Users size={14} /> },
    { id: "project", label: "Project", icon: <Layers size={14} /> },
    { id: "token", label: "Token", icon: <Coins size={14} /> },
  ];

  const navigate = useNavigate();

  const handleScan = () => {
    if (!input.trim()) {
      alert("Please enter something to scan");
      return;
    }

    // Pass the actual search term as query param
    navigate(`/scan?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-4xl mx-auto px-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border transition-all duration-200
              ${active === tab.id
                ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex w-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20 border border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder={`Search by ${active}... (e.g. https://example.com)`}
          className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 outline-none text-lg"
        />

        <button
          onClick={handleScan}
          className="bg-yellow-400 text-black px-8 py-4 font-bold text-lg hover:bg-yellow-300 transition duration-200 flex items-center gap-2"
        >
          Scan Now
        </button>
      </div>

      {/* Optional helper text */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Tip: Include <code className="bg-gray-800 px-2 py-1 rounded">https://</code> for best results
      </p>
    </div>
  );
};

export default SearchBar;