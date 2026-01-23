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
  TrendingUp,
} from "lucide-react";
import Header from "../../Header";
import ReportSuccessModal from "./ReportSuccessModal";

const TOP_PROJECTS = [
  { name: "BaseSwap", desc: "DEX on Base network" },
  { name: "Friend.tech", desc: "Social trading protocol" },
  { name: "Blast", desc: "L2 with native yield" },
  { name: "Linea", desc: "zkEVM ecosystem" },
  { name: "Zora", desc: "Creator economy protocol" },
];

const ScanContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "project";

  const [tick, setTick] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const isLoading = tick < 20;

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const scan = async () => {
      try {
        const res = await fetch("https://seraph-1.onrender.com/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: query, type }),
        });
        const data = await res.json();
        setScreenshot(data.screenshot);
        setScanResult(data);
      } catch {
        setScanResult({
          verdict: "Error",
          explanation: "Scan service unavailable",
        });
      }
    };

    scan();
  }, [query, type]);

  const getTypeIcon = () => {
    switch (type) {
      case "website":
        return <Globe className="text-blue-500" size={18} />;
      case "contract":
        return <FileCode className="text-purple-500" size={18} />;
      case "token":
        return <Coins className="text-yellow-500" size={18} />;
      case "project":
        return <Layers className="text-green-500" size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  return (
    <>
      <Header />

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 shadow-sm"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <main className="min-h-screen bg-[#F7F8FA] pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-10">
            {/* LEFT */}
            <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  {getTypeIcon()}
                  {type.toUpperCase()}
                </div>
                <h2 className="font-semibold text-slate-900 break-all">
                  {query}
                </h2>
              </div>

              {screenshot && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <img
                    src={screenshot}
                    alt="Preview"
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div className="h-[240px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
                Advertisement
              </div>
            </aside>

            {/* CENTER */}
            <section className="space-y-10">
              {isLoading && (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                  <Radar className="mx-auto text-indigo-500 animate-spin-slow mb-4" size={44} />
                  <p className="text-slate-500">Analyzing project data…</p>
                  <Loader2 className="mx-auto mt-4 animate-spin text-indigo-500" />
                </div>
              )}

              {scanResult && !isLoading && (
                <>
                  <div
                    className={`p-10 rounded-3xl border text-center ${
                      scanResult.verdict === "High Risk"
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <ShieldAlert className="mx-auto mb-4 text-red-500" size={48} />
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                      {scanResult.verdict}
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                      {scanResult.explanation}
                    </p>
                  </div>

                  {scanResult.flags && (
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        Risk Indicators
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {scanResult.flags.map((flag: string, i: number) => (
                          <div
                            key={i}
                            className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3"
                          >
                            <XCircle className="text-red-500" size={18} />
                            <span className="text-slate-700">{flag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* RIGHT */}
            <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-semibold flex items-center gap-2 text-slate-900 mb-4">
                  <TrendingUp size={18} />
                  Top Projects
                </h3>

                <div className="space-y-3">
                  {TOP_PROJECTS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() =>
                        navigate(`/scan?q=${p.name}&type=project`)
                      }
                      className="block text-left w-full border-b border-slate-200 pb-3 last:border-none hover:opacity-80"
                    >
                      <p className="font-medium text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[240px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
                Advertisement
              </div>
            </aside>
          </div>
        </div>
      </main>

      <ReportSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default ScanContent;
