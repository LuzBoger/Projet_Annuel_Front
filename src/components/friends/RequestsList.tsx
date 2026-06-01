import { useTranslation } from 'react-i18next';
import { FriendRequestCard } from '@/components/ui/card/FriendRequestCard';
import { FriendsRequestResponse } from '@/types/friends/friends';

interface RequestsListProps {
    pendingRequests: FriendsRequestResponse[];
    sentRequests: FriendsRequestResponse[];
    loading: boolean;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    onCancel: (id: string) => void;
}

export function RequestsList({ pendingRequests, sentRequests, loading, onAccept, onDecline, onCancel }: RequestsListProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-5">
            <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {t('friends.incoming')}
                </p>
                {pendingRequests.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('friends.noRequests')}</p>
                ) : (
                    <div className="space-y-3">
                        {pendingRequests.map(r => (
                            <FriendRequestCard
                                key={r.id}
                                request={r}
                                loading={loading}
                                type="incoming"
                                onAccept={onAccept}
                                onDecline={onDecline}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {t('friends.sent')}
                </p>
                {sentRequests.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('friends.noSentRequests')}</p>
                ) : (
                    <div className="space-y-3">
                        {sentRequests.map(r => (
                            <FriendRequestCard
                                key={r.id}
                                request={r}
                                loading={loading}
                                type="sent"
                                onCancel={onCancel}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
