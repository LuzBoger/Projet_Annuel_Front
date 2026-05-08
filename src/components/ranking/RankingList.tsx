import { RankedUserResponse } from "@/types/ranking/ranking";
import { useTranslation } from "react-i18next";
import { UserRanked } from "@/components/ranking/UserRanked";
import { TopCard } from "@/components/ui/card/TopCard";

export interface RankingListProps {
    rankingAbove: RankedUserResponse[];
    rankingFromUser: RankedUserResponse[];
    showSeparator: boolean;
    loading: boolean;
}

export function RankingList({ rankingAbove, rankingFromUser, showSeparator, loading }: RankingListProps) {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const allUsers = [...rankingAbove, ...rankingFromUser];
    const topUsers = allUsers.filter(user => user.rank <= 3).sort((a, b) => a.rank - b.rank);
    const filteredAbove = rankingAbove.filter(user => user.rank > 3);
    const filteredFromUser = rankingFromUser.filter(user => user.rank > 3);
    const showRestSeparator = showSeparator && filteredAbove.length > 0 && filteredFromUser.length > 0;
    const isEmpty = allUsers.length === 0;

    return (
        <>
            {topUsers.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {topUsers.map(user => <TopCard key={user.accountId} user={user} />)}
                </div>
            )}

            {(filteredAbove.length > 0 || filteredFromUser.length > 0) && (
                <>
                    <div className="flex items-center px-4 mb-2">
                        <span className="w-7 shrink-0" />
                        <span className="w-9 h-9 shrink-0 mr-3" />
                        <span className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wide">{t('ranking.user')}</span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0">XP</span>
                    </div>
                    <div className="space-y-1">
                        {filteredAbove.map(data => <UserRanked key={data.accountId} userRanked={data} />)}
                        {showRestSeparator && (
                            <div className="flex items-center gap-3 py-3 px-2">
                                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {t('ranking.neighborhood')}
                                </span>
                                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                            </div>
                        )}
                        {filteredFromUser.map(data => <UserRanked key={data.accountId} userRanked={data} />)}
                    </div>
                </>
            )}

            {isEmpty && (
                <p className="text-center text-gray-400 py-12">{t('ranking.empty')}</p>
            )}
        </>
    );
}
