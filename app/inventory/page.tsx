import { Download, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const inventory = [
    { serial: "254701000001", batch: "B001", status: "Credited", client: "CL001", dateAsgn: "2/16/2024", dateReg: "2/18/2024", credit: "50 KSH", creditDate: "2/20/2024" },
    { serial: "254701000002", batch: "B001", status: "Registered", client: "CL001", dateAsgn: "2/16/2024", dateReg: "2/19/2024", credit: "0 KSH", creditDate: "-" },
    { serial: "254701000026", batch: "B002", status: "Assigned", client: "CL002", dateAsgn: "2/21/2024", dateReg: "-", credit: "0 KSH", creditDate: "-" },
];

export default function InventoryPage() {
    return (
        <div className="p-8 space-y-6 h-screen overflow-y-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">SIM Inventory</h1>
                    <p className="text-slate-500 text-sm">Complete inventory tracking for all SIM cards</p>
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download size={18} />
                    Export Inventory
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: "Total SIMs", value: "25" },
                    { label: "Available", value: "0", sub: "0.0%", color: "text-emerald-600" },
                    { label: "Assigned", value: "1", sub: "4.0%", color: "text-blue-600" },
                    { label: "Registered", value: "2", sub: "8.0%", color: "text-purple-600" },
                    { label: "Credited", value: "22", sub: "88.0%", color: "text-indigo-600" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={cn("text-xl font-bold text-slate-900", stat.color)}>{stat.value}</p>
                        {stat.sub && <p className="text-[10px] text-slate-400">{stat.sub}</p>}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by serial number or batch..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50">
                        <Filter size={16} />
                        All Status
                    </button>
                </div>

                <table className="w-full text-left text-sm whitespace-nowrap overflow-x-auto">
                    <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-3">Serial Number</th>
                            <th className="px-4 py-3">Batch ID</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Assigned Client</th>
                            <th className="px-4 py-3">Date Assigned</th>
                            <th className="px-4 py-3">Date Registered</th>
                            <th className="px-4 py-3">First Credit</th>
                            <th className="px-4 py-3">Credit Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {inventory.map((item) => (
                            <tr key={item.serial} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-4 font-medium text-slate-700">{item.serial}</td>
                                <td className="px-4 py-4 text-slate-600 font-bold">{item.batch}</td>
                                <td className="px-4 py-4">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                                        item.status === "Credited" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                            item.status === "Registered" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                                "bg-blue-50 text-blue-600 border border-blue-100"
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 font-bold text-slate-700">{item.client}</td>
                                <td className="px-4 py-4 text-slate-500 text-xs">{item.dateAsgn}</td>
                                <td className="px-4 py-4 text-slate-500 text-xs">{item.dateReg}</td>
                                <td className="px-4 py-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded font-bold text-xs",
                                        item.credit !== "0 KSH" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {item.credit}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-slate-500 text-xs">{item.creditDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
