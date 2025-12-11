import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

                {/* Radar Logo */}
                <div className="relative flex items-center justify-center">
                    <a href="/" className="flex items-center space-x-3 group">
                        {/* Rotating Radar Circle + Sweep */}
                        <div className="relative w-12 h-12">
                            {/* Static Rings */}
                            <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-glow">
                                <circle cx="30" cy="30" r="28" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3" />
                                <circle cx="30" cy="30" r="20" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
                                <circle cx="30" cy="30" r="12" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />

                                {/* Rotating Sweep */}
                                <g className="animate-spin-slow origin-center">
                                    <path
                                        d="M30,30 L30,2 A28,28 0 1,1 30,30 Z"
                                        fill="url(#radarGradient)"
                                    />
                                    <defs>
                                        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                                            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </g>

                                {/* Center Dot */}
                                <circle cx="30" cy="30" r="4" fill="#fbbf24" className="animate-ping-slow" />
                                <circle cx="30" cy="30" r="4" fill="#fbbf24" />
                            </svg>
                        </div>

                        {/* Optional: "Seraph" text next to radar (uncomment if you want both) */}
                        {/* <span className="text-2xl font-extrabold tracking-tight text-yellow-400">
                            Seraph
                        </span> */}
                    </a>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-10">
                    {[
                        { label: "Home", href: "#" },
                        { label: "Check", href: "#check" },
                        { label: "Scam List", href: "#directory" },
                        { label: "Report a Scam", href: "#report" },
                        { label: "Blog", href: "#blog" },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className="text-gray-300 hover:text-yellow-300 transition-colors duration-200 font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-yellow-300"
                    onClick={() => setOpen(!open)}
                >
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-lg border-t border-white/10 p-6 space-y-4">
                    {[
                        { label: "Home", href: "#" },
                        { label: "Check", href: "#check" },
                        { label: "Scam List", href: "#directory" },
                        { label: "Report a Scam", href: "#report" },
                        { label: "Blog", href: "#blog" },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className="block text-gray-300 hover:text-yellow-300 py-2 text-lg transition"
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;