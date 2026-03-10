"use client";

import { 
    Search, 
    Filter, 
    Clock, 
    User, 
    ArrowRight, 
    Package, 
    Users, 
    Send,
    Smartphone,
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
    { 
        id: "LOG-001", 
        user: "mugofredrick919", 
        action: "Distributed SIMs", 
        details: "Assigned 50 SIMs to Acme Distribution from BATCH-001", 
        time: "Mar 10, 2:57 PM",
        icon: Send,
        iconColor: "text-blue-600 bg-blue-50"
    },
    { 
        id: "LOG-002", 
        user: "mugofredrick919", 
        action: "Received Batch", 
        details: "Added BATCH-004 with 50 SIM cards", 
        time: "Mar 08, 4:45 PM",
        icon: Package,
        iconColor: "text-emerald-600 bg-emerald-50"
    },
    { 
        id: "LOG-003", 
        user: "admin_test", 
        action: "Registered Client", 
        details: "Added new client 'TechLine Ventures'", 
        time: "Mar 05, 11:20 AM",
        icon: Users,
        iconColor: "text-purple-600 bg-purple-50"
    },
    { 
        id: "LOG-004", 
        user: "mugofredrick919", 
        action: "Login Success", 
        details: "Administrative login from 192.168.1.1", 
        time: "Mar 01, 9:00 AM",
        icon: ShieldCheck,
        iconColor: "text-slate-600 bg-slate-50"
    },
];

export default function ActivityLogsPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Activity Logs</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Audit trail of all actions performed in the system</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search logs..."
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all w-80"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-all">
                            <Filter size={16} />
                            Filter by Action
                        </button>
                    </div>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Export CSV</button>
                </div>

                <div className="divide-y divide-slate-50">
                    {logs.map((log) => (
                        <div key={log.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors group">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", log.iconColor)}>
                                <log.icon size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-[15px] font-bold text-slate-900 leading-tight">
                                        {log.action}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                        <Clock size={12} />
                                        {log.time}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">{log.details}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                                        {log.user.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400">BY {log.user.toUpperCase()}</span>
                                    <span className="text-[10px] text-slate-300">•</span>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{log.id}</span>
                                </div>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={18} className="text-slate-300" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-slate-50/20 border-t border-slate-50 text-center">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors py-2 px-8 border border-slate-200 rounded-xl hover:bg-white bg-white/50">
                        Load More Activity
                    </button>
                </div>
            </div>
        </div>
    );
}
