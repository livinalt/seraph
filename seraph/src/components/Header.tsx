// src/components/Header.tsx
import { AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { useReportModal } from "../hooks/useReportModal";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { openReportModal } = useReportModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Correct active path checking
  const isActive = (path: string) => location.pathname === path;

  const handleBlogScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector("#blog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-lg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3" />
              <circle cx="20" cy="20" r="13" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
              <circle cx="20" cy="20" r="8" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.7" />

              <defs>
                <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g className="animate-spin-slow origin-center">
                <line x1="20" y1="20" x2="20" y2="4" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
                <line x1="20" y1="20" x2="20" y2="2" stroke="url(#scanGradient)" strokeWidth="4" />
              </g>

              <circle cx="20" cy="20" r="3.5" fill="#fbbf24" className="animate-pulse shadow-lg">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <span className="text-xl font-bold text-white hidden sm:block">Seraph</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            to="/"
            className={`font-medium transition ${isActive("/") ? "text-yellow-300" : "text-gray-300 hover:text-yellow-300"}`}
          >
            Home
          </Link>

          <Link
            to="/directory"
            className={`font-medium transition ${isActive("/directory") ? "text-yellow-300" : "text-gray-300 hover:text-yellow-300"}`}
          >
            Scam List
          </Link>

          <button
            onClick={handleBlogScroll}
            className="text-gray-300 hover:text-yellow-300 transition font-medium"
          >
            Blog
          </button>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              to="/directory"
              className="text-gray-400 hover:text-yellow-300 transition p-2 rounded-lg hover:bg-white/5"
              title="Search scams"
            >
              <Search size={22} />
            </Link>

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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-300 hover:text-yellow-300 p-2"
          aria-label="Toggle menu"
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
            <Link
              to="/"
              className="block text-xl text-gray-300 hover:text-yellow-300 py-3"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/directory"
              className="block text-xl text-gray-300 hover:text-yellow-300 py-3"
              onClick={() => setMobileOpen(false)}
            >
              Scam List
            </Link>

            <button
              onClick={handleBlogScroll}
              className="block w-full text-xl text-gray-300 hover:text-yellow-300 py-3"
            >
              Blog
            </button>

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