// src/components/ReportSuccessModal.tsx
import { CheckCircle, X } from "lucide-react";

interface ReportSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectUrl: string;
}

const ReportSuccessModal = ({ isOpen, onClose, projectUrl }: ReportSuccessModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Success Modal */}
            <div className="relative bg-linear-to-b from-[#1a1a1c] to-[#131316] border border-green-500/30 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <div className="p-10 text-center">
                    <div className="mx-auto w-20 h-20 mb-6">
                        <CheckCircle className="w-full h-full text-green-400 animate-pulse" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                        Reported Successfully!
                    </h2>

                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        <span className="text-yellow-400 font-medium">{projectUrl}</span> has been reported and added to our scam database.
                        <br />
                        Thank you for helping keep the community safe.
                    </p>

                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition transform hover:scale-105"
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportSuccessModal;