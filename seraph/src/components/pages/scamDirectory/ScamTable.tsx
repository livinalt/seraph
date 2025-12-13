// src/components/scamDirectory/ScamTable.tsx
interface ScamItem {
    id: number;
    name: string;
    title: string;
    summary: string;
    category: string;
    tags: string[];
    reports: number;
    firstSeen: string;
    screenshot: string;
    communitySafe: number;
    explanation: string;
    logoUrl: string;
}

interface ScamTableProps {
    items: ScamItem[];
    onView: (item: ScamItem) => void;
}

export const ScamTable = ({ items, onView }: ScamTableProps) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                No results match your filters.
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden border border-white/6">
            <table className="w-full text-left">
                <thead className="bg-[#0f0f11]">
                    <tr>
                        <th className="p-4 text-sm font-medium text-gray-400">Project</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Category</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Reports</th>
                        <th className="p-4 text-sm font-medium text-gray-400">First Seen</th>
                        <th className="p-4 text-sm font-medium text-gray-400 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-white/6 hover:bg-white/3 transition cursor-pointer"
                            onClick={() => onView(item)}
                        >
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.screenshot}
                                        alt={item.name}
                                        className="w-16 h-10 object-cover rounded-md border border-white/10"
                                    />
                                    <div>
                                        <div className="font-medium text-white">{item.title}</div>
                                        <div className="text-xs text-gray-400">{item.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-sm text-gray-300">{item.category}</td>
                            <td className="p-4 text-sm text-gray-300">{item.reports}</td>
                            <td className="p-4 text-sm text-gray-300">
                                {new Date(item.firstSeen).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="p-4 text-right">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onView(item);
                                    }}
                                    className="text-yellow-400 font-medium hover:underline"
                                >
                                    View →
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};