import { useState, useCallback } from 'react';
import { friendsService } from '@/services/friendsService';
import type { FriendResponse, FriendsRequestResponse, AccountSearchResponse } from '@/types/friends/friends';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useFriends() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [friends, setFriends] = useState<FriendResponse[]>([]);
    const [pendingRequests, setPendingRequests] = useState<FriendsRequestResponse[]>([]);
    const [sentRequests, setSentRequests] = useState<FriendsRequestResponse[]>([]);
    const [searchResults, setSearchResults] = useState<AccountSearchResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFriends = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await friendsService.getFriends();
            setFriends(data);
        } catch {
            const errorMessage = t('error.fetchFriends');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchPendingRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await friendsService.getPendingRequests();
            setPendingRequests(data);
        } catch {
            const errorMessage = t('error.fetchPendingRequests');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchSentRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await friendsService.getSentRequests();
            setSentRequests(data);
        } catch {
            const errorMessage = t('error.fetchSentRequests');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const searchUsers = useCallback(async (query: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await friendsService.searchUsers(query);
            setSearchResults(data);
        } catch {
            const errorMessage = t('error.searchUsers');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const sendFriendRequest = useCallback(async (receiverId: string) => {
        try {
            setLoading(true);
            setError(null);
            const newRequest = await friendsService.sendFriendRequest(receiverId);
            setSentRequests(prev => [...prev, newRequest]);
            setSearchResults(prev =>
                prev.map(user => user.accountId === receiverId ? { ...user, status: 'PENDING_SENT', friendRequestId: newRequest.id } : user
            )
            );
            addToast({ type: 'success', message: t('friends.sendRequest.success') });
            return newRequest;
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.sendFriendRequest');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const acceptFriendRequest = useCallback(async (requestId: string) => {
        try {
            setLoading(true);
            setError(null);
            const newFriend = await friendsService.acceptFriendRequest(requestId);
            setFriends(prev => [...prev, newFriend]);
            setPendingRequests(prev => prev.filter(r => r.id !== requestId));
            addToast({ type: 'success', message: t('friends.acceptRequest.success') });
            return newFriend;
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.acceptFriendRequest');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const declineFriendRequest = useCallback(async (requestId: string) => {
        try {
            setLoading(true);
            setError(null);
            await friendsService.declineFriendRequest(requestId);
            setPendingRequests(prev => prev.filter(r => r.id !== requestId));
            addToast({ type: 'success', message: t('friends.declineRequest.success') });
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.declineFriendRequest');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const cancelFriendRequest = useCallback(async (requestId: string) => {
        try {
            setLoading(true);
            setError(null);
            await friendsService.cancelFriendRequest(requestId);
            setSentRequests(prev => prev.filter(r => r.id !== requestId));
            setSearchResults(prev =>
                prev.map(user => user.friendRequestId === requestId ? { ...user, status: 'NONE', friendRequestId: undefined } : user)
            );
            addToast({ type: 'success', message: t('friends.cancelRequest.success') });
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.cancelFriendRequest');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const removeFriend = useCallback(async (friendId: string) => {
        try {
            setLoading(true);
            setError(null);
            await friendsService.removeFriend(friendId);
            setFriends(prev => prev.filter(f => f.id !== friendId));
            addToast({ type: 'success', message: t('friends.removeFriend.success') });
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.removeFriend');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        friends,
        pendingRequests,
        sentRequests,
        searchResults,
        loading,
        error,
        fetchFriends,
        fetchPendingRequests,
        fetchSentRequests,
        searchUsers,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        cancelFriendRequest,
        removeFriend,
    };
}
