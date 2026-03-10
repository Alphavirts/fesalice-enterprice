"use client";

import { useState } from "react";
import { Smartphone, Mail, User, ShieldCheck, ArrowRight, Key, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { handleSignUp, handleVerifyOTP } from "@/lib/auth-actions";
import Link from "next/link";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    password: "",
    otp: ""
  });

  const onSignUp = async () => {
    setLoading(true);
    setError(null);
    const res = await handleSignUp({
      email: method === "email" ? formData.email : undefined,
      phone: method === "phone" ? formData.phone : undefined,
      password: formData.password,
      fullName: formData.fullName
    });
    setLoading(false);
    if (res.error) setError(res.error);
    else setStep(2);
  };

  const onVerify = async () => {
    setLoading(true);
    setError(null);
    const identifier = method === "email" ? formData.email : formData.phone;
    const res = await handleVerifyOTP(identifier, formData.otp, 'signup');
    setLoading(false);
    if (res.error) setError(res.error);
    else setStep(3);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50/50 p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 py-12 relative overflow-hidden"
      >
        {/* Progress header */}
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div 
                key={s} 
                className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    step >= s ? "w-8 bg-blue-600" : "w-4 bg-slate-100"
                )} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                <p className="text-slate-400 text-sm font-medium mt-1">Join Fesalice Distribution Network</p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-2xl mb-4">
                <button
                  onClick={() => setMethod("email")}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                    method === "email" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                  )}
                >
                  Email
                </button>
                <button
                  onClick={() => setMethod("phone")}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                    method === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                  )}
                >
                  Phone
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                    <input
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                    {method === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <div className="relative group">
                    {method === "email" ? (
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                    ) : (
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                    )}
                    <input
                      type={method === "email" ? "email" : "tel"}
                      value={method === "email" ? formData.email : formData.phone}
                      onChange={(e) => setFormData({...formData, [method]: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                      placeholder={method === "email" ? "admin@fesalice.com" : "+254..."}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Password</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold text-center px-2">{error}</p>}

              <button 
                disabled={loading}
                onClick={onSignUp}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Sending OTP..." : "Get Started"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Verify OTP</h1>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  We sent a code to {method === "email" ? formData.email : formData.phone}
                </p>
              </div>

              <input
                maxLength={6}
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                className="w-full tracking-[1em] text-center text-2xl font-black py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 transition-all"
                placeholder="000000"
              />

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <button 
                disabled={loading}
                onClick={onVerify}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all"
              >
                {loading ? "Verifying..." : "Verify & Complete"}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">All set!</h1>
                <p className="text-slate-400 text-sm font-medium mt-1">Your account has been successfully verified.</p>
              </div>
              <Link 
                href="/auth/login"
                className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-wide"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center pt-6 border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium">
            Already have an account? <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
