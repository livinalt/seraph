import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
    const words = ["Scan any project", "Verify any project", "Check any project", "Protect"];
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index % words.length];

        let speed = isDeleting ? 50 : 120;

        let timeout = setTimeout(() => {
            setDisplayed(prev => {
                if (!isDeleting) {
                    // typing forward
                    const next = currentWord.substring(0, prev.length + 1);
                    if (next === currentWord) {
                        setTimeout(() => setIsDeleting(true), 800);
                    }
                    return next;
                } else {
                    // deleting
                    const next = currentWord.substring(0, prev.length - 1);
                    if (next === "") {
                        setIsDeleting(false);
                        setIndex(i => i + 1);
                    }
                    return next;
                }
            });
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, index]);

    return (
        <section className="py-28 px-4 text-center bg-grid">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    <span className="bg-yellow-400 text-black px-2">{displayed}</span><br />
                    <span className="text-yellow-400">Stay protected.</span>
                </h1>

                <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
                    AI-powered scam detection with real-time community insights.
                </p>

                <SearchBar />

            </div>
        </section>
    );
};

export default Hero;
