import { useTranslation } from 'react-i18next';
import { FriendCard } from '@/components/ui/card/FriendCard';
import { FriendResponse } from '@/types/friends/friends';

interface FriendsListProps {
    friends: FriendResponse[];
    loading: boolean;
    onRemove: (id: string) => void;
    onNavigate?: () => void;
}

export function FriendsList({ friends, loading, onRemove, onNavigate }: FriendsListProps) {
    const { t } = useTranslation();

    if (friends.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12 text-sm">
                {t('friends.noFriends')}
            </p>
        );
    }

    return (
        <>
            {friends.map(f => (
                <FriendCard key={f.id} friend={f} loading={loading} onRemove={onRemove} onNavigate={onNavigate} />
            ))}
        </>
    );
}
