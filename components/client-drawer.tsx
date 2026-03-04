"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Target, AlertTriangle, ShieldCheck, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ClientDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    client?: any;
}

export function ClientDrawer({ isOpen, onClose, client }: ClientDrawerProps) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call for "premium" feel (smoothness)
        await new Promise(resolve => setTimeout(resolve, 1200));

        setIsSaving(false);
        toast.success(client ? "Changes saved successfully" : "Client created successfully", {
            description: client ? `${client.name}'s profile has been updated.` : "The new client has been added to your portfolio.",
            duration: 4000,
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60]"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {client ? "Update Profile" : "New Client Onboarding"}
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 font-medium">
                                    {client ? `Modifying settings for ${client.name}` : "Enter details to create a new client record."}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600 active:scale-90 border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-900 mb-2">
                                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600 shadow-sm shadow-blue-100">
                                        <User size={16} />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Identity Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1">Legal Name</label>
                                        <input
                                            type="text"
                                            defaultValue={client?.name}
                                            placeholder="e.g. Grace Njeri"
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1">Contact Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" size={16} />
                                            <input
                                                type="tel"
                                                defaultValue={client?.phone}
                                                placeholder="2547XXXXXXXX"
                                                required
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-900 mb-2">
                                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 shadow-sm shadow-emerald-100">
                                        <Target size={16} />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Operational Targets</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Assigned</label>
                                        <input type="number" defaultValue={client?.assigned} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none transition-all focus:ring-4 focus:ring-blue-500/5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Registed</label>
                                        <input type="number" defaultValue={client?.registered} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none transition-all focus:ring-4 focus:ring-blue-500/5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Credited</label>
                                        <input type="number" defaultValue={client?.credited} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none transition-all focus:ring-4 focus:ring-blue-500/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Risk & Compliance */}
                            <div className="space-y-4 pb-4">
                                <div className="flex items-center gap-2 text-slate-900 mb-2">
                                    <div className="p-2 bg-amber-50 rounded-xl text-amber-600 shadow-sm shadow-amber-100">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Compliance & Risk</h3>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Assigned Support Tier</label>
                                    <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                                        {['A', 'B', 'C', 'D'].map((grade) => (
                                            <button
                                                key={grade}
                                                type="button"
                                                className={cn(
                                                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                                                    (client?.grade === grade || (!client && grade === 'A'))
                                                        ? "bg-white border-none text-blue-600 shadow-sm"
                                                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                                                )}
                                            >
                                                Grade {grade}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex gap-4 items-start shadow-lg">
                                        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-[11px] text-white font-bold">Automatic Risk Trigger</p>
                                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                                Grades C and D will automatically flag the client as "At Risk" in the dashboard.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white transition-all active:scale-95 hover:border-slate-300"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex-[2] px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="group-hover:scale-110 transition-transform" />
                                        {client ? "Update Record" : "Register Client"}
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
