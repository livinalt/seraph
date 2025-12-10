import React from "react";

const CTA = () => {
    return (
        <section className="py-24 px-6 bg-[#0d0d0e] text-center relative overflow-hidden">

            {/* Soft gradient glow */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#1a1a1d] to-[#0d0d0e] opacity-70 pointer-events-none"></div>

            <div className="relative max-w-3xl mx-auto">

                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                    Stay Safe. Stay Informed.
                </h2>

                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
                    Stay ahead and protected from fraudulent websites, tokens, and projects.
                </p>

                <button
                    className="
            bg-yellow-400 
            text-black 
            font-semibold 
            px-10 
            py-4 
            rounded-xl 
            text-lg
            shadow-[0_0_20px_rgba(255,204,0,0.25)]
            hover:shadow-[0_0_35px_rgba(255,204,0,0.45)]
            hover:bg-yellow-300
            transition-all
            duration-300
          "
                >
                    Start Checking Now
                </button>

                {/* Light sweep animation */}
                <div className="absolute top-0 left-1/2 w-[140%] h-[200%] bg-linear-to-r from-transparent via-white/5 to-transparent rotate-[25deg] animate-sweep"></div>

            </div>
        </section>
    );
};

export default CTA;
