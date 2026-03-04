import {
    Building2,
    Layers,
    Smartphone,
    DollarSign,
    CheckCircle2,
    CreditCard,
    AlertTriangle,
    TrendingUp
} from "lucide-react";

const stats = [
    { label: "Total Companies", value: "3", subValue: "Multi-tenant platform", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total SIM Batches", value: "48", subValue: "Across all companies", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total SIMs", value: "1,200", subValue: "340 Available | 860 Assigned", icon: Smartphone, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Monthly Credit Value", value: "28,450 KSH", subValue: "+12% from last month", icon: DollarSign, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Registered SIMs", value: "745", subValue: "86.6% of assigned", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Credited SIMs", value: "652", subValue: "87.5% of registered", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Clients Below 75%", value: "3", subValue: "Compliance warnings", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Credit Rate", value: "87.5%", subValue: "Overall performance", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
];

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 h-screen overflow-y-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Global Dashboard</h1>
                <p className="text-slate-500 text-sm">Overview of all telecom operations across the platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="text-xs text-slate-400 mt-1">{stat.subValue}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64 flex flex-col justify-center items-center text-slate-400 italic">
                    Line Registration Trend Chart Placeholder
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64 flex flex-col justify-center items-center text-slate-400 italic">
                    Credit Distribution Chart Placeholder
                </div>
            </div>
        </div>
    );
}
