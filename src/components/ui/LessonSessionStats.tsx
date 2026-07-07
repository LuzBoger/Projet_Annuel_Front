interface LessonSessionStatsProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

export function LessonSessionStats({ icon, label, value }: LessonSessionStatsProps) {
    return (
        <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 rounded-2xl p-4 flex items-center gap-4 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5 leading-tight">{value}</p>
            </div>
        </div>
    );
}