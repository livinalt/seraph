import { ShieldCheck, Cpu, Users, CheckCircle } from "lucide-react";

const TrustBadges = () => {
    const badges = [
        { text: "10k+ Scans Daily", icon: <ShieldCheck size={16} /> },
        { text: "AI Risk Engine", icon: <Cpu size={16} /> },
        { text: "Community Reports", icon: <Users size={16} /> },
        { text: "Verified Sources", icon: <CheckCircle size={16} /> },
    ];

    return (
        <section className="py-16 bg-[#0d0d0e] text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-10 tracking-tight">
                Trusted by Users Worldwide
            </h2>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className="
                            bg-[#141415] 
                            border border-[#1f1f20]
                            text-gray-300
                            px-5 py-3
                            rounded-md
                            text-sm
                            flex items-center gap-2
                            shadow-sm
                            transition-all duration-200
                            hover:border-yellow-400/40
                            hover:shadow-[0_0_15px_-4px_rgba(255,204,0,0.2)]
                        "
                    >
                        {badge.icon}
                        {badge.text}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBadges;
