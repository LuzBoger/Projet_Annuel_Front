import { LanguageSelector } from "@/components/ranking/LanguageSelector";
import { RankingList } from "@/components/ranking/RankingList";
import { RankingTabs } from "@/components/ranking/RankingTabs";
import { UserRankBanner } from "@/components/ranking/UserRankBanner";
import { Pagination } from "@/components/ui/Pagination";
import { WS_GLOBAl_RANKING, WS_LANGUAGE_RANKING } from "@/constants/global";
import { useRanking } from "@/hooks/useRanking";
import { useRankingSocket } from "@/hooks/useRankingSocket";
import { userLanguageService } from "@/services/userLanguage";
import { RankingType } from "@/types/ranking/ranking";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useCallback, useEffect, useState } from "react";
import { Trophy, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Ranking() {
    const {t} = useTranslation();
    const {data, loading, fetchGlobalRanking, fetchByLanguageRanking} = useRanking();
    const [selectedTab, setSelectedTab] = useState<RankingType>('global');
    const [languages, setLanguages] = useState<UserLanguageResponse[]>([]);
    const [selectedLanguageId, setSelectedLanguageId] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        userLanguageService.getUserLearningLanguages()
            .then((langs) => {
                setLanguages(langs);
                if (langs.length > 0){
                    setSelectedLanguageId(langs[0].languageId);
                }
            })
            .catch(() => {});
    }, []);

    const handleTabChange = (tab: RankingType) => {
        setSelectedTab(tab);
        setCurrentPage(0);
    };

    const handleLanguageChange = (languageId: string) => {
        setSelectedLanguageId(languageId);
        setCurrentPage(0);
    };

    useEffect(() => {
        if (selectedTab === 'global'){
            fetchGlobalRanking(currentPage);
        } else if (selectedTab === 'language' && selectedLanguageId){
            fetchByLanguageRanking(selectedLanguageId, currentPage);
        }
    }, [selectedTab, selectedLanguageId, currentPage, fetchGlobalRanking, fetchByLanguageRanking]);

    const handleSocketMessage = useCallback(() => {
        if (selectedTab === 'global'){
            fetchGlobalRanking(currentPage);
        }
        else if (selectedTab === 'language' && selectedLanguageId){
            fetchByLanguageRanking(selectedLanguageId, currentPage);
        }
    }, [selectedTab, selectedLanguageId, currentPage, fetchGlobalRanking, fetchByLanguageRanking]);

    const wsTarget = selectedTab === 'global'? WS_GLOBAl_RANKING : selectedLanguageId ? `${WS_LANGUAGE_RANKING}${selectedLanguageId}` : '';

    useRankingSocket(wsTarget, handleSocketMessage);

    const ranking = data?.rankedUser ?? [];
    const userRanked = ranking.findIndex(userRank => userRank.isCurrentUser);
    const rankingAbove = userRanked >= 0 ? ranking.slice(0, userRanked) : ranking;
    const rankingFromUser = userRanked >= 0 ? ranking.slice(userRanked) : [];
    const showSeparator = rankingAbove.length > 0 && rankingFromUser.length > 0;
    const hasMore = data ? (currentPage + 1) * data.pageSize < data.totalParticipants : false;


    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
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
                    <div className="absolute left-0 top-6 z-20 invisible group-hover:visible w-64 rounded-xl bg-indigo-600 dark:bg-indigo-700 px-4 py-3 shadow-lg">
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