import React, { useState } from "react";

const tabs = ["Trending", "New", "Most Checked"];

const trendingItems = [
    "Crypto Rugpulls",
    "Fake Airdrops",
    "Investment Scams",
    "AI-Generated Scams",
    "DeFi Exploits",
    "Phishing Websites",
    "Ponzi Schemes",
    "Malicious Tokens",
    "Fake Exchanges",
    "Honeypot Tokens",
    "Pump & Dump",
    "Telegram Bot Scams",
];

const TrendingScams = () => {
    const [activeTab, setActiveTab] = useState("Trending");

    return (
        <section className="w-full flex justify-center py-20 bg-[#02040A] relative">
            {/* grid background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

            <div className="w-full max-w-5xl px-6 relative z-10">
                <h2 className="text-white text-2xl font-semibold mb-6">
                    Trending scam checks
                </h2>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-700 pb-2 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm pb-2 transition-all ${activeTab === tab
                                    ? "text-yellow-400 border-b-2 border-yellow-400"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {trendingItems.map((item) => (
                        <button
                            key={item}
                            className="flex items-center gap-3 bg-[#0A0E1A] border border-gray-800 hover:border-yellow-400 transition-all px-4 py-3 rounded-lg"
                        >
                            <span className="text-yellow-400 text-lg">⚠️</span>
                            <span className="text-white text-sm">{item}</span>
                        </button>
                    ))}
                </div>

                {/* Footer link */}
                <div className="text-center mt-10">
                    <button className="text-yellow-400 text-sm hover:underline">
                        Explore more scam categories →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TrendingScams;
