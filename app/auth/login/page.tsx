"use client";

import { useState } from "react";
import { Smartphone, Lock, Mail, ShieldCheck, Key, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [role, setRole] = useState<"admin" | "user">("admin");
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 pt-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
            <Smartphone className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fesalice Enterprise</h1>
          <p className="text-slate-500 text-sm font-medium">SIM Distribution System</p>
        </div>

        {/* Toggles */}
        <div className="space-y-4 mb-8">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setRole("admin")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all",
                role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ShieldCheck className={cn("w-4 h-4", role === "admin" ? "text-blue-600" : "text-slate-400")} />
              Admin
            </button>
            <button
              onClick={() => setRole("user")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                role === "user" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              User
            </button>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setAuthMethod("password")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                authMethod === "password" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Password
            </button>
            <button
              onClick={() => setAuthMethod("otp")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                authMethod === "otp" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              OTP
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fesalice.com"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-700">
                {authMethod === "password" ? "Password" : "OTP Code"}
              </label>
              {authMethod === "password" && (
                <Link href="/auth/forgot-password" className="text-[11px] font-bold text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                {authMethod === "password" ? <Lock className="w-4 h-4" /> : <Key className="w-4 h-4" />}
              </div>
              <input
                type={authMethod === "password" ? "password" : "text"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={authMethod === "password" ? "••••••••" : "Enter 6-digit OTP"}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-wide hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-black/10 mt-2 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging in..." : `Login as ${role === "admin" ? "Admin" : "User"}`}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-50 space-y-4">
            <p className="text-xs text-slate-400 font-medium">
                Don't have an account? <Link href="/auth/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link>
            </p>
            <p className="text-[10px] text-slate-300 font-medium tracking-tight">
                © 2026 Fesalice Enterprise. All rights reserved.
            </p>
        </div>
      </motion.div>
    </div>
  );
}
