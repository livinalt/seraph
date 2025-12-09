import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ScamCardProps {
    title: string;
    entityType: string; // e.g., "Token", "Website"
    riskScore: number;  // 0-100
    summary: string;
    tags: string[];
    communitySafe: number;  // percentage (0–100)
    explanation: string;
}

const ScamCard: React.FC<ScamCardProps> = ({
    title,
    entityType,
    riskScore,
    summary,
    tags,
    communitySafe,
    explanation
}) => {
    const [open, setOpen] = useState(false);

    const getRiskColor = () => {
        if (riskScore >= 80) return "bg-red-600 text-white";
        if (riskScore >= 50) return "bg-orange-500 text-white";
        if (riskScore >= 25) return "bg-yellow-400 text-black";
        return "bg-green-500 text-white";
    };

    return (
        <div className="bg-[#0F1624] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor()}`}>
                    {riskScore}/100 Risk
                </span>

                <span className="text-xs bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full">
                    {entityType}
                </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

            {/* Summary */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 py-1 px-2 rounded-md border border-gray-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Community Rating */}
            <div className="mb-4">
                <p className="text-gray-400 text-xs mb-1">Community Rating</p>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${communitySafe}%` }}
                    ></div>
                </div>
                <p className="text-gray-400 text-xs mt-1">{communitySafe}% say safe</p>
            </div>

            {/* Expandable Explanation */}
            <div className="border-t border-gray-700 pt-3">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center text-blue-300 text-sm hover:text-blue-400 transition"
                >
                    {open ? (
                        <>
                            <ChevronUp size={16} className="mr-1" /> Hide Details
                        </>
                    ) : (
                        <>
                            <ChevronDown size={16} className="mr-1" /> Show AI Explanation
                        </>
                    )}
                </button>

                {open && (
                    <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                        {explanation}
                    </p>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg transition">
                    View Full Report
                </button>

                <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 text-sm rounded-lg transition">
                    Share
                </button>
            </div>
        </div>
    );
};

export default ScamCard;
