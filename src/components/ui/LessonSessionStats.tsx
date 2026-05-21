interface LessonSessionStatsProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

export function LessonSessionStats({ icon, label, value }: LessonSessionStatsProps) {
    return (
        <div className="flex items-center gap-3 bg-[#faf7f2] dark:bg-gray-700/40 border border-[#e8dcc8] dark:border-gray-700 rounded-xl px-4 py-3">
            <span className="text-[#c8a97e] dark:text-amber-400">{icon}</span>
            <div>
                <p className="text-[10px] font-medium text-[#8a7a60] dark:text-gray-400 uppercase tracking-widest">{label}</p>
                <p className="text-base font-bold text-[#3a2e1e] dark:text-white">{value}</p>
            </div>
        </div>
    );
}