import { LanguageSelector } from "@/components/ranking/LanguageSelector";
import { RankingList } from "@/components/ranking/RankingList";
import { RankingTabs } from "@/components/ranking/RankingTabs";
import { UserRankBanner } from "@/components/ranking/UserRankBanner";
import { Pagination } from "@/components/ui/Pagination";
import { WS_GLOBAl_RANKING, WS_LANGUAGE_RANKING } from "@/constants/global";
import { useRanking } from "@/hooks/useRanking";
import { useRankingSocket } from "@/hooks/useRankingSocket";
import { useAuth } from "@/hooks/useAuth";
import { languageService } from "@/services/languageService";
import { userLanguageService } from "@/services/userLanguage";
import { RankingType } from "@/types/ranking/ranking";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { hasRole } from "@/lib/utils/roles";
import { useCallback, useEffect, useState } from "react";
import { Trophy, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function Ranking() {
    const {t} = useTranslation();
    const {data, loading, fetchGlobalRanking, fetchByLanguageRanking, fetchFriendsRanking} = useRanking();
    const {user} = useAuth();
    const [searchParams] = useSearchParams();

    const queryTab = searchParams.get('tab') as RankingType | null;
    const queryLanguageId = searchParams.get('languageId');
    const isAdmin = hasRole(user?.role, "ADMIN");

    const [selectedTab, setSelectedTab] = useState<RankingType>(queryTab === 'language' ? 'language' : queryTab === 'friends' ? 'friends' : 'global');
    const [languages, setLanguages] = useState<UserLanguageResponse[]>([]);
    const [selectedLanguageId, setSelectedLanguageId] = useState<string>(queryLanguageId || '');
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const loadLanguages = async () => {
            try {
                if (isAdmin) {
                    const activeLangs = await languageService.getAllActiveLanguages();
                    const formattedLangs: UserLanguageResponse[] = activeLangs.map((lang) => ({
                        id: lang.id,
                        languageId: lang.id,
                        languageCode: lang.code,
                        languageName: lang.name,
                        languageType: "LEARNING",
                    }));
                    setLanguages(formattedLangs);
                    if (queryLanguageId) {
                        setSelectedLanguageId(queryLanguageId);
                    } else if (formattedLangs.length > 0) {
                        setSelectedLanguageId(formattedLangs[0].languageId);
                    }
                } else {
                    const learningLangs = await userLanguageService.getUserLearningLanguages();
                    setLanguages(learningLangs);
                    if (queryLanguageId) {
                        setSelectedLanguageId(queryLanguageId);
                    } else if (learningLangs.length > 0) {
                        setSelectedLanguageId(learningLangs[0].languageId);
                    }
                }
            } catch (error) {
                console.error("Failed to load languages for ranking", error);
            }
        };

        loadLanguages();
    }, [isAdmin, queryLanguageId, user?.id]);

    const handleTabChange = (tab: RankingType) => {
        setSelectedTab(tab);
        setCurrentPage(0);
    };

    const handleLanguageChange = (languageId: string) => {
        setSelectedLanguageId(languageId);
        setCurrentPage(0);
    };

    useEffect(() => {
        if (selectedTab === 'global') {
            fetchGlobalRanking(currentPage);
        } else if (selectedTab === 'language' && selectedLanguageId) {
            fetchByLanguageRanking(selectedLanguageId, currentPage);
        } else if (selectedTab === 'friends') {
            fetchFriendsRanking(currentPage);
        }
    }, [selectedTab, selectedLanguageId, currentPage, fetchGlobalRanking, fetchByLanguageRanking, fetchFriendsRanking]);

    const handleSocketMessage = useCallback(() => {
        if (selectedTab === 'global') {
            fetchGlobalRanking(currentPage);
        } else if (selectedTab === 'language' && selectedLanguageId) {
            fetchByLanguageRanking(selectedLanguageId, currentPage);
        }
    }, [selectedTab, selectedLanguageId, currentPage, fetchGlobalRanking, fetchByLanguageRanking]);

    const wsTarget = selectedTab === 'global' ? WS_GLOBAl_RANKING : selectedTab === 'language' && selectedLanguageId ? `${WS_LANGUAGE_RANKING}${selectedLanguageId}` : '';
    
    useRankingSocket(wsTarget, handleSocketMessage);

    const ranking = data?.rankedUser ?? [];
    const userRanked = ranking.findIndex(userRank => userRank.isCurrentUser);
    const rankingAbove = userRanked >= 0 ? ranking.slice(0, userRanked) : ranking;
    const rankingFromUser = userRanked >= 0 ? ranking.slice(userRanked) : [];
    const showSeparator = rankingAbove.length > 0 && rankingFromUser.length > 0;
    const hasMore = data ? (currentPage + 1) * data.pageSize < data.totalParticipants : false;


    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                    <Trophy size={22} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('ranking.title')}</h1>
                {data && (
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                        {t('ranking.total', { count: data.totalParticipants })}
                    </span>
                )}
                <div className="relative group ml-1">
                    <Info size={16} className="text-gray-400 cursor-help hover:text-indigo-500 transition-colors" />
                    <div className="absolute right-0 top-6 z-20 invisible group-hover:visible w-64 rounded-xl bg-indigo-600 dark:bg-indigo-700 px-4 py-3 shadow-lg">
                        <p className="text-[10px] font-semibold text-indigo-200 uppercase tracking-widest mb-1">
                            {t('ranking.info.label')}
                        </p>
                        <p className="text-xs font-bold text-white leading-snug mb-1">
                            {t('ranking.info.title')}
                        </p>
                        <p className="text-[11px] text-indigo-200 leading-relaxed">
                            {t('ranking.info.description')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between border-b border-gray-200 dark:border-gray-700 mb-6">
                <RankingTabs selectedTab={selectedTab} onChangeTab={handleTabChange} />
                {selectedTab === 'language' && languages.length > 0 && (
                    <div className="pb-2 shrink-0">
                        <LanguageSelector languages={languages} selectedLanguageId={selectedLanguageId} onSelectLanguage={handleLanguageChange} />
                    </div>
                )}
            </div>

            {data && <UserRankBanner rank={data} />}
            {selectedTab === 'friends' && data && data.totalParticipants === 1 && (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('ranking.friends.empty')}
                    </p>
                </div>
            )}
            <RankingList rankingAbove={rankingAbove} rankingFromUser={rankingFromUser} showSeparator={showSeparator} loading={loading} />
            {data && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage + 1}
                        hasMore={hasMore}
                        onNext={() => setCurrentPage(p => p + 1)}
                        onPrev={() => setCurrentPage(p => p - 1)}
                    />
                </div>
            )}
        </div>
    );
}