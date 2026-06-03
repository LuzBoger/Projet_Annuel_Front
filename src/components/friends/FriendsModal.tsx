import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { useFriends } from '@/hooks/useFriends';
import { Tab } from '@/types/friends/friends';
import { FriendsTabBar } from '@/components/friends/FriendsTabBar';
import { FriendsList } from '@/components/friends/FriendsList';
import { RequestsList } from '@/components/friends/RequestsList';
import { SearchUsers } from '@/components/friends/SearchUsers';

interface FriendsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FriendsModal({ isOpen, onClose }: FriendsModalProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<Tab>('friends');
    const [query, setQuery] = useState('');

    const {
        friends, pendingRequests, sentRequests, searchResults, loading,
        fetchFriends, fetchPendingRequests, fetchSentRequests,
        searchUsers, sendFriendRequest, acceptFriendRequest, declineFriendRequest, cancelFriendRequest, removeFriend,
    } = useFriends();

    useEffect(() => {
        if (!isOpen) return;
        fetchFriends();
        fetchPendingRequests();
        fetchSentRequests();
    }, [isOpen, fetchFriends, fetchPendingRequests, fetchSentRequests]);

    useEffect(() => {
        const onRequestReceived = () => fetchPendingRequests();
        const onRequestAccepted = () => { fetchFriends(); fetchSentRequests(); };

        window.addEventListener('FRIEND_REQUEST_RECEIVED', onRequestReceived);
        window.addEventListener('FRIEND_REQUEST_ACCEPTED', onRequestAccepted);
        return () => {
            window.removeEventListener('FRIEND_REQUEST_RECEIVED', onRequestReceived);
            window.removeEventListener('FRIEND_REQUEST_ACCEPTED', onRequestAccepted);
        };
    }, [fetchFriends, fetchPendingRequests, fetchSentRequests]);

    useEffect(() => {
        if (activeTab !== 'search') return;
        const timeout = setTimeout(() => searchUsers(query), 400);
        return () => clearTimeout(timeout);
    }, [query, activeTab, searchUsers]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('friends.title')} size="md">
            <FriendsTabBar
                activeTab={activeTab}
                onChange={setActiveTab}
                friendsCount={friends.length}
                pendingRequestsCount={pendingRequests.length}
            />

            <div className="overflow-y-auto max-h-[60vh] space-y-3 pr-1">
                {activeTab === 'friends' && (
                    <FriendsList friends={friends} loading={loading} onRemove={removeFriend} onNavigate={onClose} />
                )}
                {activeTab === 'requests' && (
                    <RequestsList
                        pendingRequests={pendingRequests}
                        sentRequests={sentRequests}
                        loading={loading}
                        onAccept={acceptFriendRequest}
                        onDecline={declineFriendRequest}
                        onCancel={cancelFriendRequest}
                        onNavigate={onClose}
                    />
                )}
                {activeTab === 'search' && (
                    <SearchUsers
                        query={query}
                        onChange={setQuery}
                        results={searchResults}
                        loading={loading}
                        onSend={sendFriendRequest}
                        onAccept={acceptFriendRequest}
                        onDecline={declineFriendRequest}
                        onRemove={removeFriend}
                        onNavigate={onClose}
                    />
                )}
            </div>
        </Modal>
    );
}
