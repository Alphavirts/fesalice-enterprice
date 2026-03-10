"use client";

import { useState, useEffect } from "react";
import { 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    AlertCircle,
    MoreHorizontal,
    ChevronRight,
    CheckCircle2,
    Clock,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getBatches, createBatch } from "@/lib/actions";
import { toast } from "sonner";

export default function BatchesPage() {
    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newBatch, setNewBatch] = useState({ id: "", total_sims: 0 });

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const data = await getBatches();
            setBatches(data);
        } catch (error) {
            toast.error("Failed to load batches.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const handleAddBatch = async () => {
        if (!newBatch.id || newBatch.total_sims <= 0) {
            toast.error("Please provide valid batch details.");
            return;
        }
        try {
            await createBatch(newBatch);
            toast.success("Batch received successfully!");
            setIsAdding(false);
            setNewBatch({ id: "", total_sims: 0 });
            fetchBatches();
        } catch (error) {
            toast.error("Failed to add batch.");
        }
    };

    const lowStockCount = batches.filter(b => b.remaining_sims < 10).length;

    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SIM Batches</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage and track all SIM batches in inventory</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5"
                >
                    <Plus size={18} />
                    Receive New Batch
                </button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Receive New Batch</h3>
                        <div className="space-y-4 mb-8">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Batch ID</label>
                                <input 
                                    value={newBatch.id}
                                    onChange={(e) => setNewBatch({...newBatch, id: e.target.value})}
                                    placeholder="e.g. BATCH-005"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 transition-all text-sm font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Total SIMs</label>
                                <input 
                                    type="number"
                                    value={newBatch.total_sims || ""}
                                    onChange={(e) => setNewBatch({...newBatch, total_sims: parseInt(e.target.value) || 0})}
                                    placeholder="e.g. 50"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsAdding(false)}
                                className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddBatch}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {lowStockCount > 0 && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-rose-900">Low Stock Alert</h4>
                        <p className="text-rose-700 text-xs font-medium mt-0.5">{lowStockCount} batch(es) have less than 10 SIMs remaining</p>
                    </div>
                </div>
            )}

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
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading inventory...
                                    </td>
                                </tr>
                            ) : batches.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">No batches found.</td>
                                </tr>
                            ) : batches.map((batch) => (
                                <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-[13px] font-bold text-slate-900">{batch.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" />
                                            <span className="text-[13px] font-medium text-slate-600">{new Date(batch.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{batch.total_sims}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "text-[13px] font-bold",
                                            batch.remaining_sims < 10 ? "text-rose-600" : "text-slate-900"
                                        )}>
                                            {batch.remaining_sims}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[11px] font-bold",
                                            batch.status === 'Full' ? "text-emerald-600 bg-emerald-50" : 
                                            batch.status === 'Critical' ? "text-rose-600 bg-rose-50" : "text-blue-600 bg-blue-50"
                                        )}>
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
