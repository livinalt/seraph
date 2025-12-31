// src/pages/home/ScanContent.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Radar,
  Loader2,
  ArrowLeft,
  Globe,
  FileCode,
  XCircle,
  AlertCircle,
  Coins,
  Layers,
} from "lucide-react";
import Header from "../../Header";
import ReportSuccessModal from "./ReportSuccessModal";

const ScanContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "website"; // From SearchBar

  const [tick, setTick] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(interval);
  }, []);

  const isLoading = tick < 20;

  useEffect(() => {
    const performScan = async () => {
      if (!query.trim()) return;

      try {
        const res = await fetch('https://seraph-1.onrender.com/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            url: query,
            type // Pass type to backend
          })
        });
        const data = await res.json();
        setScreenshot(data.screenshot);
        setScanResult(data);
      } catch (err) {
        console.error("Scan failed:", err);
        setScreenshot(null);
        setScanResult({ verdict: "Error", explanation: "Scan service unavailable" });
      }
    };

    performScan();
  }, [query, type]);

  const handleReport = async () => {
    try {
      const res = await fetch('https://seraph-1.onrender.com/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: type === "website" ? query : undefined,
          contract: type === "contract" ? query : undefined,
          projectName: type === "project" || type === "token" ? query : undefined,
          reason: scanResult?.verdict || "High risk detected",
          category: type === "contract" ? "Token" : type === "website" ? "Website" : "Project"
        })
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/directory');
        }, 3000);
      }
    } catch (err) {
      alert("Report failed");
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "website": return <Globe className="text-blue-400" size={24} />;
      case "contract": return <FileCode className="text-purple-400" size={24} />;
      case "token": return <Coins className="text-yellow-400" size={24} />;
      case "project": return <Layers className="text-green-400" size={24} />;
      default: return <AlertCircle className="text-gray-400" size={24} />;
    }
  };

  return (
    <>
      <Header />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#0f0f11]/90 backdrop-blur border border-white/10 rounded-lg text-gray-300 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-14 flex flex-col items-center pt-32">
        <div className="flex items-center gap-3 mb-4">
          {getTypeIcon()}
          <span className="text-sm uppercase tracking-wider text-gray-400">
            {type === "contract" ? "Smart Contract" : type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Analyzing: <span className="text-yellow-400">{query}</span>
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-10">
              <div className="w-36 h-36 rounded-full border border-yellow-400/40 animate-pulse flex items-center justify-center">
                <Radar className="text-yellow-400 animate-spin-slow" size={52} />
              </div>
              <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-2xl animate-ping" />
            </div>
            <div className="text-gray-400 text-sm text-center max-w-md">
              {[
                "Resolving domain/contract...",
                "Fetching blockchain data...",
                "Checking for honeypot/rug patterns...",
                "Cross-referencing known scams...",
                "Generating AI verdict...",
              ][Math.floor(tick / 4)]}
            </div>
            <Loader2 className="mt-8 text-yellow-400 animate-spin" size={30} />
          </div>
        ) : (
          <div className="w-full max-w-5xl space-y-10">
            {/* Website-Specific Preview */}
            {type === "website" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe size={20} />
                  Website Preview
                </h3>
                <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#131316]">
                  {screenshot ? (
                    <img src={screenshot} alt="Site preview" className="w-full max-h-96 object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                      <ShieldAlert size={48} className="mb-4 opacity-60" />
                      <p>No preview available</p>
                      <p className="text-xs mt-2">Site may block screenshots</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contract-Specific Info */}
            {type === "contract" && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#131316] border border-gray-800 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm">Ownership</p>
                  <p className="text-2xl font-bold text-red-400 mt-2">Not Renounced</p>
                </div>
                <div className="bg-[#131316] border border-gray-800 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm">Honeypot Risk</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">Detected</p>
                </div>
                <div className="bg-[#131316] border border-gray-800 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm">Liquidity</p>
                  <p className="text-2xl font-bold text-green-400 mt-2">Locked</p>
                </div>
              </div>
            )}

            {/* Verdict */}
            <div className={`p-8 rounded-2xl shadow-xl text-center border ${
              scanResult?.verdict === "High Risk" ? "bg-red-900/20 border-red-500/50" : "bg-green-900/20 border-green-500/50"
            }`}>
              <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-4xl font-bold mb-3">
                {scanResult?.verdict || "High Risk"}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {scanResult?.explanation || "Multiple scam indicators detected. Exercise extreme caution."}
              </p>
            </div>

            {/* Flags */}
            {scanResult?.flags && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Risk Indicators</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {scanResult.flags.map((flag: string, i: number) => (
                    <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                      <XCircle className="text-red-400" size={20} />
                      <span className="text-gray-300">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Button */}
            <div className="text-center pt-8">
              <button
                onClick={handleReport}
                className="px-12 py-6 bg-red-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:bg-red-500 transition transform hover:scale-105"
              >
                Report This as Scam
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Help protect the community — your report will be reviewed and added to the directory
              </p>
            </div>
          </div>
        )}

        <ReportSuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          projectUrl={query}
        />
      </div>
    </>
  );
};

export default ScanContent;