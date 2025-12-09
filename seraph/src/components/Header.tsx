import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

                {/* Logo */}
                <div className="text-2xl font-extrabold tracking-wide text-yellow-400 drop-shadow-glow">
                    Seraph
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

                {/* Mobile Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-yellow-300"
                    onClick={() => setOpen(!open)}
                >
                    <svg width="28" height="28" fill="currentColor">
                        <path d="M4 7h20M4 14h20M4 21h20" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-lg border-t border-white/10 p-4 space-y-4">
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
