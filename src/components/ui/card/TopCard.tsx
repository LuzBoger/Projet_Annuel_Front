import { RankedUserResponse } from "@/types/ranking/ranking";
import { useTranslation } from "react-i18next";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileImageUrl } from "@/lib/utils/image";
import { clsx } from "clsx";
import { Medal } from "lucide-react";
import { MEDALS_COLORS, TOP_RANK_COLORS } from "@/constants/colors";
import { ViewProfileButton } from "@/components/ui/ViewProfileButton";

interface TopCardProps {
    user: RankedUserResponse;
}

export function TopCard({ user }: TopCardProps) {
    const { t } = useTranslation();
    return (
        <div className={clsx('relative flex flex-col items-center gap-2 p-3 rounded-2xl border text-center', user.isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700/50' : TOP_RANK_COLORS[user.rank])}>
            {!user.isCurrentUser && (
                <div className="absolute top-1.5 right-1.5">
                    <ViewProfileButton accountId={user.accountId} iconOnly />
                </div>
            )}
            <Medal className={clsx('w-7 h-7', MEDALS_COLORS[user.rank])} />
            <Avatar imageUrl={user.photoUrl ? getProfileImageUrl(user.photoUrl) : undefined} size="w-10 h-10"/>
            <div className="min-w-0 w-full">
                <p className={clsx('text-xs font-semibold truncate', user.isCurrentUser ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white')}>
                    {user.username}
                    {user.isCurrentUser && <span className="ml-1 font-normal text-indigo-400"> ({t('ranking.you')})</span>}
                </p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">
                    {user.totalXP.toLocaleString()} XP
                </p>
            </div>
        </div>
    );
}
