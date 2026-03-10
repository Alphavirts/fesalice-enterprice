"use client";

import { useState, useEffect } from "react";
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
    Smartphone,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getClients } from "@/lib/actions";
import { toast } from "sonner";

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                toast.error("Failed to load clients.");
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

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

            {loading ? (
                <div className="flex items-center justify-center p-20 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : clients.length === 0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-slate-100 italic text-slate-400">
                    No clients found. Register your first client to get started.
                </div>
            ) : (
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
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            client.status === 'Active' ? "text-emerald-600 bg-emerald-50" : "text-slate-500 bg-slate-50"
                                        )}>
                                            {client.status || 'Active'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold">{client.id.slice(0, 8)}</span>
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
                                {client.distributed_sims && (
                                    <div className="flex items-center gap-3 text-slate-500 group/item">
                                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover/item:text-emerald-600 transition-colors">
                                            <Smartphone size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{client.distributed_sims} SIMs Distributed</span>
                                    </div>
                                )}
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
            )}
        </div>
    );
}
