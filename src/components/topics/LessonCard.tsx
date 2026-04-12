import { useTranslation } from "react-i18next";
import { LessonSummaryResponse, LessonType } from "@/types/lesson/lesson";
import { ChevronRight, IconFlashcard, IconQcm, IconMatching, IconSorting, Check } from "@/assets/icons";

interface LessonCardProps {
    lesson: LessonSummaryResponse; 
    index: number;
    onClick: (lessonId: string) => void;
}

export function LessonCard({ lesson, index, onClick }: LessonCardProps) {
    const { t } = useTranslation();

    const getLessonVisuals = (type: string) => {
        switch (type) {
            case LessonType.FLASHCARD:
                return { icon: <IconFlashcard className="w-4 h-4" />, color: "bg-blue-100 text-blue-800 border-blue-200", label: "FLASHCARDS" };
            case LessonType.QCM:
                return { icon: <IconQcm className="w-4 h-4" />, color: "bg-purple-100 text-purple-800 border-purple-200", label: "QCM" };
            case LessonType.MATCHING_PAIR:
                return { icon: <IconMatching className="w-4 h-4" />, color: "bg-pink-100 text-pink-800 border-pink-200", label: "MATCHING" };
            case LessonType.SORTING_EXERCISE:
                return { icon: <IconSorting className="w-4 h-4" />, color: "bg-amber-100 text-amber-800 border-amber-200", label: "SORTING" };
            default:
                return { icon: <IconQcm className="w-4 h-4" />, color: "bg-gray-100 text-gray-800 border-gray-200", label: "EXERCISE" };
        }
    };

    const visuals = getLessonVisuals(lesson.lessonType);

    return (
        <div 
            className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 border-opacity-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full"
            onClick={() => onClick(lesson.id)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-white/50 dark:from-brand-900/20 dark:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`flex items-center space-x-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full border shadow-sm ${visuals.color}`}>
                        {visuals.icon}
                        <span>{visuals.label}</span>
                    </span>
                    {lesson.isAlreadyFinish && (
                        <span className="flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 shadow-sm border border-emerald-200" title="Validée">
                            <Check className="w-4 h-4" />
                        </span>
                    )}
                </div>
                
                <div className="flex bg-brand-600 text-white rounded-full w-8 h-8 items-center justify-center shadow-sm">
                    <span className="text-sm font-medium tracking-wide">
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
                    <span className="flex items-center text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/30 px-2.5 py-1.5 rounded-md whitespace-nowrap">
                        {lesson.xpReward} XP
                    </span>
                    <span className="flex items-center text-orange-600 bg-orange-50 border border-orange-100 dark:border-orange-900/30 px-2.5 py-1.5 rounded-md whitespace-nowrap">
                        ~{lesson.durationMinutes} MIN
                    </span>
                    {lesson.passScorePercentage !== undefined && (
                        <span className="flex items-center text-emerald-600 bg-emerald-50 border border-emerald-100 dark:border-emerald-900/30 px-2.5 py-1.5 rounded-md whitespace-nowrap hidden sm:flex">
                            {lesson.passScorePercentage}% REQ
                        </span>
                    )}
                </div>
                
                <div className="flex items-center justify-end text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {lesson.isAlreadyFinish ? t('topics.replay_lesson_btn') : t('topics.start_lesson_btn')}
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
            </div>
        </div>
    );
}
