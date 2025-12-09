// ScamCard.tsx — Final Clean Version
import React, { useState } from "react";
import { Users, FileText } from "lucide-react";

interface ScamCardProps {
    title: string;
    entityType: string;        // e.g. "Token", "Website", "Project"
    summary: string;
    tags: string[];
    communitySafe: number;
    explanation: string;
    thumbnailUrl?: string;
    logoUrl?: string;
    reportedCount?: number;
}

const ScamCard: React.FC<ScamCardProps> = ({
    title,
    entityType,
    summary,
    tags,
    communitySafe,
    explanation,
    thumbnailUrl,
    logoUrl,
    reportedCount = 0,
}) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);


    const formatReports = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

    return (
        <>
            <div className="group relative bg-[#0F1624] border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/60 transition-all h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-32 bg-gray-900">
                    {imageLoading && <div className="absolute inset-0 animate-pulse bg-gray-800" />}

                    {thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            loading="lazy"
                            onLoad={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                            className={`w-full h-full object-cover transition-opacity ${imageLoading ? "opacity-0" : "opacity-100"}`}
                        />
                    ) : logoUrl ? (
                        <div className="flex items-center justify-center h-full">
                            <img src={logoUrl} alt="logo" className="h-16 w-16 object-contain" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-5xl font-bold text-gray-700">
                            {title[0]}
                        </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                    {/* Top Bar: AI Report + Entity Type */}
                    <div className="absolute top-2 left- left-2 right-2 flex justify-between items-center z-10">
                        {/* AI Report Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-black/90 transition"
                        >
                            <FileText size={14} />
                            AI Report
                        </button>

                        {/* Entity Type */}
                        <span className="text-xs bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg font-medium backdrop-blur-sm">
                            {entityType}
                        </span>
                    </div>

                    {/* Reported Badge */}
                    {reportedCount > 0 && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
                            <Users size={12} />
                            {formatReports(reportedCount)} reported
                        </div>
                    )}

                </div>

                {/* Card Body - Minimal & Fast */}
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-white line-clamp-1 mb-2 text-base">{title}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2 mb-4">{summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && <span className="text-[10px] text-gray-500">+{tags.length - 3}</span>}
                    </div>

                    {/* Community Bar */}
                    <div className="mb-4">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-red-600 to-green-500 transition-all"
                                style={{ width: `${communitySafe}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">{communitySafe}% say safe</p>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition">
                        View Full Report
                    </button>
                </div>
            </div>

            {/* AI Analysis Modal (unchanged) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div
                        className="bg-[#0F1624] border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                AI Scam Analysis
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-3xl text-gray-400 hover:text-white">
                                ×
                            </button>
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                            <p>{explanation}</p>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScamCard;