"use client";

import { 
    Plus, 
    Send, 
    Box, 
    BarChart3, 
    Users, 
    Package, 
    TrendingUp,
    MoreHorizontal 
} from "lucide-react";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";

const stats = [
    { 
        label: "Total SIMs in Stock", 
        value: "65", 
        subLabel: "Available for distribution", 
        trend: "+ 12% from last week",
        icon: Box,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    { 
        label: "SIMs Distributed", 
        value: "35", 
        subLabel: "Total distributed", 
        trend: "+ 8% from last week",
        icon: Send,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    { 
        label: "Total Batches", 
        value: "4", 
        subLabel: "Batches received", 
        icon: Package,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    { 
        label: "Active Clients", 
        value: "3", 
        subLabel: "Total registered clients", 
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
];

const batchData = [
    { name: "Batch 1", value: 25 },
    { name: "Batch 2", value: 40 },
    { name: "Batch 3", value: 15 },
    { name: "Batch 4", value: 20 },
];

const distributionData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 25 },
    { name: "Wed", value: 15 },
    { name: "Thu", value: 30 },
    { name: "Fri", value: 20 },
    { name: "Sat", value: 10 },
    { name: "Sun", value: 5 },
];

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Welcome back! Here's an overview of your SIM distribution system.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5">
                        <Plus size={18} />
                        Receive Batch
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <Send size={18} />
                        Distribute SIMs
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="flex-1">
                            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                                {stat.trend && (
                                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mb-1.5">
                                        <TrendingUp size={12} />
                                        {stat.trend}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-400 text-[11px] font-medium">{stat.subLabel}</p>
                        </div>
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Stock per Batch</h3>
                            <p className="text-xs text-slate-400 font-medium tracking-tight">Distribution of SIMs across active batches</p>
                        </div>
                        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                            <MoreHorizontal size={18} className="text-slate-400" />
                        </button>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={batchData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                />
                                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Distribution Overview</h3>
                            <p className="text-xs text-slate-400 font-medium tracking-tight">Weekly SIM distribution trend</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                <span className="text-[11px] font-bold text-slate-500">In Stock: 65</span>
                            </div>
                            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <MoreHorizontal size={18} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={distributionData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#2563eb" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <div className="fixed bottom-8 right-8">
                 <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <span className="text-white text-lg font-bold">?</span>
                 </div>
            </div>
        </div>
    );
}
