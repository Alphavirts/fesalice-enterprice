"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Filter, MoreHorizontal, AlertCircle, TrendingUp, TrendingDown, CheckCircle2, UserX, Edit3, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ClientDrawer } from "@/components/client-drawer";
import { toast } from "sonner";

const clientsData = [
    { id: "CL001", name: "Grace Njeri", phone: "254701234567", assigned: 120, registered: 115, credited: 110, compliance: 96, grade: "A", status: "Active" },
    { id: "CL002", name: "John Kamau", phone: "254722987654", assigned: 150, registered: 142, credited: 135, compliance: 95, grade: "A", status: "Active" },
    { id: "CL003", name: "Sarah Otieno", phone: "254711556677", assigned: 80, registered: 50, credited: 45, compliance: 62, grade: "C", status: "At Risk" },
    { id: "CL004", name: "David Mwangi", phone: "254733112233", assigned: 200, registered: 198, credited: 195, compliance: 99, grade: "A", status: "Active" },
    { id: "CL005", name: "Mercy Wambui", phone: "254744556677", assigned: 60, registered: 40, credited: 35, compliance: 58, grade: "D", status: "At Risk" },
];

const Skeleton = ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-slate-200 rounded", className)} />
);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({ key: "name", direction: "asc" });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const openDrawer = (client?: any) => {
        setSelectedClient(client || null);
        setIsDrawerOpen(true);
    };

    const sortedAndFilteredClients = useMemo(() => {
        let result = clientsData.filter(client => {
            const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.phone.includes(searchQuery);
            const matchesStatus = statusFilter ? client.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });

        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof typeof a];
                const bValue = b[sortConfig.key as keyof typeof b];

                if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [searchQuery, statusFilter, sortConfig]);

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (!sortConfig || sortConfig.key !== columnKey) return <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />;
        return sortConfig.direction === "asc" ? <TrendingUp size={14} className="text-blue-500" /> : <TrendingDown size={14} className="text-blue-500" />;
    };

    const stats = [
        { label: "Total Clients", value: "8", sub: "Active registrations", icon: CheckCircle2, filter: null },
        { label: "Active Clients", value: "5", sub: "63% of total", icon: TrendingUp, filter: "Active", color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "At Risk", value: "3", sub: "Requires attention", icon: AlertCircle, filter: "At Risk", color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Avg Compliance", value: "84.1%", sub: "Across all clients", icon: TrendingDown, filter: null },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-6 h-screen overflow-y-auto bg-slate-50/50 custom-scrollbar"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Client Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor performance, compliance, and risk levels in real-time.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
                    >
                        <AlertCircle size={16} className="text-blue-500" />
                        AI Insights
                    </button>
                    <button
                        onClick={() => openDrawer()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all text-sm font-semibold shadow-md shadow-blue-200 active:scale-95 hover:translate-y-[-1px]"
                    >
                        <Plus size={18} />
                        Add New Client
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isAiPanelOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4 items-start shadow-sm border-l-4 border-l-blue-500">
                            <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                                <AlertCircle size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-blue-900">AI Intelligence Report</h3>
                                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                    Compliance for <span className="font-bold">Sarah Otieno</span> has dropped by 12% this week.
                                    We recommend reviewing her recent credit monitoring logs to prevent further risk escalation.
                                </p>
                            </div>
                            <button onClick={() => setIsAiPanelOpen(false)} className="text-blue-400 hover:text-blue-600 transition-colors p-1">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    isLoading ? (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="w-20 h-3" />
                                <Skeleton className="w-5 h-5 rounded-full" />
                            </div>
                            <Skeleton className="w-12 h-8" />
                            <Skeleton className="w-24 h-3" />
                        </div>
                    ) : (
                        <button
                            key={stat.label}
                            onClick={() => stat.filter !== undefined && setStatusFilter(stat.filter)}
                            className={cn(
                                "text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden",
                                statusFilter === stat.filter
                                    ? "bg-white border-blue-400 shadow-md ring-2 ring-blue-50"
                                    : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm"
                            )}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                                <stat.icon size={18} className={cn("transition-colors", stat.color || "text-slate-400")} />
                            </div>
                            <p className={cn("text-2xl font-bold tracking-tight", stat.color || "text-slate-900")}>{stat.value}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{stat.sub}</p>

                            {stat.filter !== undefined && (
                                <div className={cn(
                                    "absolute bottom-0 left-0 w-full h-1 transition-transform duration-300",
                                    statusFilter === stat.filter ? "scale-x-100 bg-blue-500" : "scale-x-0 bg-blue-200 group-hover:scale-x-100"
                                )} />
                            )}
                        </button>
                    )
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/10">
                    <div className="flex-1 relative group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or phone..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        {statusFilter && (
                            <button
                                onClick={() => {
                                    setStatusFilter(null);
                                    toast.info("Filter cleared");
                                }}
                                className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                        <button className="px-4 py-2 border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white shadow-sm">
                            <Filter size={16} />
                            {statusFilter || "All Status"}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 cursor-pointer group hover:text-blue-600 transition-colors" onClick={() => handleSort("name")}>
                                    <div className="flex items-center gap-2">
                                        Client Name
                                        <SortIcon columnKey="name" />
                                    </div>
                                </th>
                                <th className="px-6 py-4">Phone Number</th>
                                <th className="px-6 py-4 text-center cursor-pointer group hover:text-blue-600 transition-colors" onClick={() => handleSort("assigned")}>
                                    <div className="flex items-center justify-center gap-2">
                                        Assigned
                                        <SortIcon columnKey="assigned" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center cursor-pointer group hover:text-blue-600 transition-colors" onClick={() => handleSort("registered")}>
                                    <div className="flex items-center justify-center gap-2">
                                        Registered
                                        <SortIcon columnKey="registered" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center cursor-pointer group hover:text-blue-600 transition-colors" onClick={() => handleSort("credited")}>
                                    <div className="flex items-center justify-center gap-2">
                                        Credited
                                        <SortIcon columnKey="credited" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer group hover:text-blue-600 transition-colors" onClick={() => handleSort("compliance")}>
                                    <div className="flex items-center gap-2">
                                        Compliance
                                        <SortIcon columnKey="compliance" />
                                    </div>
                                </th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate={isLoading ? "hidden" : "visible"}
                            className="divide-y divide-slate-100"
                        >
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4"><Skeleton className="w-32 h-4" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-24 h-4" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-10 h-4 mx-auto" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-10 h-4 mx-auto" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-10 h-4 mx-auto" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-16 h-4" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-20 h-6 rounded-full" /></td>
                                        <td className="px-6 py-4"><Skeleton className="w-8 h-8 rounded-lg float-right" /></td>
                                    </tr>
                                ))
                            ) : sortedAndFilteredClients.length > 0 ? (
                                sortedAndFilteredClients.map((client) => (
                                    <motion.tr
                                        key={client.id}
                                        variants={itemVariants}
                                        className="hover:bg-slate-50/80 transition-all group"
                                    >
                                        <td className="px-6 py-4 font-semibold text-slate-900">{client.name}</td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">{client.phone}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{client.assigned}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{client.registered}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{client.credited}</td>
                                        <td className="px-6 py-4 border-l border-transparent group-hover:border-blue-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${client.compliance}%` }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-500",
                                                            client.compliance >= 90 ? "bg-emerald-500" : client.compliance >= 70 ? "bg-amber-500" : "bg-rose-500"
                                                        )}
                                                    />
                                                </div>
                                                <span className="font-bold text-slate-700 min-w-[40px] tracking-tight">{client.compliance}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5",
                                                client.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                            )}>
                                                <div className={cn("w-1 h-1 rounded-full", client.status === "Active" ? "bg-emerald-500" : "bg-rose-500")} />
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openDrawer(client)}
                                                className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-slate-600 flex items-center gap-2 ml-auto active:scale-90"
                                            >
                                                <Edit3 size={16} />
                                                <span className="text-xs font-semibold">Edit</span>
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                                                <UserX size={40} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-900 font-bold">No clients found</p>
                                                <p className="text-slate-500 text-xs">Try adjusting your search or filters to find what you're looking for.</p>
                                            </div>
                                            <button
                                                onClick={() => { setSearchQuery(""); setStatusFilter(null); toast.info("All filters cleared"); }}
                                                className="mt-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-all"
                                            >
                                                Clear all filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <ClientDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                client={selectedClient}
            />
        </motion.div>
    );
}
