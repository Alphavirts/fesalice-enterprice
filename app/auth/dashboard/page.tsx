import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { User, ShieldCheck, Mail, LayoutDashboard } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-10 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm font-medium">Fesalice Enterprise Management</p>
            </div>
          </div>
          <LogoutButton />
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Welcome Back!</h2>
            <p className="text-slate-500">You are securely logged into the administrative portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-bold text-slate-700">{session.user?.email}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                <p className="text-sm font-bold text-slate-700 capitalize">Administrator</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900">Verified Access</h3>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                Your session is authenticated via NextAuth and Supabase. You have full access to manage clients, SIM batches, and distribution logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
