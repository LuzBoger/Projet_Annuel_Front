import { useTranslation } from "react-i18next";

interface PlayerHeaderProps {
    current: number;
    total: number;
    label?: string;
}

export function PlayerHeader({ current, total, label }: PlayerHeaderProps) {
    const { t } = useTranslation();
    const progress = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                <span className="uppercase tracking-widest text-[10px] sm:text-xs text-indigo-500 font-bold">
                    {label || t('lessons.progress')}
                </span>
                <span className="bg-white dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                    {current} / {total}
                </span>
            </div>
            <div className="w-full bg-gray-200/50 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
                <div 
                    className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
