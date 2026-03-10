"use client";

import { useState, useEffect } from "react";
import { 
    Download, 
    Calendar, 
    Filter, 
    BarChart3, 
    PieChart, 
    LineChart as LineIcon,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Loader2,
    AreaChart as AreaIcon
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
import { getDistributionStats, getClients } from "@/lib/actions";
import { toast } from "sonner";

export default function ReportsPage() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stats, cData] = await Promise.all([
                    getDistributionStats(),
                    getClients()
                ]);
                setChartData(stats);
                setClients(cData.sort((a, b) => (b.distributed_sims || 0) - (a.distributed_sims || 0)));
            } catch (error) {
                toast.error("Failed to load report data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    const totalDistributed = chartData.reduce((acc, curr) => acc + curr.value, 0);

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
                    { label: "Total Distributed", value: totalDistributed.toLocaleString(), trend: "up", sub: "Since last month" },
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
                        <button className="p-2 bg-slate-900 text-white rounded-xl"><AreaIcon size={18} /></button>
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 transition-colors"><BarChart3 size={18} /></button>
                    </div>
                </div>
                <div className="h-[350px] w-full">
                    {chartData.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-400 italic">No distribution data available for chart.</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
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
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#2563eb" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#reportGradient)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-bold text-slate-900 mb-8 self-start">Registration Rate</h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={[
                                        { name: "Registered", value: 745, color: "#2563eb" },
                                        { name: "Unregistered", value: 115, color: "#e2e8f0" },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {[
                                        { color: "#2563eb" },
                                        { color: "#e2e8f0" },
                                    ].map((entry, index) => (
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
                        {clients.slice(0, 5).map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-900">{item.name}</span>
                                    <span className="text-slate-400">{item.distributed_sims || 0} SIMs</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div 
                                        className={cn("h-full rounded-full transition-all duration-1000", i === 0 ? "bg-blue-600" : i === 1 ? "bg-indigo-500" : "bg-slate-400")} 
                                        style={{ width: `${Math.min(((item.distributed_sims || 0) / (clients[0]?.distributed_sims || 100)) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {clients.length === 0 && <p className="text-xs text-slate-400 italic">No client data available.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
