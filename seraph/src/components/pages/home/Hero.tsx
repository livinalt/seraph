import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  const words = [
    "Scan any project",
    "Verify any project",
    "Check any project",
    "Stay protected",
  ];

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = isDeleting ? 50 : 110;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => {
        if (!isDeleting) {
          const next = current.slice(0, prev.length + 1);
          if (next === current) setTimeout(() => setIsDeleting(true), 900);
          return next;
        } else {
          const next = current.slice(0, prev.length - 1);
          if (next === "") {
            setIsDeleting(false);
            setIndex((i) => i + 1);
          }
          return next;
        }
      });
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <section className="relative min-h-screen bg-[#f7f8fa] overflow-hidden">
      {/* ===== World Intelligence Map ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_65%)]" />

        {/* World Map SVG */}
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          fill="none"
        >
          <image
            href="/world-dots.svg"
            width="1200"
            height="600"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>

        {/* Multiple Scan Pulses – Continuous radar effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[600px] h-[600px]">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-radar-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-radar-pulse animation-delay-2000" />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-radar-pulse animation-delay-4000" />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/15 animate-radar-pulse animation-delay-6000" />
          </div>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="relative max-w-6xl mx-auto px-4 pt-36 text-center">
        <p className="text-sm font-medium text-gray-500 mb-4">
          AI-powered Web3 Security
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6">
          {displayed}
          <span className="text-emerald-500">.</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Instantly analyze Web3 projects using AI and real-time community intelligence.
        </p>

        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;