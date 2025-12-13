import Seo from "../../seo/Seo";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const LegalLayout = ({ title, description, children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-gray-300 px-6 py-24">
      <Seo
        title={title}
        description={description}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">
          {title}
        </h1>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
