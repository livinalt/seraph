import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <section className="py-28 px-4 text-center bg-grid">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    <span className="bg-yellow-400 text-black px-2">Scan</span> any project.<br />
                    <span className="text-yellow-400">Stay protected.</span>
                </h1>

                <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
                    AI-powered scam detection with real-time community insights.
                    Powered by Seraph’s security intelligence.
                </p>

                <SearchBar />

            </div>
        </section>
    );
};

export default Hero;
