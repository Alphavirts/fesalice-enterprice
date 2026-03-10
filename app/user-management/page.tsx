"use client";

import { useState, useEffect } from "react";
import { 
    Plus, 
    Search, 
    Shield, 
    User, 
    MoreVertical, 
    Mail, 
    Phone,
    Lock,
    Edit2,
    Trash2,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUsers } from "@/lib/actions";
import { toast } from "sonner";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                toast.error("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Control access and manage system administrators</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5">
                    <Plus size={18} />
                    Add System User
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <div className="relative group flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find users by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {loading ? (
                        <div className="p-20 flex items-center justify-center text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-20 text-center text-slate-400 italic">No users found.</div>
                    ) : users.map((user) => (
                        <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50/30 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-100">
                                    {user.full_name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                                        {user.full_name || user.email}
                                        {user.role === "Administrator" && <Shield size={14} className="text-blue-600" />}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                                        <span className="text-slate-500 font-bold">{user.role || 'Operator'}</span>
                                        <span className="text-slate-200">•</span>
                                        <div className="flex items-center gap-1">
                                            <Mail size={12} />
                                            {user.email}
                                        </div>
                                        {user.phone_number && (
                                            <>
                                                <span className="text-slate-200">•</span>
                                                <div className="flex items-center gap-1">
                                                    <Phone size={12} />
                                                    {user.phone_number}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                    user.is_verified ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-100"
                                )}>
                                    {user.is_verified ? "Verified" : "Pending"}
                                </span>
                                
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
