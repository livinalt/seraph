import { X } from "lucide-react";

interface ScamItem {
    title: string;
    name: string;
    screenshot: string;
    summary: string;
    tags: string[];
    reports: number;
    firstSeen: string | Date;
}

interface ScamDetailModalProps {
    item: ScamItem;
    onClose: () => void;
}

export const ScamDetailModal = ({ item, onClose }: ScamDetailModalProps) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={onClose} />
            <div className="relative bg-[#0f0f11] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                >
                    <X size={28} />
                </button>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                            <p className="text-gray-400">{item.name}</p>
                        </div>
                        
                    </div>

                    <img
                        src={item.screenshot}
                        alt={item.name}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Summary</h3>
                            <p className="text-gray-300 leading-relaxed">{item.summary}</p>

                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs rounded-full bg-[#1a1a1c] border border-white/10 text-gray-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-[#131316] rounded-xl p-6 border border-white/10">
                                <div className="text-sm text-gray-400">Total Reports</div>
                                <div className="text-3xl font-bold text-white mt-1">{item.reports}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    First seen: {new Date(item.firstSeen).toLocaleDateString()}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition">
                                        View Full Report
                                    </button>
                                    <button className="w-full py-3 bg-[#1a1a1c] text-gray-300 border border-white/10 rounded-lg">
                                        Share Report
                                    </button>
                                    <button className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition">
                                        Flag as Confirmed Scam
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};