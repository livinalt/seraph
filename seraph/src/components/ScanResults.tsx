// // src/components/ScanResults.tsx
// import { useReportModal } from "@/context/ModalContext";
// import { ArrowLeft, ShieldAlert, CheckCircle, AlertTriangle, Globe, Link2, BadgeAlert } from "lucide-react";
// import { useRouter } from "next/navigation"; // or useNavigate() if using React Router

// const ScanResults = ({ query }: { query: string }) => {
//     const router = useRouter();
//     const { openReportModal } = useReportModal();

//     // Fake data (replace with real API later)
//     const result = {
//         risk: "High Risk",
//         color: "text-red-500",
//         scoreBg: "bg-red-500/10 border-red-500/30",
//         indicators: [
//             { icon: <AlertTriangle size={20} />, label: "Suspicious Patterns" },
//             { icon: <BadgeAlert size={20} />, label: "Unverified Contract" },
//             { icon: <Globe size={20} />, label: "New Domain" },
//         ],
//         redFlags: [
//             "Domain registered less than 30 days ago",
//             "Smart contract contains high-risk functions",
//             "No team verification",
//             "Associated addresses flagged in prior scams",
//         ],
//     };

//     return (
//         <div className="min-h-screen bg-[#0b0b0c] text-white px-6 py-20">

//             {/* Back Button */}
//             <button
//                 onClick={() => router.back()}
//                 className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
//             >
//                 <ArrowLeft size={20} />
//                 Back
//             </button>

//             {/* Page Header */}
//             <div className="max-w-5xl mx-auto">
//                 <h1 className="text-3xl md:text-4xl font-bold mb-3">
//                     Scan Results for: <span className="text-yellow-400">{query}</span>
//                 </h1>
//                 <p className="text-gray-400">Here is a full breakdown of your scan.</p>
//             </div>

//             {/* Main Risk Card */}
//             <div className="max-w-5xl mx-auto mt-10 p-8 rounded-2xl bg-[#131316] border border-gray-800 shadow-xl">
//                 <div className="flex items-center gap-4 mb-6">
//                     <ShieldAlert className={`w-10 h-10 ${result.color}`} />
//                     <div>
//                         <h2 className="text-2xl font-bold">Risk Assessment</h2>
//                         <p className="text-gray-400 text-sm">AI-powered analysis</p>
//                     </div>
//                 </div>

//                 <div className={`inline-block px-4 py-2 rounded-lg border text-lg font-semibold ${result.scoreBg} ${result.color}`}>
//                     {result.risk}
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-4">
//                     {result.indicators.map((item, i) => (
//                         <div
//                             key={i}
//                             className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg border border-white/10 text-gray-300"
//                         >
//                             {item.icon}
//                             {item.label}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Red Flags */}
//             <div className="max-w-5xl mx-auto mt-10 p-8 bg-[#131316] rounded-2xl border border-gray-800">
//                 <h3 className="text-xl font-semibold mb-4 text-red-400">Warning Red Flags</h3>
//                 <ul className="list-disc list-inside text-gray-400 space-y-2">
//                     {result.redFlags.map((flag, i) => (
//                         <li key={i}>{flag}</li>
//                     ))}
//                 </ul>
//             </div>

//             {/* CTA – Report This Project */}
//             <div className="max-w-5xl mx-auto text-center mt-16">
//                 <button
//                     onClick={openReportModal}
//                     className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg transition flex items-center gap-3 mx-auto"
//                 >
//                     <AlertTriangle size={22} />
//                     Report This Project
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ScanResults;