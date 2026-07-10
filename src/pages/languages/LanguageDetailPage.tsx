import { MetaData } from "@/components/seo/MetaData";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/ui/card/StatsCard";
import { TopicCard } from "@/components/topics/TopicCard";
import { Pagination } from "@/components/ui/Pagination";
import { EVENT_USER_LANGUAGE_ADDED, EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { useUserLanguage } from "@/hooks/useUserLanguage";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { languageService } from "@/services/languageService";
import { topicService } from "@/services/topicService";
import { LanguageResponse } from "@/types/language/language";
import { TopicResponse } from "@/types/topic/topic";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { ArrowLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TOPICS_PAGE_SIZE } from "@/constants/languages";

export function LanguageDetailPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { languageId } = useParams();
    const [language, setLanguage] = useState<LanguageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [togglingLearning, setTogglingLearning] = useState(false);
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const size = TOPICS_PAGE_SIZE;
    const { userLanguages, fetchLearningLanguages, addLanguage, deleteLanguage } = useUserLanguage();

    useEffect(() => {
        if (!languageId) {
            return;
        }

        let active = true;

        const load = async () => {
            await Promise.resolve();
            if (!active) return;

            setLoading(true);
            try {
                const [languageData] = await Promise.all([
                    languageService.getLanguageById(languageId),
                    fetchLearningLanguages()
                ]);
                if (active) {
                    setLanguage(languageData);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [languageId, fetchLearningLanguages]);

    useEffect(() => {
        if (!languageId) {
            return;
        }

        topicService.searchActiveTopicsPaginated(languageId, undefined, undefined, page, size)
            .then((data) => {
                setTopics(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) => {
                console.error("Failed to load paginated topics", err);
            });
    }, [languageId, page, size]);

    const userLanguage: UserLanguageResponse | undefined = userLanguages.find((lang) => lang.languageId === language?.id);
    const isLearning = !!userLanguage;

    const handleToggleLearning = async () => {
        setTogglingLearning(true);
        try {
            if (isLearning && userLanguage) {
                await deleteLanguage(userLanguage.id);
                globalEvents.emit(EVENT_USER_LANGUAGE_REMOVED, userLanguage.languageId);
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
        <div className="flex justify-center py-20 text-sm text-gray-400 dark:text-gray-500">
            {t("common.loading")}
        </div>
    );

    return (
        <>
            <MetaData title={language.name} robots="noindex, nofollow" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="pill-red" size="sm" onClick={() => navigate("/catalog-languages")} className="mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("common.back")}
                </Button>

            <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-black text-gray-700 dark:text-gray-200 ">
                    {language.code.toUpperCase()}
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">{language.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <BadgeTag color="gray">{
                                (() => {
                                    const range = language.levelRange ?? "A1-C2";
                                    const parts = range.split(" → ");
                                    return parts[0] === parts[1] ? parts[0] : range;
                                })()
                            }</BadgeTag>
                        {language.isPopular && ( <BadgeTag color="yellow"> <Star className="w-3 h-3 text-yellow-500" /> {t("popular")}</BadgeTag> )}
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
                <StatsCard variant="blue" value={language.topicsCount ?? 0} title={t("pages.languageDetail.topics")}/>
                <StatsCard variant="emerald" value={language.lessonsCount ?? 0} title={t("pages.languageDetail.lessons")}/>
            </div>
             <div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                     {t("pages.languageDetail.topicsAndLessons")}
                 </h2>
                 {topics.length > 0 ? (
                     <div className="space-y-6">
                         <div className="flex flex-col gap-3">
                             {topics.map((topic) => (
                                 <TopicCard
                                     key={topic.id}
                                     topic={topic}
                                     onClick={(id) => navigate(`/topics/${id}`)}
                                 />
                             ))}
                         </div>
                         <div className="mt-8 flex items-center justify-center border-t border-gray-200 dark:border-gray-800 pt-6">
                             <Pagination
                                 currentPage={page + 1}
                                 hasMore={page + 1 < totalPages}
                                 onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                 onPrev={() => setPage((p) => Math.max(0, p - 1))}
                             />
                         </div>
                     </div>
                 ) : (
                     <div className="text-center py-12 bg-white dark:bg-gray-900 bg-opacity-50 rounded-2xl border border-gray-200 dark:border-gray-800 border-dashed">
                         <p className="text-sm text-gray-500 dark:text-gray-400">{t('topics.empty_title')}</p>
                     </div>
                 )}
             </div>
        </div>
    </>

    )




}
