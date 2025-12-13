import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

const Seo = ({ title, description, noIndex = false }: SeoProps) => {
  useEffect(() => {
    // Title
    document.title = title
      ? `${title} | Seraph`
      : "Seraph — Scam Detection Platform";

    // Description
    let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement("meta") as HTMLMetaElement;
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      description || "AI-powered scam detection and risk analysis platform.";

    // Robots
    let metaRobots = document.querySelector("meta[name='robots']") as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement("meta") as HTMLMetaElement;
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = noIndex ? "noindex, nofollow" : "index, follow";
  }, [title, description, noIndex]);

  return null;
};

export default Seo;
