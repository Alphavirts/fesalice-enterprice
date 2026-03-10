"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Layers,
    Send,
    Users,
    Activity,
    FileBarChart,
    UserCircle,
    Settings,
    Moon,
    LogOut,
    HelpCircle,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Layers, label: "Batches", href: "/batches" },
    { icon: Send, label: "Distribute SIMs", href: "/distribute" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Activity, label: "Activity Logs", href: "/activity-logs" },
    { icon: FileBarChart, label: "Reports", href: "/reports" },
    { icon: UserCircle, label: "User Management", href: "/user-management" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-white text-slate-900 flex flex-col border-r border-slate-100">
            <div className="p-6 flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <Layers className="text-white" size={20} />
                    </div>
                    <span className="text-lg font-bold tracking-tight">Fesalice</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                    <Moon size={18} className="cursor-pointer hover:text-slate-900 transition-colors" />
                    <LogOut size={18} className="cursor-pointer hover:text-slate-900 transition-colors" />
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-50">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                        MU
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-slate-900 truncate">mugofredrick919</p>
                        <p className="text-[11px] text-slate-500 font-medium truncate">Administrator</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between px-2">
                   <HelpCircle size={18} className="text-slate-400 cursor-pointer hover:text-slate-900" />
                   <Bell size={18} className="text-slate-400 cursor-pointer hover:text-slate-900" />
                </div>
            </div>
            
            <div className="absolute bottom-6 right-6">
                 <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                    <span className="text-white text-sm font-bold">?</span>
                 </div>
            </div>
        </div>
    );
}
