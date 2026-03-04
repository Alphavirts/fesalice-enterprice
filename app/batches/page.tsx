import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const batches = [
    { id: "B001", serialStart: "254701000001", serialEnd: "254701000025", date: "2/15/2024", total: 25, available: 0, assigned: 25, registered: 24, credited: 22, status: "Completed", progress: 92 },
    { id: "B002", serialStart: "254701000026", serialEnd: "254701000050", date: "2/20/2024", total: 25, available: 5, assigned: 20, registered: 18, credited: 15, status: "Partial", progress: 66 },
    { id: "B003", serialStart: "254701000051", serialEnd: "254701000075", date: "2/25/2024", total: 25, available: 25, assigned: 0, registered: 0, credited: 0, status: "Available", progress: 0 },
];

export default function BatchesPage() {
    return (
        <div className="p-8 space-y-6 h-screen overflow-y-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">SIM Batch Management</h1>
                    <p className="text-slate-500 text-sm">Manage and track SIM card batches and their lifecycle</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Plus size={18} />
                    Create New Batch
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: "Total Batches", value: "4" },
                    { label: "Total SIMs", value: "100" },
                    { label: "Available", value: "40", color: "text-emerald-600" },
                    { label: "Assigned", value: "60", color: "text-blue-600" },
                    { label: "Credited", value: "47", color: "text-purple-600" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={cn("text-xl font-bold text-slate-900", stat.color)}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900 mb-1">Batch Directory</h2>
                    <p className="text-xs text-slate-500">All SIM batches and their current status</p>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-4 py-3">Batch ID</th>
                            <th className="px-4 py-3">Serial Range</th>
                            <th className="px-4 py-3">Date Received</th>
                            <th className="px-4 py-3 text-center">Total</th>
                            <th className="px-4 py-3 text-center text-emerald-600">Avail</th>
                            <th className="px-4 py-3 text-center text-blue-600">Asgn</th>
                            <th className="px-4 py-3 text-center">Reg</th>
                            <th className="px-4 py-3 text-center">Cred</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 w-32">Completion</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {batches.map((batch) => (
                            <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-4 font-bold text-slate-900">{batch.id}</td>
                                <td className="px-4 py-4 text-xs text-slate-600">{batch.serialStart} - {batch.serialEnd}</td>
                                <td className="px-4 py-4 text-slate-500">{batch.date}</td>
                                <td className="px-4 py-4 text-center font-medium">{batch.total}</td>
                                <td className="px-4 py-4 text-center font-medium text-emerald-600">{batch.available}</td>
                                <td className="px-4 py-4 text-center font-medium text-blue-600">{batch.assigned}</td>
                                <td className="px-4 py-4 text-center font-medium">{batch.registered}</td>
                                <td className="px-4 py-4 text-center font-medium">{batch.credited}</td>
                                <td className="px-4 py-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded-full text-[10px] font-bold",
                                        batch.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                                            batch.status === "Partial" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                                    )}>
                                        {batch.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${batch.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600">{batch.progress}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
