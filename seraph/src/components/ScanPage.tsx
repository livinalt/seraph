import { useEffect, useState } from "react";
import {
    ShieldAlert,
    Radar,
    Loader2,
    AlertTriangle,
} from "lucide-react";
import Header from "./Header";
import ReportSuccessModal from "./ReportSuccessModal";

interface ScanPageProps {
    query: string;
}

const ScanPage = ({ query }: ScanPageProps) => {
    return <ScanContent key={query} query={query} />;
};

const ScanContent = ({ query }: { query: string }) => {
    const [tick, setTick] = useState(0);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [screenshotError, setScreenshotError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 200);
        return () => clearInterval(interval);
    }, []);

    const isLoading = tick < 20;

    // Screenshot fetch
    useEffect(() => {
        if (!query?.trim()) return;
        const fetchScreenshot = async () => {
            try {
                const url = `https://api.microlink.io?url=${encodeURIComponent(query)}&screenshot=true&meta=false&embed=screenshot.url`;
                const res = await fetch(url);
                const data = await res.json();
                setScreenshot(data?.data?.screenshot?.url || null);
                if (!data?.data?.screenshot?.url) setScreenshotError(true);
            } catch {
                setScreenshotError(true);
            }
        };
        fetchScreenshot();
    }, [query]);

    // AUTO REPORT HANDLER — Instant submit
    const handleReport = () => {
        // In real app: send to backend here
        console.log("Reported:", query);

        // Show success instantly
        setShowSuccess(true);

        // Auto close after 4 seconds (optional)
        setTimeout(() => setShowSuccess(false), 4000);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-14 flex flex-col items-center">
                <h1 className="mt-24 text-3xl md:text-4xl font-bold mb-3 text-center">
                    Scan Status for: <span className="text-yellow-400">{query || "example.com"}</span>
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
                            {["Analyzing domain reputation…", "Checking smart contract…", "Scanning for scam patterns…", "Cross-checking reports…", "Finalizing verdict…"][Math.floor(tick / 4)]}
                        </div>
                        <Loader2 className="mt-8 text-yellow-400 animate-spin" size={30} />
                    </div>
                ) : (
                    <div className="w-full max-w-5xl">
                        {/* Screenshot */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold mb-3">Website Preview</h3>
                            <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#131316] p-3">
                                {screenshot ? (
                                    <img src={screenshot} alt="Screenshot" className="rounded-lg w-full max-h-96 object-cover" />
                                ) : (
                                    <div className="text-gray-500 text-center py-16">Could not load screenshot</div>
                                )}
                            </div>
                        </div>

                        {/* Risk */}
                        <div className="p-8 rounded-2xl bg-[#131316] border border-red-500/30 shadow-xl text-center mb-10">
                            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold mb-2">High Risk</h2>
                            <p className="text-red-400">This project shows multiple scam indicators</p>
                        </div>

                        {/* Red Flags */}
                        <div className="grid md:grid-cols-2 gap-4 mb-10">
                            {[
                                "Domain registered less than 30 days ago",
                                "Contract contains high-risk functions",
                                "No team verification",
                                "Associated with flagged addresses",
                            ].map((flag, i) => (
                                <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                                    <AlertTriangle className="text-red-400" size={20} />
                                    <span className="text-sm text-gray-300">{flag}</span>
                                </div>
                            ))}
                        </div>

                        {/* Report Button — AUTO SUBMIT */}
                        <div className="text-center">
                            <button
                                onClick={handleReport}
                                className="px-10 py-5 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-500 transition transform hover:scale-105"
                            >
                                Report This Scam Now
                            </button>
                            <p className="text-gray-500 text-sm mt-4">
                                Help protect others — one click reports it instantly
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Success Modal — Auto Report Confirmation */}
            <ReportSuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                projectUrl={query}
            />
        </>
    );
};

export default ScanPage;