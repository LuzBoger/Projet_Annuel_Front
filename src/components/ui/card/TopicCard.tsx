import { TopicWithProgressResponse } from "@/types/topic/topic";
import { Button } from "../Button";
import { BadgeStatusLanguages } from "../BadgeStatusLanguages";
import { ProgressBar } from "../ProgressBar";
import { ProgressCircle } from "../ProgressCircle";
import { useTranslation } from "react-i18next";

interface TopicCardProps {
    topic: TopicWithProgressResponse;
    isExpanded: boolean;
    onToggle: () => void;
}

export function TopicCard({ topic, isExpanded, onToggle }: Readonly<TopicCardProps>) {
    const { t } = useTranslation();
    const percent = topic.progressPercent;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={onToggle}
                className="px-5 py-4 flex items-center gap-4 border-0 rounded-none hover:bg-gray-50"
            >

                <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 text-sm">{topic.name}</span>
                        {topic.difficulty && (
                            <span className="text-xs text-gray-400">{topic.difficulty}</span>
                        )}
                        {percent === 100 && <BadgeStatusLanguages status="COMPLETED" />}
                        {percent > 0 && percent < 100 && <BadgeStatusLanguages status="IN_PROGRESS" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {topic.totalLessons} {t("components.topicCard.lessons")} · {topic.completedLessons} {t("components.topicCard.completed")}
                    </p>
                    <ProgressBar percent={percent} />
                </div>

                <ProgressCircle percent={percent} />

                <span className={`text-xs text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isExpanded ? "rotate-180" : ""
                }`}>▾</span>
            </Button>

            {isExpanded && (
                <div className="border-t border-gray-100">
                    {topic.lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="px-5 py-3 flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800">{lesson.title}</p>
                            </div>

                            <BadgeStatusLanguages status={lesson.userProgress?.status ?? "NOT_STARTED"} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
