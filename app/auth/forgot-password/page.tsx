"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import { handleResetRequest } from "@/lib/auth-actions";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await handleResetRequest(email);
    setLoading(false);
    if (res.error) setError(res.error);
    else setSent(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 pt-10"
      >
        <div className="mb-8">
            <Link href="/auth/login" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors gap-1 mb-6">
                <ArrowLeft size={14} />
                Back to Login
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password?</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Enter your email and we'll send you a reset link</p>
        </div>

        {!sent ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fesalice.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5"
            >
              <Send size={16} />
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Send size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Check your inbox</h2>
            <p className="text-slate-500 text-sm font-medium">We've sent a password reset link to <span className="text-slate-900 font-bold">{email}</span></p>
            <button 
                onClick={() => setSent(false)}
                className="text-blue-600 text-sm font-bold hover:underline"
            >
                Didn't receive? Try again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
