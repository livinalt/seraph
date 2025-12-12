// import { useState } from "react";
import { ShieldCheck, Search, AlertTriangle } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Search size={32} />,
            title: "Enter a Website or Token",
            text: "Paste any URL, contract address, project name, or wallet to investigate.",
            color: "bg-[#0d0d0f] border-white/10"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "AI Risk Scan",
            text: "Seraph scans patterns, behaviors, contracts, and community signals in seconds.",
            color: "bg-[#0d0d0f] border-white/10"
        },
        {
            icon: <AlertTriangle size={32} />,
            title: "Clear Safety Verdict",
            text: "Get a risk rating, red flags, scam markers, and transparent explanations.",
            color: "bg-[#0d0d0f] border-white/10"
        }
    ];

    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-left">
                    How Seraph Protects You
                </h2>

                {/* Grid of Cards */}
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={` rounded-2xl p-8 flex flex-col justify-start h-[340px] transition-all ${step.color} hover:border-yellow-400`}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-yellow-400 mb-6">
                                {step.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {step.title}
                            </h3>

                            {/* Text */}
                            <p className="text-gray-400 leading-relaxed">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
