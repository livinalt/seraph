// src/components/ReportModal.tsx
import { X } from "lucide-react";

interface SubmittedReportProps {
    isOpen: boolean;
    onClose: () => void;
    projectUrl: string;
}

const SubmittedReport = ({ isOpen, onClose, projectUrl }: SubmittedReportProps) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can send to backend later
        alert("Thank you! Report submitted successfully."); // Replace with toast later
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#131316] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Report Project</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Help us keep the community safe by reporting suspicious projects.
                    </p>

                    <div className="bg-[#0b0b0c] border border-gray-800 rounded-lg p-4 mb-6">
                        <p className="text-gray-500 text-xs">Project URL</p>
                        <p className="text-yellow-400 font-medium truncate">{projectUrl}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Reason for reporting
                        </label>
                        <select
                            required
                            className="w-full px-4 py-3 bg-[#0b0b0c] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition mb-6"
                        >
                            <option value="">Select a reason</option>
                            <option>Phishing / Scam</option>
                            <option>Fake giveaway</option>
                            <option>Rug pull</option>
                            <option>Malicious contract</option>
                            <option>Fake team / impersonation</option>
                            <option>Other</option>
                        </select>

                        <textarea
                            placeholder="Additional details (optional)"
                            rows={4}
                            className="w-full px-4 py-3 bg-[#0b0b0c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition resize-none mb-6"
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition transform hover:scale-105"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmittedReport;