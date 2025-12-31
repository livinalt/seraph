// src/pages/project/ProjectDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  ArrowLeft,
  Globe,
  FileCode,
  Coins,
  Layers,
  XCircle,
} from "lucide-react";
import Header from "../../Header";
import ShareButton from "../home/ShareButton";

interface ScamDetails {
  _id: string;
  title: string;
  name: string;
  category: string;
  screenshot?: string;
  verdict: string;
  explanation: string;
  flags: string[];
  reports: number;
  details?: any;
  fromDatabase?: boolean;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scam, setScam] = useState<ScamDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScam = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          `https://seraph-1.onrender.com/api/scams/${id}`
        );
        if (!res.ok) throw new Error("Scam not found");
        const data = await res.json();
        setScam(data);
      } catch (err) {
        console.error(err);
        // Optional: show error state
      } finally {
        setLoading(false);
      }
    };

    fetchScam();
  }, [id]);

  const getCategoryIcon = () => {
    switch (scam?.category?.toLowerCase()) {
      case "website":
        return <Globe className="text-blue-400" size={28} />;
      case "token":
        return <Coins className="text-yellow-400" size={28} />;
      case "contract":
        return <FileCode className="text-purple-400" size={28} />;
      default:
        return <Layers className="text-green-400" size={28} />;
    }
  };

  const getVerdictColor = () => {
    switch (scam?.verdict?.toLowerCase()) {
      case "low risk":
        return "bg-green-900/30 border-green-500/50 text-green-400";
      case "medium risk":
        return "bg-yellow-900/30 border-yellow-500/50 text-yellow-400";
      default:
        return "bg-red-900/30 border-red-500/50 text-red-400";
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center">
          <p className="text-white text-xl">Loading project details...</p>
        </div>
      </>
    );
  }

  if (!scam) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center">
          <p className="text-gray-400 text-xl">Scam not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#0f0f11]/90 backdrop-blur border border-white/10 rounded-lg text-gray-300 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              {getCategoryIcon()}
              <span className="text-sm uppercase tracking-wider text-gray-400">
                {scam.category}
              </span>
              <span className="text-xs bg-gray-800/50 px-3 py-1 rounded-full">
                ID: {scam._id.slice(-6)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {scam.title || scam.name}
            </h1>
            <p className="text-xl text-gray-400">{scam.name}</p>
          </div>

          {/* Screenshot */}
          {scam.screenshot ? (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Globe size={22} />
                Project Preview
              </h3>
              <div className="rounded-2xl overflow-hidden border border-gray-800 bg-[#131316] shadow-2xl">
                <img
                  src={scam.screenshot}
                  alt="Project screenshot"
                  className="w-full max-h-screen object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="mb-12 py-20 bg-[#131316] rounded-2xl border border-gray-800 text-center">
              <ShieldAlert size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No preview available</p>
            </div>
          )}

          {/* Verdict */}
          <div
            className={`p-10 rounded-2xl text-center mb-12 border ${getVerdictColor()}`}
          >
            <ShieldAlert className="w-20 h-20 mx-auto mb-6 text-current opacity-80" />
            <h2 className="text-5xl font-bold mb-4">
              {scam.verdict || "High Risk"}
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              {scam.explanation ||
                "Multiple scam indicators detected. Exercise extreme caution."}
            </p>
          </div>

          {/* Key Risk Indicators */}
          {scam.flags && scam.flags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">
                Key Risk Indicators
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {scam.flags.map((flag, i) => (
                  <div
                    key={i}
                    className="bg-red-900/20 border border-red-500/40 rounded-xl p-5 flex items-start gap-4"
                  >
                    <XCircle
                      className="text-red-400 mt-1 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-lg">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Reports */}
          <div className="bg-[#131316] border border-gray-800 rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  Community Reports
                </p>
                <p className="text-4xl font-bold mt-2">{scam.reports || 0}</p>
              </div>
              <div className="text-right">
                <button className="px-8 py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-lg transition transform hover:scale-105">
                  Report This Scam
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-6">

            <ShareButton
              title={scam.title}
              url={window.location.href}
              size="lg"
            />
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition"
            >
              <ArrowLeft size={20} />
              Back to Directory
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
