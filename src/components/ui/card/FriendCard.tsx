import { FriendResponse } from "@/types/friends/friends";
import { useTranslation } from "react-i18next";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { getProfileImageUrl } from "@/lib/utils/image";

interface FriendCardProps {
    friend: FriendResponse;
    loading: boolean;
    onRemove: (friendId: string) => void;
}

export function FriendCard({ friend, loading, onRemove }: FriendCardProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                {friend.photoUrl ? (
                    <Avatar imageUrl={getProfileImageUrl(friend.photoUrl)} size="w-10 h-10" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {(friend.username[0]).toUpperCase()}
                    </div>
                )}
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{friend.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        🔥 {friend.currentStreak} {t('friends.streak')}
                    </p>
                </div>
            </div>
            <Button
                variant="pill-red"
                size="sm"
                disabled={loading}
                onClick={() => onRemove(friend.id)}
            >
                {t('friends.remove')}
            </Button>
        </div>
    );
}
