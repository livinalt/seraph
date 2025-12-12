import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useReportModal } from "../hooks/useReportModal";

const Header = () => {
    const { openReportModal } = useReportModal();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

                {/* Logo */}
                <a href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-12 h-12">
                        {/* your radar SVG stays unchanged */}
                        … (keep your SVG)
                    </div>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-10">
                    {[
                        { label: "Home", href: "/" },
                        { label: "Check", href: "/#check" },
                        { label: "Scam List", href: "/#directory" },
                        { label: "Blog", href: "/#blog" },
                    ].map((item) => (
                        <a key={item.label} href={item.href} className="text-gray-300 hover:text-yellow-300 transition font-medium">
                            {item.label}
                        </a>
                    ))}

                    {/* CTA Button */}
                    <button
                        onClick={openReportModal}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition shadow-lg"
                    >
                        <AlertTriangle size={18} />
                        Report Scam
                    </button>
                </nav>

                {/* Mobile Burger */}
                <button
                    className="md:hidden text-gray-300 hover:text-yellow-300"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-lg border-t border-white/10 p-6 space-y-4">
                    {[
                        { label: "Home", href: "/" },
                        { label: "Check", href: "/#check" },
                        { label: "Scam List", href: "/#directory" },
                        { label: "Blog", href: "/#blog" },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="block text-gray-300 hover:text-yellow-300 py-2 text-lg transition"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}

                    <button
                        onClick={() => {
                            setMobileOpen(false);
                            openReportModal();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition"
                    >
                        <AlertTriangle size={20} />
                        Report Scam
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;