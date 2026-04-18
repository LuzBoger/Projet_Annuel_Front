import { useTranslation } from "react-i18next";
import { LessonSummaryResponse, LessonType } from "@/types/lesson/lesson";
import { LESSON_TYPE_COLORS } from "@/constants/lesson";
import { ChevronRight, IconFlashcard, IconQcm, IconMatching, IconSorting, Check } from "@/assets/icons";

interface LessonCardProps {
    lesson: LessonSummaryResponse; 
    index: number;
    onClick: (lessonId: string) => void;
}

export function LessonCard({ lesson, index, onClick }: LessonCardProps) {
    const { t } = useTranslation();

    const getLessonVisuals = (type: string) => {
        const colorClass = LESSON_TYPE_COLORS[type] ?? "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/40 dark:text-gray-400 dark:border-gray-800/50";
        
        switch (type) {
            case LessonType.FLASHCARD:
                return { icon: <IconFlashcard className="w-4 h-4" />, color: colorClass, label: "FLASHCARDS" };
            case LessonType.QCM:
                return { icon: <IconQcm className="w-4 h-4" />, color: colorClass, label: "QCM" };
            case LessonType.MATCHING_PAIR:
                return { icon: <IconMatching className="w-4 h-4" />, color: colorClass, label: "MATCHING" };
            case LessonType.SORTING_EXERCISE:
                return { icon: <IconSorting className="w-4 h-4" />, color: colorClass, label: "SORTING" };
            default:
                return { icon: <IconQcm className="w-4 h-4" />, color: colorClass, label: "EXERCISE" };
        }
    };

    const visuals = getLessonVisuals(lesson.lessonType);

    return (
        <div 
            className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-800/40 bg-opacity-70 dark:bg-opacity-40 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 cursor-pointer overflow-hidden h-full"
            onClick={() => onClick(lesson.id)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-white/30 dark:from-brand-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`flex items-center space-x-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full border shadow-sm transition-colors duration-300 ${visuals.color}`}>
                        {visuals.icon}
                        <span>{visuals.label}</span>
                    </span>
                    {lesson.isAlreadyFinish && (
                        <span 
                            className="flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full w-6 h-6 shadow-sm border border-emerald-100 dark:border-emerald-500/20 backdrop-blur-sm self-center" 
                            title="Validée"
                        >
                            <Check className="w-3.5 h-3.5" />
                        </span>
                    )}
                </div>
                
                <div className="flex bg-gradient-to-b from-brand-600 to-brand-700 dark:from-brand-500 dark:to-brand-600 text-white rounded-full w-8 h-8 items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm font-bold tracking-wide">
                        {index}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex-grow mb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                    {lesson.title}
                </h3>

                {lesson.description ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {lesson.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        {t('topics.no_desc')}
                    </p>
                )}
            </div>

            <div className="relative z-10 flex flex-col space-y-4">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-gray-500 overflow-x-auto pb-1 scrollbar-hide">
                    <span className="flex items-center text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/30 px-2.5 py-1.5 rounded-md whitespace-nowrap">
                        {lesson.xpReward} XP
                    </span>
                    <span className="flex items-center text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 px-2.5 py-1.5 rounded-md whitespace-nowrap">
                        ~{lesson.durationMinutes} MIN
                    </span>
                </div>
                
                <div className="flex items-center justify-end text-sm font-bold text-brand-600 dark:text-indigo-400 group-hover:text-brand-700 dark:group-hover:text-indigo-300 pt-3 border-t border-gray-100 dark:border-gray-800">
                    {lesson.isAlreadyFinish ? t('topics.replay_lesson_btn') : t('topics.start_lesson_btn')}
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
            </div>
        </div>
    );
}
