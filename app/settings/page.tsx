"use client";

import { 
    User, 
    Bell, 
    Shield, 
    Smartphone, 
    Database, 
    Globe, 
    Moon, 
    HelpCircle,
    ChevronRight,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-500 text-sm font-medium mt-1">Configure system preferences and security protocols</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation */}
                <div className="space-y-2">
                    {[
                        { icon: User, label: "Profile Information", active: true },
                        { icon: Bell, label: "Notification Preferences", active: false },
                        { icon: Shield, label: "Security & Access", active: false },
                        { icon: Smartphone, label: "SIM Distribution Rules", active: false },
                        { icon: Database, label: "Database & Sync", active: false },
                        { icon: Globe, label: "Regional Settings", active: false },
                    ].map((item, i) => (
                        <button 
                            key={i}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm",
                                item.active 
                                    ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} />
                                {item.label}
                            </div>
                            <ChevronRight size={16} className={cn(item.active ? "opacity-100" : "opacity-0")} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 space-y-8 pb-12">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-8">Profile Information</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-100">
                                    MU
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                                        Upload New Avatar
                                    </button>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Max 2MB • JPG or PNG</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue="Mugo Fredrick"
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Username</label>
                                    <input 
                                        type="text" 
                                        defaultValue="mugofredrick919"
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        defaultValue="mugofredrick919@gmail.com"
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 font-bold">Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                                        <Moon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Dark Mode</p>
                                        <p className="text-xs text-slate-400 font-medium tracking-tight">Switch to a darker interface for night use</p>
                                    </div>
                                </div>
                                <div className="w-12 h-6 bg-slate-200 rounded-full p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                                        <Bell size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Push Notifications</p>
                                        <p className="text-xs text-slate-400 font-medium tracking-tight">Receive alerts for low stock and distributions</p>
                                    </div>
                                </div>
                                <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer flex justify-end">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                            Discard Changes
                        </button>
                        <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
                            <Save size={18} />
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
