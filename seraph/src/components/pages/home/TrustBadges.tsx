import { ShieldCheck, Cpu, Users, CheckCircle } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { text: "10k+ scans daily", icon: ShieldCheck },
    { text: "AI-powered risk engine", icon: Cpu },
    { text: "Community-driven reports", icon: Users },
    { text: "Verified data sources", icon: CheckCircle },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-10 tracking-tight">
        Trusted by users worldwide
      </h2>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className="
                flex items-center gap-2.5
                px-5 py-3
                rounded-xl
                text-sm font-medium
                bg-gray-50
                border border-gray-200
                text-gray-700
                shadow-sm
                transition
                hover:bg-white
                hover:border-emerald-300
              "
            >
              <Icon size={16} className="text-emerald-500" />
              {badge.text}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustBadges;



