// src/components/home/SearchBar.tsx
import { useState, useEffect } from "react";
import {
  FileCode,
  Globe,
  Users,
  Layers,
  Coins,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [manualActive, setManualActive] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValidEns, setIsValidEns] = useState(false);

  const navigate = useNavigate();

  const tabs = [
    { id: "contract", label: "Contract", icon: <FileCode size={14} /> },
    { id: "website", label: "Website", icon: <Globe size={14} /> },
    { id: "team", label: "Team", icon: <Users size={14} /> },
    { id: "project", label: "Project", icon: <Layers size={14} /> },
    { id: "token", label: "Token", icon: <Coins size={14} /> },
  ];

  /* ---------------- ENS VALIDATION ---------------- */

  const validateEnsName = (name: string): boolean => {
    const lowered = name.toLowerCase();
    if (!lowered.endsWith(".eth")) return false;

    const label = lowered.slice(0, -4);
    if (label.length < 3 || label.length > 255) return false;
    if (!/^[a-z0-9-]+$/.test(label)) return false;
    if (label.startsWith("-") || label.endsWith("-") || label.includes("--"))
      return false;

    return true;
  };

  const detectInputType = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (validateEnsName(trimmed)) return "contract";

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      /^\w[\w.-]*\.\w{2,}$/i.test(trimmed)
    ) {
      return "website";
    }

    if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) return "contract";

    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed) && !trimmed.includes("."))
      return "contract";

    if (/^[A-Z]{2,8}\d*$/.test(trimmed.toUpperCase())) return "token";

    return null;
  };

  const activeTab = manualActive ?? detectInputType(input);

  /* ---------------- VALIDATION ---------------- */

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

    if (trimmed.toLowerCase().endsWith(".eth")) {
      if (validateEnsName(trimmed)) {
        setIsValidEns(true);
        setError(null);
      } else {
        setError("Invalid ENS name format");
      }
      return;
    }

    if (trimmed.startsWith("0x") && !/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
      setError("Invalid contract address");
      return;
    }

    setError(null);
  }, [input]);

  useEffect(() => {
    if (!input.trim()) {
      setManualActive(null);
      setError(null);
      setIsValidEns(false);
    }
  }, [input]);

  const handleScan = () => {
    if (!input.trim() || error) return;
    const type = manualActive ?? detectInputType(input) ?? "website";
    navigate(`/scan?q=${encodeURIComponent(input.trim())}&type=${type}`);
  };

  const getPlaceholder = () =>
    "Paste a website, contract address, ENS (.eth), token, or project name";

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() =>
                setManualActive(manualActive === tab.id ? null : tab.id)
              }
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "contract" && isValidEns && isActive && (
                <CheckCircle2 size={12} className="text-emerald-500 ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div
        className={`flex items-stretch bg-white rounded-2xl border shadow-sm transition
          ${
            error
              ? "border-red-300"
              : isValidEns
              ? "border-emerald-300"
              : "border-gray-300"
          }`}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder={getPlaceholder()}
          className="flex-1 px-5 py-4 text-gray-900 placeholder-gray-400 outline-none text-base rounded-l-2xl"
        />

        <button
          onClick={handleScan}
          disabled={!input.trim() || !!error}
          className="px-6 text-sm font-semibold bg-emerald-500 text-white rounded-r-2xl
            hover:bg-emerald-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Scan
        </button>
      </div>

      {/* Feedback */}
      <div className="mt-2 min-h-[20px] text-sm">
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {!error && isValidEns && (
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 size={14} />
            Valid ENS name detected
          </div>
        )}
      </div>

      {/* Helper */}
      <p className="mt-3 text-xs text-gray-500 text-center">
        Supports URLs, contract addresses, ENS names, tokens, and projects.
      </p>
    </div>
  );
};

export default SearchBar;
