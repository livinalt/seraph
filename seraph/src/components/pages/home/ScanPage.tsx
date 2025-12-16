import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // ← Add this
import {
  ShieldAlert,
  Radar,
  Loader2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Header from "../../Header";
import ReportSuccessModal from "./ReportSuccessModal";


const ScanContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [tick, setTick] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fake scanning animation
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(interval);
  }, []);

  const isLoading = tick < 20;

  // Real scan via backend
  useEffect(() => {
    const performScan = async () => {
      if (!query.trim()) {
        setScreenshot(null);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: query })
        });
        const data = await res.json();
        setScreenshot(data.screenshot);
        setScanResult(data);
      } catch (err) {
        console.error("Scan failed:", err);
        setScreenshot(null);
        setScanResult(null);
      }
    };

    performScan();
  }, [query]);

  // Report + redirect to Directory
  const handleReport = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: query,
          reason: scanResult?.verdict || "High risk detected from scan",
          title: query,
          summary: "Reported via scan tool",
          category: "Website"
        })
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/directory');
        }, 3000);
      } else {
        alert("Report submission failed. Please try again.");
      }
    } catch (err) {
      alert("Network error. Check your connection.");
    }
  };

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Goes back to previous page (usually home/search)
  };

  return (
    <>
      <Header />

      {/* Back Button - Fixed Top Left */}
      <button
        onClick={handleBack}
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-[#0f0f11]/80 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all shadow-lg"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-14 flex flex-col items-center pt-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Scan Status for:{" "}
          <span className="text-yellow-400">{query || "No query"}</span>
        </h1>

        <p className="text-gray-400 mb-12 text-center max-w-lg">
          Seraph AI is analyzing the project using 50+ security signals.
        </p>

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
                "Analyzing domain reputation…",
                "Checking smart contract…",
                "Scanning for scam patterns…",
                "Cross-checking reports…",
                "Finalizing verdict…",
              ][Math.floor(tick / 4)]}
            </div>
            <Loader2 className="mt-8 text-yellow-400 animate-spin" size={30} />
          </div>
        ) : (
          <div className="w-full max-w-5xl">
            {/* Website Preview */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-3">Website Preview</h3>
              <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#131316] p-3">
                {screenshot ? (
                  <img
                    src={screenshot}
                    alt="Website preview"
                    className="rounded-lg w-full max-h-96 object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <ShieldAlert className="w-12 h-12 mb-3 opacity-60" />
                    <p>No preview available</p>
                    <p className="text-xs mt-2">Site may block screenshots or be unreachable</p>
                  </div>
                )}
              </div>
            </div>

            {/* Verdict */}
            <div className="p-8 rounded-2xl bg-[#131316] border border-red-500/30 shadow-xl text-center mb-10">
              <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">
                {scanResult?.verdict || "High Risk"}
              </h2>
              <p className="text-red-400">
                {scanResult?.explanation || "This project shows multiple scam indicators"}
              </p>
            </div>

            {/* Flags */}
            {scanResult?.flags && scanResult.flags.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {scanResult.flags.map((flag: string, i: number) => (
                  <div
                    key={i}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <AlertTriangle className="text-red-400" size={20} />
                    <span className="text-sm text-gray-300">{flag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Report Button */}
            <div className="text-center">
              <button
                onClick={handleReport}
                className="px-10 py-5 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-500 transition transform hover:scale-105"
              >
                Report This Scam Now
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Your report will appear instantly in the directory
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