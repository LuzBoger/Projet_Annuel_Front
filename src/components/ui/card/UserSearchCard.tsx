import { FriendActionButton } from '@/components/friends/FriendActionButton';
import { Avatar } from '@/components/ui/Avatar';
import { getProfileImageUrl } from '@/lib/utils/image';
import { AccountSearchResponse } from '@/types/friends/friends';

interface UserSearchCardProps {
    user: AccountSearchResponse;
    loading: boolean;
    onSend: (accountId: string) => void;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    onRemove: (id: string) => void;
}

export function UserSearchCard({ user, loading, onSend, onAccept, onDecline, onRemove }: UserSearchCardProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                {user.photoUrl ? (
                    <Avatar imageUrl={getProfileImageUrl(user.photoUrl)} size="w-10 h-10" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {(user.username[0]).toUpperCase()}
                    </div>
                )}
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{user.username}</p>
                    {user.bio && (
                        <p className="text-xs text-gray-400 truncate max-w-[180px]">{user.bio}</p>
                    )}
                </div>
            </div>
            <FriendActionButton
                user={user}
                loading={loading}
                onSendRequest={onSend}
                onAcceptRequest={onAccept}
                onDeclineRequest={onDecline}
                onRemoveFriend={onRemove}
            />
        </div>
    );
}