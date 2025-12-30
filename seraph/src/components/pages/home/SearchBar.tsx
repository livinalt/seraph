// src/components/home/SearchBar.tsx
import { useState, useEffect } from "react";
import { FileCode, Globe, Users, Layers, Coins, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [manualActive, setManualActive] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValidEns, setIsValidEns] = useState(false);

  const tabs = [
    { id: "contract", label: "Contract", icon: <FileCode size={14} /> },
    { id: "website", label: "Website", icon: <Globe size={14} /> },
    { id: "team", label: "Team Name", icon: <Users size={14} /> },
    { id: "project", label: "Project", icon: <Layers size={14} /> },
    { id: "token", label: "Token", icon: <Coins size={14} /> },
  ];

  const navigate = useNavigate();

  // Strict ENS name validation
  const validateEnsName = (name: string): boolean => {
    const lowered = name.toLowerCase();
    if (!lowered.endsWith(".eth")) return false;

    const label = lowered.slice(0, -4); // remove .eth
    if (label.length < 3 || label.length > 255) return false;

    // Only a-z, 0-9, and hyphen
    if (!/^[a-z0-9-]+$/.test(label)) return false;

    // No leading/trailing/consecutive hyphens
    if (label.startsWith("-") || label.endsWith("-") || label.includes("--")) return false;

    return true;
  };

  // Enhanced detection
  const detectInputType = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;

    // ENS name (strict validation)
    if (validateEnsName(trimmed)) {
      return "contract";
    }

    // Website
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      /^\w[\w.-]*\.\w{2,}$/i.test(trimmed)
    ) {
      return "website";
    }

    // EVM address
    if (/^0x[a-fA-F0-9]{40}$/i.test(trimmed)) {
      return "contract";
    }

    // Solana address
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed) && !trimmed.includes(".")) {
      return "contract";
    }

    // Token ticker
    if (/^[A-Z]{2,8}(\d*)$/.test(trimmed.toUpperCase())) {
      return "token";
    }

    return null;
  };

  const activeTab = manualActive ?? detectInputType(input);

  // Real-time validation
  useEffect(() => {
    const trimmed = input.trim();

    setIsValidEns(false);

    if (!trimmed) {
      setError(null);
      return;
    }

    if (trimmed.length < 2) {
      setError("Input too short");
      return;
    }

    // ENS-specific validation
    if (trimmed.toLowerCase().endsWith(".eth")) {
      if (validateEnsName(trimmed)) {
        setIsValidEns(true);
        setError(null);
      } else {
        setError("Invalid ENS name: use lowercase, no consecutive/leading/trailing hyphens");
      }
      return;
    }

    // Contract address format check
    if (trimmed.startsWith("0x")) {
      if (/^0x[a-fA-F0-9]{40}$/i.test(trimmed)) {
        setError(null);
      } else {
        setError("Invalid contract address (must be 0x + 40 hex characters)");
      }
      return;
    }

    setError(null);
  }, [input]);

  const getPlaceholder = () => {
    if (!input.trim()) {
      return "Enter website, contract, ENS name (.eth), token, or project...";
    }

    if (activeTab) {
      const examples: Record<string, string> = {
        website: "https://example.com",
        contract: isValidEns ? "vitalik.eth" : "0x123...abcd",
        token: "ETH, UNI",
        team: "Uniswap Labs",
        project: "Aave",
      };
      const label = tabs.find(t => t.id === activeTab)?.label || "item";
      const prefix = isValidEns ? "ENS name" : label;
      return `Detected: ${prefix} — e.g. ${examples[activeTab]}`;
    }

    return "Keep typing...";
  };

  useEffect(() => {
    if (!input.trim()) {
      setManualActive(null);
      setError(null);
      setIsValidEns(false);
    }
  }, [input]);

  const handleScan = () => {
    const trimmed = input.trim();

    if (!trimmed || error) {
      setError(error || "Please enter a valid input to scan");
      return;
    }

    const type = manualActive ?? detectInputType(trimmed) ?? "website";

    navigate(`/scan?q=${encodeURIComponent(trimmed)}&type=${type}`);
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-4xl mx-auto px-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setManualActive(manualActive === tab.id ? null : tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300
              ${activeTab === tab.id
                ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                : "border-gray-600 text-gray-400 hover:border-gray-300 hover:text-gray-200 hover:bg-white/5"
              }
              ${activeTab === tab.id && manualActive === null ? "ring-2 ring-yellow-300/70" : ""}
            `}
          >
            {tab.icon}
            {tab.label}
            {tab.id === "contract" && isValidEns && activeTab === "contract" && (
              <span className="ml-1.5 text-xs font-bold flex items-center gap-1">
                (ENS)
                <CheckCircle2 size={12} className="text-green-600" />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className={`flex w-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20 border transition-colors
        ${error ? 'border-red-400' : isValidEns ? 'border-green-500' : 'border-gray-300'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder={getPlaceholder()}
          className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 outline-none text-lg"
          autoFocus
        />

        <button
          onClick={handleScan}
          disabled={!!error || !input.trim()}
          className="bg-yellow-400 text-black px-8 py-4 font-bold text-lg transition duration-200 flex items-center gap-2 whitespace-nowrap
            disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-yellow-300"
        >
          Scan Now
        </button>
      </div>

      {/* Feedback */}
      <div className="mt-3 min-h-[20px]">
        {error ? (
          <div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        ) : isValidEns ? (
          <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
            <CheckCircle2 size={16} />
            <span>Valid ENS name detected</span>
          </div>
        ) : null}
      </div>

      {/* Helper text */}
      <p className="mt-4 text-sm text-gray-500 text-center max-w-2xl">
        Supports URLs, contract addresses, valid <strong>.eth</strong> names (lowercase, no double hyphens), tokens, and projects.
      </p>
    </div>
  );
};

export default SearchBar;