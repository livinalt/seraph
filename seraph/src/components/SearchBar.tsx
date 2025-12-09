import { useState } from "react";
import { FileCode, Globe, Users, Layers, Coins } from "lucide-react"; // icons added

const SearchBar = () => {
    const [active, setActive] = useState("website");

    const tabs = [
        { id: "contract", label: "Contract", icon: <FileCode size={14} /> },
        { id: "website", label: "Website", icon: <Globe size={14} /> },
        { id: "team", label: "Team Name", icon: <Users size={14} /> },
        { id: "project", label: "Project", icon: <Layers size={14} /> },
        { id: "token", label: "Token", icon: <Coins size={14} /> },
    ];

    return (
        <div className="flex flex-col items-center mt-10">

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-all
                            ${active === tab.id
                                ? "bg-yellow-400 text-black border-yellow-400"
                                : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
                            }
                        `}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex w-full max-w-2xl bg-[#111] border border-gray-700 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/10">
                <input
                    type="text"
                    placeholder={`Search by ${active}...`}
                    className="grow p-4 bg-transparent text-gray-200 outline-none"
                />

                <button className="bg-yellow-400 text-black px-6 font-semibold hover:bg-yellow-300 transition">
                    Scan Now
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
