const HowItWorks = () => {
    return (
        <section className="py-24 px-4 bg-[#0d0d0f]">
            <div className="max-w-6xl mx-auto text-center">

                <h2 className="text-3xl font-bold mb-14 text-white">
                    How Seraph Protects You
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {[
                        { title: "Enter a Website or Token", text: "Start by entering any URL or wallet." },
                        { title: "AI Risk Detection", text: "Our AI scans for malicious patterns & behavior." },
                        { title: "Community Insights", text: "Read reports from verified Seraph users." }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#131316] p-8 rounded-xl border border-gray-800 hover:border-yellow-400 transition-all shadow-lg">
                            <h3 className="text-xl text-yellow-400 font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.text}</p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
