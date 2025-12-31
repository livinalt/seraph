// src/components/ui/ShareButton.tsx
import { useState } from "react";
import { Share2, Check, Link2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url: string;
  size?: "sm" | "md" | "lg";
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text = "Check this out on Seraph — the community-powered scam scanner",
  url,
  size = "md",
}) => {
  const [status, setStatus] = useState<"idle" | "shared" | "copied">("idle");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setStatus("shared");
        setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        // User cancelled — do nothing
      }
    } else {
      // Fallback: copy URL
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-3",
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center ${sizeClasses[size]} bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group`}
    >
      {status === "shared" ? (
        <>
          <Check size={size === "lg" ? 24 : 20} className="text-green-400" />
          <span className="text-green-400 font-medium">Shared!</span>
        </>
      ) : status === "copied" ? (
        <>
          <Link2 size={size === "lg" ? 24 : 20} className="text-green-400" />
          <span className="text-green-400 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={size === "lg" ? 24 : 20} className="text-gray-400 group-hover:text-white transition" />
          <span className="text-gray-400 group-hover:text-white font-medium transition">
            Share Report
          </span>
        </>
      )}
    </button>
  );
};

export default ShareButton;