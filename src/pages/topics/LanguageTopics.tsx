import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TopicResponse } from "@/types/topic/topic";
import { topicService } from "@/services/topicService";
import { TopicCard } from "@/components/topics/TopicCard";
import { FloatingFilterBar } from "@/components/topics/FloatingFilterBar";
import { Search } from "@/assets/icons";
import { MetaData } from "@/components/seo/MetaData";
import { Pagination } from "@/components/ui/Pagination";

export default function LanguageTopics() {
    const { languageId } = useParams<{ languageId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchName, setSearchName] = useState<string>("");
    const [debouncedSearchName, setDebouncedSearchName] = useState<string>("");
    const [searchDifficulty, setSearchDifficulty] = useState<string>("");

    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const size = 9;

    useEffect(() => {
        setPage(0);
    }, [debouncedSearchName, searchDifficulty]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchName(searchName);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchName]);

    useEffect(() => {
        if (!languageId) {
            return;
        }

        let active = true;

        const loadTopics = async () => {
            await Promise.resolve();
            if (!active) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await topicService.searchActiveTopicsPaginated(
                    languageId,
                    debouncedSearchName || undefined,
                    searchDifficulty || undefined,
                    page,
                    size
                );
                if (active) {
                    setTopics(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (err) {
                console.error("Erreur de recuperation", err);
                if (active) {
                    setError(t('topics.error_load'));
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        loadTopics();

        return () => {
            active = false;
        };
    }, [languageId, debouncedSearchName, searchDifficulty, page, t]);

    function handleTopicClick(topicId: string) {
        navigate(`/topics/${topicId}`);
    }

    return (
        <>
        <MetaData title={t('topics.page_title')}  robots="noindex, nofollow"  />
        <div className="relative min-h-screen pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                    {t('topics.page_title')}
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    {t('topics.page_desc')}
                </p>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="text-red-800 dark:text-red-300">{error}</p>
                </div>
            )}

            <FloatingFilterBar
                searchName={searchName}
                onSearchNameChange={setSearchName}
                searchDifficulty={searchDifficulty}
                onSearchDifficultyChange={setSearchDifficulty}
            />

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            ) : topics.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map((topic) => (
                            <TopicCard 
                                key={topic.id} 
                                topic={topic} 
                                onClick={handleTopicClick} 
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
                <div className="text-center py-20 bg-white dark:bg-gray-900 bg-opacity-50 rounded-3xl border border-gray-200 dark:border-gray-800 border-dashed">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">{t('topics.empty_title')}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('topics.empty_desc')}</p>
                </div>
            )}
        </div>
        </>
    );
}
