"use client";

import { useState, useEffect } from "react";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { handleUpdatePassword } from "@/lib/auth-actions";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Supabase handles the session via the recovery link automatically
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUserId(session.user.id);
      else setError("Your reset link is invalid or has expired.");
    };
    getSession();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!userId) {
       setError("Session lost. Please request a new reset link.");
       return;
    }

    setLoading(true);
    setError(null);
    const res = await handleUpdatePassword(userId, password);
    setLoading(false);
    
    if (res.error) setError(res.error);
    else setSuccess(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 pt-10"
      >
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Set New Password</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Please enter a secure password you haven't used before</p>
        </div>

        {!success ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                    <div className="relative group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600" />
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-xs font-bold animate-shake">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <button 
              type="submit"
              disabled={loading || !userId}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-black/5"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Password Updated</h2>
            <p className="text-slate-500 text-sm font-medium">Your password has been changed successfully. You can now log in with your new credentials.</p>
            <Link 
                href="/auth/login"
                className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm tracking-wide mt-4"
            >
                Login Now
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
