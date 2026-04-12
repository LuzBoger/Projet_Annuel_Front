interface StatsCardProps {
    title: string;
    value: number | string;
    color?: string;
}

export function StatsCard({ title, value, color = 'text-gray-900' }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-white">{title}</p>
            <p className={`text-3xl dark:text-white font-bold mt-2 ${color}`}>{value}</p>
        </div>
    );
}
