const TrustBadges = () => {
    const badges = [
        "10k+ Scans Daily",
        "AI Risk Engine",
        "Community Reports",
        "Verified Sources"
    ];

    return (
        <section className="py-20 bg-[#0f0f11] text-center">
            <h2 className="text-2xl font-bold text-white mb-10">
                Trusted by Users Worldwide
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
                {badges.map((b, i) => (
                    <div
                        key={i}
                        className="bg-[#161618] px-6 py-4 rounded-lg border border-gray-800 text-gray-300 text-sm shadow-md hover:border-yellow-400 transition-all"
                    >
                        {b}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBadges;
