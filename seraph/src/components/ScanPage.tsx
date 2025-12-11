import { useEffect, useState } from "react";
import { ShieldAlert, Radar, Loader2, AlertTriangle, Globe, BadgeAlert } from "lucide-react";

const ScanPage = ({ query }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotError, setScreenshotError] = useState(false);

    // Fake scanning messages
    const messages = [
        "Analyzing domain reputation…",
        "Checking smart contract bytecode…",
        "Scanning for known scam patterns…",
        "Cross-checking community reports…",
        "Finalizing risk verdict…"
    ];

    // Simulate scan completion
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // -------------------------------------------------------------
    //  AUTO SCREENSHOT FETCH
    // -------------------------------------------------------------
    useEffect(() => {
        if (!query) return;

        const fetchScreenshot = async () => {
            try {
                // Microlink Screenshot API (free – no key needed)
                const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(query)}&screenshot=true&meta=false`;

                const res = await fetch(apiUrl);
                const data = await res.json();

                if (data?.data?.screenshot?.url) {
                    setScreenshot(data.data.screenshot.url);
                } else {
                    setScreenshotError(true);
                }
            } catch (err) {
                console.error("Screenshot error:", err);
                setScreenshotError(true);
            }
        };

        fetchScreenshot();
    }, [query]);


    // -------------------------------------------------------------
    // FAKE RESULT
    // -------------------------------------------------------------
    const result = {
        risk: "High Risk",
        color: "text-red-500",
        scoreBg: "bg-red-500/10 border-red-500/30",
        indicators: [
            { icon: <AlertTriangle size={20} />, label: "Suspicious Behavior" },
            { icon: <BadgeAlert size={20} />, label: "Unverified Contract" },
            { icon: <Globe size={20} />, label: "New Domain" },
        ],
        redFlags: [
            "Domain registered less than 30 days ago",
            "Contract contains high-risk functions",
            "No team verification",
            "Associated with flagged addresses"
        ]
    };

    return (
        <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-14 flex flex-col items-center">

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                Scan Status for: <span className="text-yellow-400">{query}</span>
            </h1>

            <p className="text-gray-400 mb-12 text-center max-w-lg">
                Seraph AI is analyzing the project using 50+ security signals.
            </p>

            {/* ------------------------------------------------------------- */}
            {/* LOADING SCREEN */}
            {/* ------------------------------------------------------------- */}
            {isLoading && (
                <div className="flex flex-col items-center animate-fadeIn">

                    <div className="relative mb-10">
                        <div className="w-36 h-36 rounded-full border border-yellow-400/40 animate-pulse flex items-center justify-center">
                            <Radar className="text-yellow-400 animate-spin-slow" size={52} />
                        </div>

                        <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-2xl animate-ping"></div>
                    </div>

                    <div className="h-6 text-gray-400 text-sm animate-fadeIn">
                        {messages[Math.floor(Date.now() / 2000) % messages.length]}
                    </div>

                    <Loader2 className="mt-8 text-yellow-400 animate-spin" size={30} />
                </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* RESULTS */}
            {/* ------------------------------------------------------------- */}
            {!isLoading && (
                <div className="w-full max-w-5xl animate-fadeInSlow">

                    {/* WEBSITE SCREENSHOT */}
                    <div className="w-full mb-10">
                        <h3 className="text-lg font-semibold mb-3">Website Preview</h3>

                        <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#131316] p-3">
                            {screenshot ? (
                                <img
                                    src={screenshot}
                                    alt="website screenshot"
                                    className="rounded-lg w-full object-cover"
                                />
                            ) : screenshotError ? (
                                <div className="text-gray-500 text-sm py-10 text-center">
                                    ⚠ Could not load screenshot
                                </div>
                            ) : (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="text-gray-400 animate-spin" size={28} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RISK CARD */}
                    <div className="mt-10 p-8 rounded-2xl bg-[#131316] border border-gray-800 shadow-xl">

                        <div className="flex items-center gap-4 mb-6">
                            <ShieldAlert className={`w-10 h-10 ${result.color}`} />
                            <div>
                                <h2 className="text-2xl font-bold">Risk Assessment</h2>
                                <p className="text-gray-400 text-sm">AI-powered analysis</p>
                            </div>
                        </div>

                        <div className={`inline-block px-4 py-2 rounded-lg border text-lg font-semibold ${result.scoreBg} ${result.color}`}>
                            {result.risk}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                            {result.indicators.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg border border-white/10 text-gray-300"
                                >
                                    {item.icon}
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RED FLAGS */}
                    <div className="mt-10 p-8 bg-[#131316] rounded-2xl border border-gray-800">
                        <h3 className="text-xl font-semibold mb-4 text-red-400">⚠ Red Flags</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            {result.redFlags.map((flag, i) => (
                                <li key={i}>{flag}</li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <button className="px-6 py-4 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition">
                            Report This Project
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ScanPage;
