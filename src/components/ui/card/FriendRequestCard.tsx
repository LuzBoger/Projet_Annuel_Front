import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { FriendsRequestResponse, RequestType } from '@/types/friends/friends';
import { getProfileImageUrl } from '@/lib/utils/image';
import { ViewProfileButton } from '@/components/ui/ViewProfileButton';

interface FriendRequestCardProps {
    request: FriendsRequestResponse;
    loading: boolean;
    type: RequestType;
    onAccept?: (id: string) => void;
    onDecline?: (id: string) => void;
    onCancel?: (id: string) => void;
    onNavigate?: () => void;
}

export function FriendRequestCard({ request, loading, type, onAccept, onDecline, onCancel, onNavigate }: FriendRequestCardProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                {request.photoUrl ? (
                    <Avatar imageUrl={getProfileImageUrl(request.photoUrl)} size="w-10 h-10" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {request.username[0].toUpperCase()}
                    </div>
                )}
                <span className="font-medium text-gray-900 dark:text-white text-sm">{request.username}</span>
            </div>

            <div className="flex items-center gap-2">
                <ViewProfileButton accountId={request.accountId} onClick={onNavigate} />
                {type === 'incoming' ? (
                    <div className="flex gap-2">
                        <Button variant="pill-green" size="sm" disabled={loading} onClick={() => onAccept?.(request.id)}>
                            {t('friends.accept')}
                        </Button>
                        <Button variant="pill-red" size="sm" disabled={loading} onClick={() => onDecline?.(request.id)}>
                            {t('friends.decline')}
                        </Button>
                    </div>
                ) : (
                    <Button variant="pill-gray" size="sm" disabled={loading} onClick={() => onCancel?.(request.id)}>
                        {t('friends.cancel')}
                    </Button>
                )}
            </div>
        </div>
    );
}
