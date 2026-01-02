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

  const formatReports = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  const safetyColor =
    communitySafe >= 70
      ? "bg-emerald-500"
      : communitySafe >= 40
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="h-full">
      <Link to={`/project/${_id}`} className="block h-full">
        <div className="group h-full flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

          {/* Media */}
          <div className="relative h-32 bg-gray-50 flex items-center justify-center">
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gray-100" />
            )}

            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                loading="lazy"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                className={`w-full h-full object-cover transition-opacity ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            ) : logoUrl ? (
              <img
                src={logoUrl}
                alt="logo"
                className="h-14 w-14 object-contain"
                onLoad={() => setImageLoading(false)}
              />
            ) : (
              <div className="text-3xl font-semibold text-gray-400">
                {title[0]?.toUpperCase()}
              </div>
            )}

            {/* Top Meta */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="flex items-center gap-1.5 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white"
              >
                <FileText size={13} />
                AI report
              </button>

              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                {entityType}
              </span>
            </div>

            {/* Reports */}
            {reportedCount > 0 && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-gray-200 text-gray-700">
                <Users size={12} />
                {formatReports(reportedCount)} reports
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
              {title}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-2 mb-4">
              {summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-[10px] text-gray-400">
                  +{tags.length - 3}
                </span>
              )}
            </div>

            {/* Safety */}
            <div className="mb-4">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${safetyColor}`}
                  style={{ width: `${communitySafe}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {communitySafe}% community safe
              </p>
            </div>

            <span className="mt-auto inline-flex justify-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
              View full report →
            </span>
          </div>
        </div>
      </Link>

      {/* AI Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} />
                AI Scam Analysis
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {explanation || "No detailed analysis available."}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition"
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
