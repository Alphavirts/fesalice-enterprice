"use client";

import { 
    Download, 
    Calendar, 
    Filter, 
    BarChart3, 
    PieChart, 
    LineChart as LineIcon,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from "lucide-react";
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    BarChart,
    Bar,
    Cell,
    PieChart as RePieChart,
    Pie
} from "recharts";
import { cn } from "@/lib/utils";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 900 },
];

const pieData = [
    { name: "Registered", value: 745, color: "#2563eb" },
    { name: "Unregistered", value: 115, color: "#e2e8f0" },
];

export default function ReportsPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen overflow-y-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Detailed insights into SIM distribution and registration trends</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <Calendar size={18} />
                        This Month
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/5">
                        <Download size={18} />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Growth Rate", value: "+12.5%", trend: "up", sub: "Since last month" },
                    { label: "Registration Efficiency", value: "86.6%", trend: "up", sub: "+2.4% from avg" },
                    { label: "Avg. Distribution Time", value: "4.2m", trend: "down", sub: "Optimized by 12%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            {stat.trend === "up" ? (
                                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <ArrowUpRight size={14} />
                                </div>
                            ) : (
                                <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
                                    <ArrowDownRight size={14} />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Main Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Distribution performance</h3>
                        <p className="text-sm text-slate-400 font-medium">Monthly SIM assignment volume</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-slate-900 text-white rounded-xl"><AreaChart size={18} /></button>
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 transition-colors"><BarChart3 size={18} /></button>
                    </div>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
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
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                            />
                            <Area 
                                type="smooth" 
                                dataKey="value" 
                                stroke="#2563eb" 
                                strokeWidth={4}
                                fillOpacity={1} 
                                fill="url(#reportGradient)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-bold text-slate-900 mb-8 self-start">Registration Rate</h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-3xl font-black text-slate-900">86%</p>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Efficiency</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-6">Top Performing Clients</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Acme Distribution", value: 124, color: "bg-blue-600" },
                            { name: "Global Connect", value: 86, color: "bg-indigo-500" },
                            { name: "TechLine Ventures", value: 43, color: "bg-slate-400" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-900">{item.name}</span>
                                    <span className="text-slate-400">{item.value} SIMs</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div 
                                        className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                                        style={{ width: `${(item.value / 150) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
