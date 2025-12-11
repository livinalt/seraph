import { Radar, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScanLoading = () => {
    const navigate = useNavigate();

    const messages = [
        "Analyzing domain reputation...",
        "Checking smart contract bytecode...",
        "Scanning for known scam patterns...",
    ];

    const handleCancel = () => {
        // Go back to previous page (or use navigate('/') to always go home)
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-[#0b0b0c] flex flex-col items-center justify-center text-center px-6">
            {/* Top-right cancel button */}
            <button
                onClick={handleCancel}
                className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-red-500 hover:text-red-400 transition-colors"
            >
                <X className="w-4 h-4" />
                Cancel
            </button>

            {/* Animated Radar Icon */}
            <div className="relative mb-10">
                <div className="w-32 h-32 rounded-full border border-yellow-400/40 animate-pulse flex items-center justify-center">
                    <Radar className="text-yellow-400 animate-spin-slow" size={48} />
                </div>

                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-2xl animate-ping"></div>
            </div>

            {/* Loading Text */}
            <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
                Scanning… Please Wait
            </h1>

            {/* Rotating messages */}
            <div className="h-6 text-gray-400 text-sm animate-fadeIn">
                {messages[Math.floor(Date.now() / 2000) % messages.length]}
            </div>

            {/* Loader */}
            <Loader2 className="mt-8 text-yellow-400 animate-spin" size={32} />
        </div>
    );
};

export default ScanLoading;
