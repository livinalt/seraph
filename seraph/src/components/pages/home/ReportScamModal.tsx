import { useState, useEffect } from "react";
import { X, Upload, AlertTriangle } from "lucide-react";

interface ReportScamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReportScamModal = ({ isOpen, onClose }: ReportScamModalProps) => {
    const [form, setForm] = useState({
        projectName: "",
        website: "",
        contract: "",
        reason: "",
        evidence: null as File | null,
    });

    // Close on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!isOpen) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, evidence: e.target.files?.[0] || null });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Report submitted:", form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {/* Reduced from max-w-xl → max-w-md, and less padding */}
            <div className="bg-[#0d0d0f] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={20} />
                        Report Scam
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Compact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="projectName"
                        value={form.projectName}
                        onChange={handleChange}
                        placeholder="Project name *"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/50"
                    />

                    <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="Website (optional)"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/50"
                    />

                    <input
                        type="text"
                        name="contract"
                        value={form.contract}
                        onChange={handleChange}
                        placeholder="Contract address (optional)"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500/50"
                    />

                    <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="Why are you think it's a scam... *"
                        rows={3}
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:border-red-500/50"
                    />

                    {/* Compact Upload */}
                    <div>
                        <input
                            type="file"
                            id="evidence"
                            className="hidden"
                            onChange={handleFile}
                        />
                        <label
                            htmlFor="evidence"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition text-sm text-gray-400"
                        >
                            <Upload size={18} />
                            {form.evidence ? form.evidence.name : "Add screenshot (optional)"}
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition text-sm"
                    >
                        Submit Report
                            </button>
                        </form>
                    </div>
                </div>
            );
        };
        
        export default ReportScamModal;