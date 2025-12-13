const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0c]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-yellow-400 font-medium">Seraph AI</span>.
            All rights reserved.
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="/terms" className="text-gray-400 hover:text-yellow-300 transition">
              Terms
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-yellow-300 transition">
              Privacy
            </a>
            <a href="/disclaimer" className="text-gray-400 hover:text-yellow-300 transition">
              Disclaimer
            </a>
            <a href="/report-abuse" className="text-gray-400 hover:text-yellow-300 transition">
              Report Abuse
            </a>
            <a href="/directory" className="text-gray-400 hover:text-yellow-300 transition">
              Scam Directory
            </a>
            <a href="/contact" className="text-gray-400 hover:text-yellow-300 transition">
              Contact
            </a>
          </nav>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-6 text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Seraph provides AI-powered risk analysis for informational purposes only.
          Results do not constitute financial, legal, or investment advice.
          Always conduct your own independent research.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
