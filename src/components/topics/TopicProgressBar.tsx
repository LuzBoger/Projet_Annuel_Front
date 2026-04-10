import { calculateProgress } from "@/lib/utils/topic";
import { useTranslation } from "react-i18next";

interface TopicProgressBarProps {
    finishedCount: number;
    totalCount: number;
}

export function TopicProgressBar({ finishedCount, totalCount }: TopicProgressBarProps) {
    const { t } = useTranslation();
    const progress = calculateProgress(finishedCount, totalCount);

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t('topics.progress')}</span>
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                        {finishedCount} / {totalCount} {t('topics.lessons_count_label')}
                    </span>
                    <span className="text-sm font-extrabold text-indigo-600">{progress}%</span>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1" 
                    style={{ width: `${progress}%` }}
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                </div>
            </div>
        </div>
    );
}
