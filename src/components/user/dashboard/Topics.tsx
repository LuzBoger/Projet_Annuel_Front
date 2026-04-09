import { Button } from "@/components/ui/Button";
import { TopicCard } from "@/components/ui/card/TopicCard";
import { TopicWithProgressResponse } from "@/types/topic/topic";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface TopicsProps {
    topics: TopicWithProgressResponse[];
    activeLanguageId: string | null;
}

export function Topics({ topics, activeLanguageId }: Readonly<TopicsProps>) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">{t("dashboard.topics")}</h2>
                {activeLanguageId && (
                    <Button
                        variant="none"
                        onClick={() => navigate(`/language/${activeLanguageId}/topics`)}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        {t("dashboard.view_all")} →
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {topics.map((topic) => (
                    <TopicCard
                        key={topic.id}
                        topic={topic}
                        onPractice={() => navigate(`/topics/${topic.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
