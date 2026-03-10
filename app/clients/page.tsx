"use client";

import { 
    Plus, 
    Search, 
    Filter, 
    Mail, 
    Phone,
    MapPin,
    MoreHorizontal,
    ExternalLink,
    ShieldCheck,
    Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

const clients = [
    { 
        id: "CLI-001", 
        name: "Acme Distribution", 
        email: "contact@acme.com", 
        phone: "+254 700 000 001", 
        sims: 124,
        status: "Active",
        statusColor: "text-emerald-600 bg-emerald-50"
    },
    { 
        id: "CLI-002", 
        name: "Global Connect Ltd", 
        email: "info@globalconnect.co.ke", 
        phone: "+254 700 000 002", 
        sims: 86,
        status: "Active",
        statusColor: "text-emerald-600 bg-emerald-50"
    },
    { 
        id: "CLI-003", 
        name: "TechLine Ventures", 
        email: "sales@techline.io", 
        phone: "+254 700 000 003", 
        sims: 43,
        status: "Inactive",
        statusColor: "text-slate-500 bg-slate-50"
    },
];

export default function ClientsPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clients</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage all registered SIM distribution clients</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5">
                    <Plus size={18} />
                    Register New Client
                </button>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div key={client.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <MoreHorizontal size={18} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-100 transition-transform group-hover:scale-110">
                                {client.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-slate-900">{client.name}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", client.statusColor)}>
                                        {client.status}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">{client.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-slate-500 group/item">
                                <div className="p-1.5 bg-slate-50 rounded-lg group-hover/item:text-blue-600 transition-colors">
                                    <Mail size={14} />
                                </div>
                                <span className="text-xs font-medium">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 group/item">
                                <div className="p-1.5 bg-slate-50 rounded-lg group-hover/item:text-blue-600 transition-colors">
                                    <Phone size={14} />
                                </div>
                                <span className="text-xs font-medium">{client.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 group/item">
                                <div className="p-1.5 bg-slate-50 rounded-lg group-hover/item:text-emerald-600 transition-colors">
                                    <Smartphone size={14} />
                                </div>
                                <span className="text-xs font-bold text-slate-700">{client.sims} SIMs Distributed</span>
                            </div>
                        </div>

                        <div className="flex gap-2 border-t border-slate-50 pt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                                <ExternalLink size={14} />
                                Details
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                                <Smartphone size={14} />
                                Distribute
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
