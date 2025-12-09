import React from 'react';

const SearchBar = () => {
    return (
        <div className="flex flex-col items-center mt-10">

            <div className="flex w-full max-w-2xl bg-[#111] border border-gray-700 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/10">
                <input
                    type="text"
                    placeholder="Enter URL, project name, or wallet address"
                    className="flex-grow p-4 bg-transparent text-gray-200 outline-none"
                />

                <button className="bg-yellow-400 text-black px-6 font-semibold hover:bg-yellow-300 transition">
                    Scan Now
                </button>
            </div>

            <p className="text-gray-500 text-sm mt-3">
                Try: example.com | 0xabc123 | projectxyz.io
            </p>

        </div>
    );
};

export default SearchBar;
