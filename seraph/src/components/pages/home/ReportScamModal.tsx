// src/components/ReportScamModal.tsx
import React, { useState, useEffect } from "react";
import { X, Upload, AlertTriangle, Globe, FileCode, Layers, Users, Coins } from "lucide-react";

type ReportType = "website" | "contract" | "token" | "project" | "team";

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading?: boolean;
  error?: string | null;
}

const typeOptions: { id: ReportType; label: string; icon: React.ReactNode }[] = [
  { id: "website", label: "Website", icon: <Globe size={16} /> },
  { id: "contract", label: "Contract", icon: <FileCode size={16} /> },
  { id: "token", label: "Token", icon: <Coins size={16} /> },
  { id: "project", label: "Project", icon: <Layers size={16} /> },
  { id: "team", label: "Team", icon: <Users size={16} /> },
];

const ReportScamModal: React.FC<ReportScamModalProps> = ({ isOpen, onClose, onSubmit, loading, error }) => {
  const [selectedType, setSelectedType] = useState<ReportType>("website");
  const [form, setForm] = useState({
    name: "",
    website: "",
    contract: "",
    reason: "",
    evidence: null as File | null,
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, evidence: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: selectedType, ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Illustration / Animation */}
        <div className="hidden md:flex flex-1 bg-emerald-50 items-center justify-center p-6">
          <img
            src="/assets/report-illustration.png"
            alt="Report Illustration"
            className="max-w-full max-h-80 object-contain"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 p-6 space-y-4 md:space-y-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} />
              Report Scam
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
              <X size={20} />
            </button>
          </div>

          {/* Type selection */}
          <div className="flex flex-wrap gap-2 mb-2">
            {typeOptions.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    selectedType === type.id
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>

          {/* Dynamic fields */}
          {(selectedType === "token" || selectedType === "project" || selectedType === "team") && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={selectedType === "team" ? "Team Member / Role" : "Project / Token Name"}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          )}

          {(selectedType === "website" || selectedType === "project") && (
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website URL (optional)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          )}

          {(selectedType === "contract" || selectedType === "token") && (
            <input
              type="text"
              name="contract"
              value={form.contract}
              onChange={handleChange}
              placeholder="Contract Address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono text-xs"
            />
          )}

          {/* Reason */}
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Why do you believe this is a scam?"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
          />

          {/* Evidence */}
          <input type="file" id="evidence" className="hidden" onChange={handleFile} />
          <label
            htmlFor="evidence"
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition text-gray-600"
          >
            <Upload size={18} />
            {form.evidence ? form.evidence.name : "Upload screenshot or proof (optional)"}
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition shadow-lg"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportScamModal;
