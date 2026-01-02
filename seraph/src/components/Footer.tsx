import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-900">Seraph AI</span>. All
            rights reserved.
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              to="/terms"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Terms
            </Link>

            <Link
              to="/privacy"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Privacy
            </Link>

            <Link
              to="/disclaimer"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Disclaimer
            </Link>

            <Link
              to="/report-abuse"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Report Abuse
            </Link>

            <Link
              to="/directory"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Scam Directory
            </Link>

            <Link
              to="/contact"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Seraph provides AI-powered risk analysis for informational purposes
          only. Results do not constitute financial, legal, or investment advice.
          Always conduct your own independent research.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
