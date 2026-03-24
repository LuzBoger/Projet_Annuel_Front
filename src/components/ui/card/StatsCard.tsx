interface StatsCardProps {
    title: string;
    value: number | string;
    color?: string;
}

export function StatsCard({ title, value, color = 'text-gray-100' }: StatsCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
    );
}