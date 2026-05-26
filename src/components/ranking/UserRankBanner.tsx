import { RankingResponse } from "@/types/ranking/ranking";
import { useTranslation } from "react-i18next";
import { RankBadge } from "@/components/ui/RankBadge";

interface UserRankBannerProps {
    rank: RankingResponse;
}

export function UserRankBanner({ rank }: UserRankBannerProps) {
    const {t} = useTranslation();
    const rankUser = rank.currentUserRank;

    if (!rankUser){
        return null;
    }
    return (
        <div className="mb-6 px-5 py-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-7 flex justify-center shrink-0">
                        <RankBadge rank={rankUser.rank} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-indigo-700 dark:text-indigo-300">
                            {rankUser.username}
                            <span className="ml-1 font-normal text-indigo-400"> ({t('ranking.you')})</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('ranking.level', { level: rankUser.level })} · {rankUser.totalXP.toLocaleString()} XP</p>
                    </div>
                </div>
                {rank.xpToNextRank != null && rank.xpToNextRank > 0 && (
                    <div className="text-right">
                        <p className="text-sm font-semibold text-red-500">–{rank.xpToNextRank.toLocaleString()} XP</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{t('ranking.to_pass', { rank: rankUser.rank - 1 })}</p>
                    </div>
                )}
            </div>
            <div className="w-full bg-indigo-100 dark:bg-indigo-800/40 rounded-full h-1.5 mb-3">
                <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${rankUser.levelProgressPercentage}%` }}/>
            </div>

            {rankUser.rank === 1 && (
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {t('ranking.motivation.leader')}
                </p>
            )}
            {rankUser.rank > 1 && rank.xpToNextRank != null && rank.xpToNextRank > 0 && (
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {t('ranking.motivation.close', { xp: rank.xpToNextRank.toLocaleString(), rank: rankUser.rank - 1 })}
                </p>
            )}
        </div>
    );
}