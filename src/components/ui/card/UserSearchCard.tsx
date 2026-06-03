import { FriendActionButton } from '@/components/friends/FriendActionButton';
import { Avatar } from '@/components/ui/Avatar';
import { getProfileImageUrl } from '@/lib/utils/image';
import { AccountSearchResponse } from '@/types/friends/friends';
import { ViewProfileButton } from '@/components/ui/ViewProfileButton';

interface UserSearchCardProps {
    user: AccountSearchResponse;
    loading: boolean;
    onSend: (accountId: string) => void;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    onRemove: (id: string) => void;
    onNavigate?: () => void;
}

export function UserSearchCard({ user, loading, onSend, onAccept, onDecline, onRemove, onNavigate }: UserSearchCardProps) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {user.photoUrl ? (
                    <Avatar imageUrl={getProfileImageUrl(user.photoUrl)} size="w-10 h-10 flex-shrink-0" />
                ) : (
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {(user.username[0]).toUpperCase()}
                    </div>
                )}
                <span className="font-medium text-gray-900 dark:text-white text-sm truncate">{user.username}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <ViewProfileButton accountId={user.accountId} onClick={onNavigate} />
                <FriendActionButton
                    user={user}
                    loading={loading}
                    onSendRequest={onSend}
                    onAcceptRequest={onAccept}
                    onDeclineRequest={onDecline}
                    onRemoveFriend={onRemove}
                />
            </div>
        </div>
    );
}