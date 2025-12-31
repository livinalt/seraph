// src/components/home/ScamCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, FileText } from "lucide-react";

interface ScamCardProps {
  _id: string;
  title: string;
  entityType: string;
  summary: string;
  tags: string[];
  communitySafe: number;
  explanation: string;
  thumbnailUrl?: string;
  logoUrl?: string;
  reportedCount?: number;
}

const ScamCard: React.FC<ScamCardProps> = ({
  _id,
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
    <div className="h-full">
      {/* Main Card — Click goes to detail page */}
      <Link to={`/project/${_id}`} className="block h-full">
        <div className="group relative bg-[#0F1624] border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/60 transition-all duration-300 h-full flex flex-col cursor-pointer">
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
                {title[0]?.toUpperCase()}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Top Bar */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-black/90 transition"
              >
                <FileText size={14} />
                AI Report
              </button>

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

          {/* Card Body */}
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

            {/* Safety Bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-green-500 transition-all"
                  style={{ width: `${communitySafe}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{communitySafe}% community safe</p>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition mt-auto">
              View Full Report
            </button>
          </div>
        </div>
      </Link>

      {/* AI Report Modal — Outside Link, stops navigation */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#0F1624] border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <FileText size={20} />
                AI Scam Analysis
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-3xl text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="text-gray-300 text-sm leading-relaxed space-y-3">
              <p>{explanation || "No detailed analysis available."}</p>
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
    </div>
  );
};

export default ScamCard;