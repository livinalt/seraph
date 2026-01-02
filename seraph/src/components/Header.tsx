import { AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReportFlow from "./ReportFlow"; // <-- import the new flow

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReportFlow, setShowReportFlow] = useState(false); // control modal flow
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleBlogScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector("#blog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              S
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">
              Seraph
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link
              to="/"
              className={`text-sm font-medium transition ${
                isActive("/") ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            <Link
              to="/directory"
              className={`text-sm font-medium transition ${
                isActive("/directory") ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Scam List
            </Link>

            <button
              onClick={handleBlogScroll}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Blog
            </button>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/directory"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                title="Search"
              >
                <Search size={20} />
              </Link>

              {/* Report Button triggers the new ReportFlow */}
              <button
                onClick={() => setShowReportFlow(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <AlertTriangle size={16} />
                <span className="hidden sm:inline">Report Scam</span>
              </button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-6 space-y-5 text-center">
              <Link
                to="/"
                className="block text-base font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/directory"
                className="block text-base font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                Scam List
              </Link>

              <button
                onClick={handleBlogScroll}
                className="block w-full text-base font-medium text-gray-700"
              >
                Blog
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  setShowReportFlow(true); // <-- trigger new ReportFlow
                }}
                className="w-full mt-4 px-5 py-3 rounded-xl text-sm font-semibold
                  bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <AlertTriangle size={18} className="inline mr-2" />
                Report Scam
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Include the ReportFlow modal */}
      {showReportFlow && <ReportFlow />}
    </>
  );
};

export default Header;
