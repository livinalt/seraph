import { useState } from "react";
import ScamCard from "./ScamCard";

// const tabs = ["Trending", "New", "Most Checked"];

const trendingScams = [
    {
        title: "FakeToken XYZ",
        entityType: "Token",
        riskScore: 95,
        summary: "Classic rugpull: liquidity removed 2 hours after launch.",
        tags: ["Rugpull", "Honeypot", "Malicious Token"],
        communitySafe: 3,
        explanation: "Owner wallet drained the entire liquidity pool after heavy marketing. Contract had hidden mint + disable-sell functions.",
        reportedCount: 3420,
    },
    {
        title: "FreeCryptoAirdrop.live",
        entityType: "Website",
        riskScore: 89,
        summary: "Fake airdrop site that steals wallet private keys.",
        tags: ["Phishing", "Fake Airdrop", "Wallet Drainer"],
        communitySafe: 7,
        explanation: "Malicious script forces unlimited approvals and signs malicious transactions when you 'claim'.",
        reportedCount: 2890,
    },
    {
        title: "Quantum Yield Fund",
        entityType: "Project",
        riskScore: 93,
        summary: "Ponzi promising 10% daily returns with no real product.",
        tags: ["Ponzi", "Investment Scam", "Fake Staking"],
        communitySafe: 5,
        explanation: "No audited code, anonymous team, payments only from new deposits. Already stopping withdrawals.",
        reportedCount: 5670,
    },
    {
        title: "DeepFake Elon Giveaway",
        entityType: "Video/Website",
        riskScore: 81,
        summary: "AI deepfake video of Elon Musk giving away ETH.",
        tags: ["Deepfake", "Giveaway Scam", "Phishing"],
        communitySafe: 12,
        explanation: "Video hosted on scam domain that asks users to send ETH first to 'double it'. Over 200 victims reported.",
        reportedCount: 12400,
    },
    // Add more as needed
];

const TrendingScams = () => {
    // const [activeTab, setActiveTab] = useState("Trending");

    const scamsToShow = trendingScams;

    return (
        <section className="w-full py-24 bg-[#02040A] relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {/* Main container with generous side margins */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white text-left mb-12">
                    New Reports
                </h2>

               

                {/* Cards Grid - Equal height + nice spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                    {scamsToShow.map((scam, index) => (
                        <ScamCard
                            key={index}
                            {...scam}
                            reportedCount={scam.reportedCount}
                        />
                    ))}
                </div>

                {/* Load more */}
                <div className="text-center mt-16">
                    <button className="text-yellow-400 text-lg font-medium hover:underline transition">
                        Load more reports
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TrendingScams;