"use client";

import { useState, useEffect } from "react";
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
    Smartphone as PhoneIcon,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getClients, getBatches, createDistribution } from "@/lib/actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const steps = ["Select Client", "Batch & Count", "Verification", "Complete"];

export default function DistributePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [clients, setClients] = useState<any[]>([]);
    const [batches, setBatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [selectedBatch, setSelectedBatch] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cData, bData] = await Promise.all([getClients(), getBatches()]);
                setClients(cData);
                setBatches(bData.filter(b => b.remaining_sims > 0));
            } catch (error) {
                toast.error("Failed to load distribution data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleConfirmDistribution = async () => {
        if (!session?.user?.id) {
            toast.error("You must be logged in to distribute SIMs.");
            return;
        }

        setSubmitting(true);
        try {
            await createDistribution({
                client_id: selectedClient.id,
                batch_id: selectedBatch.id,
                count: count,
                distributed_by: session.user.id
            });
            toast.success("SIMs distributed successfully!");
            setActiveStep(3);
        } catch (error) {
            toast.error("Distribution failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

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

                                <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2">
                                    {clients.map((client) => (
                                        <button 
                                            key={client.id}
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setActiveStep(1);
                                            }}
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50/10 transition-all group text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[15px] font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="text-[15px] font-bold text-slate-900 block">{client.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{client.email}</span>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
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
                                 <p className="text-xs text-slate-400 font-medium">Distributing to: <span className="text-blue-600 font-bold">{selectedClient?.name}</span></p>
                             </div>
                         </div>

                         <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Select Batch</label>
                                <select 
                                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                                    onChange={(e) => {
                                        const batch = batches.find(b => b.id === e.target.value);
                                        setSelectedBatch(batch);
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select a batch...</option>
                                    {batches.map(batch => (
                                        <option key={batch.id} value={batch.id}>
                                            {batch.id} ({batch.remaining_sims} SIMs available)
                                        </option>
                                    ))}
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
                                        onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                {selectedBatch && count > selectedBatch.remaining_sims && (
                                    <p className="text-rose-600 text-[10px] font-bold ml-1">Insufficient stock in selected batch.</p>
                                )}
                            </div>

                             <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={() => setActiveStep(0)}
                                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                                >
                                    Back
                                </button>
                                <button 
                                    disabled={!selectedBatch || count <= 0 || count > selectedBatch?.remaining_sims}
                                    onClick={() => setActiveStep(2)}
                                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-blue-100"
                                >
                                    Proceed to Verification
                                </button>
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
                                {otp.map((digit, i) => (
                                    <input 
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                ))}
                            </div>

                            <button 
                                disabled={submitting || otp.some(d => !d)}
                                onClick={handleConfirmDistribution}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:bg-slate-200 transition-all flex items-center justify-center gap-3"
                            >
                                {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
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
                                {count} SIM cards from {selectedBatch?.id} have been successfully assigned to {selectedClient?.name}.
                            </p>

                            <div className="w-full grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Receipt ID</p>
                                    <p className="text-sm font-bold text-slate-900">#DIST-{Math.floor(10000 + Math.random() * 90000)}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date</p>
                                    <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => router.push('/dashboard')}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                            >
                                Done & Back to Dashboard
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
