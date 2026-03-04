"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Layers,
    Smartphone,
    UserPlus,
    ClipboardCheck,
    CreditCard,
    BarChart3,
    Gift,
    FileText,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Global Dashboard", href: "/dashboard" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Layers, label: "SIM Batches", href: "/batches" },
    { icon: Smartphone, label: "SIM Inventory", href: "/inventory" },
    { icon: UserPlus, label: "Assignments", href: "/assignments" },
    { icon: ClipboardCheck, label: "Registration Tracking", href: "/tracking" },
    { icon: CreditCard, label: "Credit Monitoring", href: "/credit" },
    { icon: BarChart3, label: "Performance Analytics", href: "/analytics" },
    { icon: Gift, label: "Commission & Incentives", href: "/incentives" },
    { icon: FileText, label: "Reports Center", href: "/reports" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-[#0F172A] text-white flex flex-col border-r border-slate-800">
            <div className="p-6 flex items-center gap-3">
                <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-900/40 border border-blue-400/20"
                >
                    FT
                </motion.div>
                <div>
                    <h1 className="text-sm font-bold tracking-tight">Fesaalice Telecom</h1>
                    <p className="text-[10px] text-slate-400 font-medium">Line Management v1.2</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2 custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                                isActive
                                    ? "text-white font-semibold"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-menu"
                                    className="absolute inset-0 bg-blue-600 rounded-xl shadow-md shadow-blue-900/20"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <item.icon size={18} className={cn("relative z-10 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                            <span className="relative z-10">{item.label}</span>

                            {!isActive && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    className="absolute right-3 w-1 h-1 bg-blue-400 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800/60 bg-slate-900/30">
                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-colors group border border-transparent hover:border-slate-700/50">
                    <div className="relative">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-800 group-hover:border-slate-600 transition-all">
                            SA
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0F172A] rounded-full shadow-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">Super Admin</p>
                        <p className="text-[10px] text-slate-500 truncate font-medium tracking-tight">admin@fesaalice.com</p>
                    </div>
                    <LogOut size={16} className="text-slate-500 group-hover:text-rose-400 transition-colors" />
                </div>
            </div>
        </div>
    );
}
