import { RankedUserResponse } from "@/types/ranking/ranking";
import { clsx } from "clsx";
import { RankBadge } from "@/components/ui/RankBadge";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileImageUrl } from "@/lib/utils/image";
import { useTranslation } from 'react-i18next';
import { ViewProfileButton } from "@/components/ui/ViewProfileButton";

interface UserRankedProps {
    userRanked: RankedUserResponse;
}

export function UserRanked({ userRanked }: UserRankedProps) {
    const {t} = useTranslation();

    const rankingRow = userRanked.isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent';

    return (
        <div className={clsx('flex items-center gap-3 px-4 py-3 rounded-xl transition-colors', rankingRow)}>
            <div className="w-7 flex justify-center shrink-0">
                <RankBadge rank={userRanked.rank} />
            </div>

            <Avatar imageUrl={userRanked.photoUrl ? getProfileImageUrl(userRanked.photoUrl) : undefined} size="w-9 h-9"/>

            <div className="flex-1 min-w-0">
                <p className={clsx('font-semibold text-sm truncate', userRanked.isCurrentUser ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white')}>
                    {userRanked.username}
                    {userRanked.isCurrentUser && (
                        <span className="ml-1 font-normal text-indigo-400 dark:text-indigo-500"> ({t('ranking.you')})</span>
                    )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{t('ranking.level', { level: userRanked.level })}</p>
            </div>

            <div className="text-right shrink-0">
                <p className={clsx('text-sm font-bold', userRanked.isCurrentUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400')}>
                    {userRanked.totalXP.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">XP</p>
            </div>
            {!userRanked.isCurrentUser && (
                <ViewProfileButton accountId={userRanked.accountId} iconOnly />
            )}
        </div>
    );
}