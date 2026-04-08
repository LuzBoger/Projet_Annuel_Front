import { Accordion } from "@/components/ui/Accordion/Accordion";
import { AccordionItem } from "@/components/ui/Accordion/AccordionItem";
import { LESSON_TYPE } from "@/constants/lesson";
import { TopicWithProgressResponse } from "@/types/topic/topic";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface TopicsProps {
    topics: TopicWithProgressResponse[];
    activeLanguageId: string | null;
}

export function Topics({ topics, activeLanguageId }: TopicsProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">{t("dashboard.topics")}</h2>
                {activeLanguageId && (
                    <button
                        onClick={() => navigate(`/language/${activeLanguageId}/topics`)}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        {t("dashboard.view_all")} →
                    </button>
                )}
            </div>
            <Accordion>
                {topics.map((topic) => (
                    <AccordionItem
                        key={topic.id}
                        id={topic.id}
                        trigger={
                            <div className="flex-1 flex flex-col gap-2 text-left">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border`}>
                                        {topic.difficulty}
                                    </span>
                                    <span className="font-bold text-gray-900 text-sm">{topic.name}</span>
                                </div>
                                {topic.description && (
                                    <p className="text-xs text-gray-500 line-clamp-1">{topic.description}</p>
                                )}
                                {topic.totalLessons > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-500 rounded-full"
                                                style={{ width: `${topic.progressPercent}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0">
                                            {topic.completedLessons}/{topic.totalLessons}
                                        </span>
                                    </div>
                                )}
                            </div>
                        }
                    >
                        {topic.lessons?.length ? topic.lessons.map((lesson) => (
                            <button
                                key={lesson.id}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-50 transition-colors text-left"
                                onClick={() => navigate(`/lessons/${lesson.id}/play`)}
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                                    <p className="text-xs text-gray-400">
                                        {LESSON_TYPE[lesson.lessonType] ?? lesson.lessonType} · +{lesson.xpReward} XP
                                    </p>
                                </div>
                                {lesson.isAlreadyFinish && (
                                    <span className="text-xs text-green-600 font-medium">✓</span>
                                )}
                            </button>
                        )) : (
                            <p className="px-4 py-3 text-sm text-gray-400">{t("topics.no_lessons")}</p>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
