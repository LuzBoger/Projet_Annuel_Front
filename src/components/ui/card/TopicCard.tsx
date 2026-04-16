import { TopicWithProgressResponse } from "@/types/topic/topic";
import { ProgressCircle } from "../ProgressCircle";
import { DIFFICULTY_COLORS, LESSON_TYPE, LESSON_TYPE_COLORS } from "@/constants/lesson";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Button } from "../Button";

interface TopicCardProps {
    topic: TopicWithProgressResponse;
    onPractice: () => void;
}

export function TopicCard({ topic, onPractice }: Readonly<TopicCardProps>) {
    const { t } = useTranslation();
    const nextLesson = topic.lessons?.find((l) => !l.isAlreadyFinish);
    const difficultyClass = DIFFICULTY_COLORS[topic.difficulty] ?? "bg-gray-100 text-gray-700 border-gray-200";
    const typeColor = (type: string) => LESSON_TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600";

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-5 pt-4 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${difficultyClass}`}>
                                {topic.difficulty}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-400">
                                {topic.completedLessons}/{topic.totalLessons} {t("components.topicCard.lessons")}
                            </span>
                        </div>

                        <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">{topic.name}</p>
                        {topic.description && (
                            <p className="text-sm text-gray-400 dark:text-gray-400 line-clamp-1">{topic.description}</p>
                        )}

                        {nextLesson && (
                            <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs w-fit max-w-full overflow-hidden">
                                <span className="text-gray-500 dark:text-gray-400 shrink-0">{t("components.topicCard.next")} :</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">{nextLesson.title}</span>
                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium shrink-0 ${typeColor(nextLesson.lessonType)}`}>
                                    {LESSON_TYPE[nextLesson.lessonType] ?? nextLesson.lessonType}
                                </span>
                                <span className="text-gray-400 dark:text-gray-500 shrink-0">· +{nextLesson.xpReward} XP</span>
                            </div>
                        )}
                    </div>

                    <ProgressCircle percent={topic.progressPercent} />
                </div>

                <Button
                    variant="none"
                    className="group flex items-center justify-end w-full mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-sm font-bold text-brand-600 dark:text-indigo-400 hover:text-brand-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                    onClick={onPractice}
                >
                    {t("components.topicCard.practice")}
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200 cursor-pointer" />
                </Button>
            </div>

        </div>
    );
}
