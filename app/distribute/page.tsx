"use client";

import { useState } from "react";
import { 
    Send, 
    Search, 
    ArrowRight, 
    CheckCircle2, 
    ShieldCheck, 
    Smartphone, 
    ChevronRight,
    Users,
    Package,
    Key,
    Smartphone as PhoneIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Select Client", "Batch & Count", "Verification", "Complete"];

export default function DistributePage() {
    const [activeStep, setActiveStep] = useState(0);
    const [otp, setOtp] = useState("");

    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Distribute SIMs</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Guided workflow to assign SIMs to distribution clients</p>
                </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
                {steps.map((step, idx) => (
                    <div key={step} className="flex-1 flex items-center gap-3">
                        <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                            activeStep >= idx ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400"
                        )}>
                            {activeStep > idx ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        <span className={cn(
                            "text-xs font-bold tracking-tight",
                            activeStep >= idx ? "text-slate-900" : "text-slate-400"
                        )}>
                            {step}
                        </span>
                        {idx < steps.length - 1 && <ChevronRight size={14} className="text-slate-200 ml-auto" />}
                    </div>
                ))}
            </div>

            {/* Content area */}
            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                        <motion.div 
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Select distribution client</h2>
                                    <p className="text-xs text-slate-400 font-medium">Search for a registered client to begin</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name or client ID..."
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {["Acme Distribution", "Global Connect Ltd", "TechLine Ventures"].map((client) => (
                                        <button 
                                            key={client}
                                            onClick={() => setActiveStep(1)}
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[15px] font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {client.charAt(0)}
                                                </div>
                                                <span className="text-[15px] font-bold text-slate-900">{client}</span>
                                            </div>
                                            <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeStep === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-10 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-6 shadow-lg shadow-emerald-50">
                                <Key size={32} />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">OTP Confirmation Required</h2>
                            <p className="text-sm text-slate-500 font-medium max-w-sm mb-8">
                                A 6-digit verification code has been sent to the client's registered phone number for security.
                            </p>

                            <div className="flex gap-3 mb-8">
                                {[1,2,3,4,5,6].map((i) => (
                                    <input 
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={() => setActiveStep(3)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                            >
                                Confirm Distribution
                            </button>
                            
                            <button className="mt-6 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                Resend Code (45s)
                            </button>
                        </motion.div>
                    )}

                    {activeStep === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-10 flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-200">
                                <CheckCircle2 size={48} />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Distribution Successful!</h2>
                            <p className="text-sm text-slate-500 font-medium max-w-sm mb-10">
                                50 SIM cards from BATCH-001 have been successfully assigned to Acme Distribution.
                            </p>

                            <div className="w-full grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Receipt ID</p>
                                    <p className="text-sm font-bold text-slate-900">#DIST-38291</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date</p>
                                    <p className="text-sm font-bold text-slate-900">Mar 10, 2:57 PM</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => setActiveStep(0)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                            >
                                Done & Back to Dashboard
                            </button>
                        </motion.div>
                    )}
                    
                    {activeStep === 1 && (
                         <motion.div 
                         key="step1"
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-10"
                     >
                         <div className="flex items-center gap-4 mb-8">
                             <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                 <Package size={24} />
                             </div>
                             <div>
                                 <h2 className="text-xl font-bold text-slate-900">Batch selection & Quantity</h2>
                                 <p className="text-xs text-slate-400 font-medium">Select source batch and specify count</p>
                             </div>
                         </div>

                         <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Select Batch</label>
                                <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all appearance-none cursor-pointer">
                                    <option>BATCH-001 (15 SIMs remaining)</option>
                                    <option>BATCH-002 (25 SIMs remaining)</option>
                                    <option>BATCH-004 (20 SIMs remaining)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Distribution Count</label>
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input 
                                        type="number" 
                                        placeholder="Enter amount..."
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                </div>
                            </div>

                             <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={() => setActiveStep(0)}
                                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => setActiveStep(2)}
                                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    Proceed to Verification
                                </button>
                             </div>
                         </div>
                     </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
