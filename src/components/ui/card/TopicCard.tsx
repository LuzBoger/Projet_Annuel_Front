import { TopicWithProgressResponse } from "@/types/topic/topic";
import { LESSON_TYPE, LESSON_TYPE_COLORS } from "@/constants/lesson";
import { useTranslation } from "react-i18next";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { BadgeTag } from "@/components/ui/BadgeTag";

interface TopicCardProps {
    topic: TopicWithProgressResponse;
    onPractice: () => void;
}

export function TopicCard({ topic, onPractice }: Readonly<TopicCardProps>) {
    const { t } = useTranslation();
    const isCompleted = topic.progressPercent === 100;
    const nextLesson = topic.lessons?.find((l) => !l.isAlreadyFinish);
    const typeColor = (type: string) => LESSON_TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600";

    return (
        <div 
            className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden
                ${isCompleted 
                    ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)] dark:shadow-[0_0_30px_rgba(16,185,129,0.05)]" 
                    : "border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-xl hover:border-brand-500/30"
                }`}
            onClick={onPractice}
        >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-950/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Neon Progress Line (Proposal 2) */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-gray-100 dark:bg-gray-700/50 w-full z-10" />
            <div 
                className={`absolute bottom-0 left-0 h-[3px] z-20 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]
                    ${isCompleted ? "bg-emerald-500" : "bg-brand-500"}`}
                style={{ width: `${topic.progressPercent}%` }}
            />

            {/* Floating Progress Tag */}
            <div className="absolute top-4 right-5 z-20">
                {isCompleted ? (
                    <BadgeTag color="green" className="animate-in fade-in zoom-in duration-500">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>DONE</span>
                    </BadgeTag>
                ) : (
                    <BadgeTag color="gray">
                        {Number.isInteger(topic.progressPercent) ? topic.progressPercent : topic.progressPercent.toFixed(2)}%
                    </BadgeTag>
                )}
            </div>

            <div className="relative z-10 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Left: Content Information */}
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <BadgeTag color="blue" className="px-2 py-1">
                                {topic.difficulty}
                            </BadgeTag>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                {topic.completedLessons}/{topic.totalLessons} {t("components.topicCard.lessons")}
                            </span>
                        </div>

                        <div className="max-w-xl">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                                {topic.name}
                            </h3>
                            {topic.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 leading-relaxed max-w-lg">
                                    {topic.description}
                                </p>
                            )}
                        </div>

                        {nextLesson && !isCompleted && (
                            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800/60 text-[11px] text-gray-600 dark:text-gray-400">
                                <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0 uppercase tracking-widest text-[8px]">
                                    {t("components.topicCard.next")}
                                </span>
                                <div className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700" />
                                <span className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[150px] sm:max-w-[200px]">
                                    {nextLesson.title}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tight shrink-0 ${typeColor(nextLesson.lessonType)}`}>
                                    {LESSON_TYPE[nextLesson.lessonType] ?? nextLesson.lessonType}
                                </span>
                            </div>
                        )}

                        {isCompleted && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50/30 dark:bg-emerald-500/5 rounded-lg border border-emerald-100/50 dark:border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold italic">
                                {t("components.topicCard.allLessonsFinished")}
                            </div>
                        )}
                    </div>

                    {/* Right: Action Button */}
                    <div className={`shrink-0 self-end mb-1 flex items-center justify-end text-sm font-bold transition-all duration-300
                            ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-brand-600 dark:text-brand-400"}`}>
                        <span className="group-hover:mr-1 transition-all">
                            {isCompleted ? t("components.topicCard.review") : t("components.topicCard.practice")}
                        </span>
                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}
