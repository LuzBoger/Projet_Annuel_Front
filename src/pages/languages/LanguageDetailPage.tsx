import { BadgeTag } from "@/components/ui/BadgeTag";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/ui/card/StatsCard";
import { TopicCard } from "@/components/ui/card/TopicCard";
import { EVENT_USER_LANGUAGE_ADDED, EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { useUserLanguage } from "@/hooks/useUserLanguage";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { languageService } from "@/services/languageService";
import { topicService } from "@/services/topicService";
import { LanguageResponse } from "@/types/language/language";
import { TopicWithProgressResponse } from "@/types/topic/topic";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export function LanguageDetailPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { languageId } = useParams();
    const [language, setLanguage] = useState<LanguageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [togglingLearning, setTogglingLearning] = useState(false);
    const [topics, setTopics] = useState<TopicWithProgressResponse[]>([]);
    const { userLanguages, fetchLearningLanguages, addLanguage, deleteLanguage } = useUserLanguage();

    useEffect(() => {
        if (!languageId) {
            return;
        }

        Promise.all([
            languageService.getLanguageById(languageId),
            fetchLearningLanguages(),
            topicService.getTopicsByLanguage(languageId)
        ]).then(([language, , topicsData]) => {
            setLanguage(language);
            setTopics(topicsData);
        }).finally(() => setLoading(false));
    }, [languageId, fetchLearningLanguages]);

    const userLanguage: UserLanguageResponse | undefined = userLanguages.find((lang) => lang.languageId === language?.id);
    const isLearning = !!userLanguage;

    const handleToggleLearning = async () => {
        setTogglingLearning(true);
        try {
            if (isLearning && userLanguage) {
                await deleteLanguage(userLanguage.id);
                globalEvents.emit(EVENT_USER_LANGUAGE_REMOVED, language?.id);
            } else if (language) {
                const addedLanguage = await addLanguage({ languageId: language.id, languageType: "LEARNING" });
                if (addedLanguage) {
                    globalEvents.emit(EVENT_USER_LANGUAGE_ADDED, addedLanguage);
                    navigate("/dashboard");
                }
            }
        } finally {
            setTogglingLearning(false);
        }
    };

     if (loading || !language) return (
        <div className="flex justify-center py-20 text-sm text-gray-400">
            {t("common.loading")}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button variant="outline" size="sm" onClick={() => navigate("/catalog-languages")} className="mb-8">
                {t("common.back")}
            </Button>

            <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-back text-gray-700 ">
                    {language.code.toUpperCase()}
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-black text-gray-900">{language.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <BadgeTag variant="default">{
                                (() => {
                                    const range = language.levelRange ?? "A1-C2";
                                    const parts = range.split(" → ");
                                    return parts[0] === parts[1] ? parts[0] : range;
                                })()
                            }</BadgeTag>
                        {language.isPopular && ( <BadgeTag variant="popular"> <Star className="w-3 h-3 text-yellow-500 inline mr-1" /> {t("popular")}</BadgeTag> )}
                    </div>
                </div>

                <Button
                    variant={isLearning ? "danger" : "primary"}
                    size="md"
                    isLoading={togglingLearning}
                    onClick={handleToggleLearning}
                >
                    {isLearning
                        ? t("pages.languageDetail.remove")
                        : t("pages.languageDetail.start")}
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
                <StatsCard value={language.topicsCount ?? 0} title={t("pages.languageDetail.topics")}/>
                <StatsCard value={language.lessonsCount ?? 0} title={t("pages.languageDetail.lessons")}/>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t("pages.languageDetail.topicsAndLessons")}
                </h2>
                <div className="flex flex-col gap-3">
                    {topics.map((topic) => (
                        <TopicCard
                            key={topic.id}
                            topic={topic}
                            onPractice={() => navigate(`/topics/${topic.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>

    )






}