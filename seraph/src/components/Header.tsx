// src/components/Header.tsx
import { AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { useReportModal } from "../hooks/useReportModal";
import { Link, useLocation } from "react-router-dom"; // if using React Router
import "../index.css";

const Header = () => {
    const { openReportModal } = useReportModal();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation(); // optional: to highlight current page

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo — Perfect Brand Colors */}
                <a href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10">
                        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-lg">
                            {/* Outer rings — subtle yellow/orange */}
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3" />
                            <circle cx="20" cy="20" r="13" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
                            <circle cx="20" cy="20" r="8" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.7" />

                            {/* Rotating scan line — fiery gradient */}
                            <defs>
                                <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            <g className="animate-spin-slow origin-center">
                                <line x1="20" y1="20" x2="20" y2="4" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
                                <line x1="20" y1="20" x2="20" y2="2" stroke="url(#scanGradient)" strokeWidth="4" />
                            </g>

                            {/* Pulsing center dot — bright yellow */}
                            <circle cx="20" cy="20" r="3.5" fill="#fbbf24" className="animate-pulse shadow-lg">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>

                    <span className="text-xl font-bold text-white hidden sm:block">Seraph</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                    <a href="/" className="text-gray-300 hover:text-yellow-300 transition font-medium">Home</a>
                    <a href="/scamDirectory" className="text-gray-300 hover:text-yellow-300 transition font-medium">Scam List</a>
                    <a href="/#blog" className="text-gray-300 hover:text-yellow-300 transition font-medium">Blog</a>

                    {/* Search Icon + Report Button — Clean & Separate */}
                    <div className="flex items-center gap-6">
                        {/* Search Icon → Opens Directory */}
                        <a
                            href="/scamDirectory"
                            className="text-gray-400 hover:text-yellow-300 transition p-2 rounded-lg hover:bg-white/5"
                            title="Search scams"
                        >
                            <Search size={22} />
                        </a>

                        {/* Report Scam Button — Elegant & Compact */}
                        <button
                            onClick={openReportModal}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                        >
                            <AlertTriangle size={18} />
                            <span className="hidden sm:inline">Report Scam</span>
                            <span className="sm:hidden">Report</span>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden text-gray-300 hover:text-yellow-300 p-2"
                >
                    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-[#0d1117]/95 backdrop-blur-lg border-t border-white/10">
                    <div className="px-6 py-8 space-y-6 text-center">
                        <a href="/" className="block text-xl text-gray-300 hover:text-yellow-300 py-3">Home</a>
                        <a href="/scamDirectory" className="block text-xl text-gray-300 hover:text-yellow-300 py-3">Scam List</a>
                        <a href="/#blog" className="block text-xl text-gray-300 hover:text-yellow-300 py-3">Blog</a>

                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                openReportModal();
                            }}
                            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg"
                        >
                            <AlertTriangle size={24} className="inline mr-2" />
                            Report Scam
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;