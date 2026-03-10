"use client";

import { 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    AlertCircle,
    MoreHorizontal,
    ChevronRight,
    CheckCircle2,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const batches = [
    { 
        id: "BATCH-001", 
        date: "Mar 01, 2026 10:00", 
        total: 25, 
        remaining: 15, 
        status: "In Use",
        statusColor: "text-blue-600 bg-blue-50"
    },
    { 
        id: "BATCH-002", 
        date: "Mar 03, 2026 14:30", 
        total: 25, 
        remaining: 25, 
        status: "Full",
        statusColor: "text-emerald-600 bg-emerald-50"
    },
    { 
        id: "BATCH-003", 
        date: "Mar 05, 2026 09:15", 
        total: 20, 
        remaining: 5, 
        status: "Critical",
        statusColor: "text-rose-600 bg-rose-50"
    },
    { 
        id: "BATCH-004", 
        date: "Mar 08, 2026 16:45", 
        total: 50, 
        remaining: 20, 
        status: "In Use",
        statusColor: "text-blue-600 bg-blue-50"
    },
];

export default function BatchesPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SIM Batches</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage and track all SIM batches in inventory</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5">
                    <Plus size={18} />
                    Receive New Batch
                </button>
            </div>

            {/* Alerts */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
                <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-rose-900">Low Stock Alert</h4>
                    <p className="text-rose-700 text-xs font-medium mt-0.5">1 batch(es) have less than 10 SIMs remaining</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900">All Batches</h3>
                    <div className="flex gap-2">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search batches..."
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all w-64"
                            />
                        </div>
                        <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Batch ID</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date Received</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total SIMs</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Remaining SIMs</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {batches.map((batch) => (
                                <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-[13px] font-bold text-slate-900">{batch.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" />
                                            <span className="text-[13px] font-medium text-slate-600">{batch.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{batch.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "text-[13px] font-bold",
                                            batch.remaining < 10 ? "text-rose-600" : "text-slate-900"
                                        )}>
                                            {batch.remaining}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold", batch.statusColor)}>
                                            {batch.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all">
                                            <Eye size={14} />
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <p className="text-xs text-slate-400 font-medium">Showing {batches.length} batches</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
