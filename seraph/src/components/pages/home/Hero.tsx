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
    const currentWord = words[index % words.length];
    const speed = isDeleting ? 50 : 110;

    const timeout = setTimeout(() => {
      setDisplayed((prev) => {
        if (!isDeleting) {
          const next = currentWord.slice(0, prev.length + 1);
          if (next === currentWord) {
            setTimeout(() => setIsDeleting(true), 900);
          }
          return next;
        } else {
          const next = currentWord.slice(0, prev.length - 1);
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
    <section className="min-h-screen bg-[#f7f8fa] px-4">
      <div className="max-w-6xl mx-auto pt-32 text-center">
        
        {/* Eyebrow */}
        <p className="text-sm font-medium text-gray-500 mb-4">
          AI-powered Web3 Security
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
          {displayed}
          <span className="text-emerald-500">.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Instantly analyze Web3 projects using AI and real-time community intelligence.
        </p>

        {/* Primary Action */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>

        {/* Optional secondary hints */}
        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
          <span>✓ Smart Contracts</span>
          <span>✓ Tokens</span>
          <span>✓ Protocols</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
