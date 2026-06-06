import { AccountSearchResponse, FriendResponse, FriendsRequestResponse } from "@/types/friends/friends";
import apiClient from "@/services/axios";

export const friendsService = {
    async getFriends(): Promise<FriendResponse[]> {
        const response = await apiClient.get<FriendResponse[]>('/friends/list');
        return response.data;
    },
    async getPendingRequests(): Promise<FriendsRequestResponse[]> {
        const response = await apiClient.get<FriendsRequestResponse[]>('/friends/list/pending-requests');
        return response.data;
    },

    async getSentRequests(): Promise<FriendsRequestResponse[]> {
        const response = await apiClient.get<FriendsRequestResponse[]>('/friends/list/sent-requests');
        return response.data;
    },

    async searchUsers(query: string): Promise<AccountSearchResponse[]> {
        const response = await apiClient.get<AccountSearchResponse[]>('/friends/search', {
            params: { query },
        });
        return response.data;
    },

    async sendFriendRequest(receiverId: string): Promise<FriendsRequestResponse> {
        const response = await apiClient.post<FriendsRequestResponse>('/friends/send-request', null, {
            params: { receiverId },
        });
        return response.data;
    },

    async acceptFriendRequest(requestId: string): Promise<FriendResponse> {
        const response = await apiClient.put<FriendResponse>('/friends/accept-request', null, {
            params: { requestId },
        });
        return response.data;
    },

    async declineFriendRequest(requestId: string): Promise<void> {
        await apiClient.delete('/friends/decline-request', {
            params: { requestId },
        });
    },

    async cancelFriendRequest(requestId: string): Promise<void> {
        await apiClient.delete('/friends/cancel-request', {
            params: { requestId },
        });
    },

    async removeFriend(friendId: string): Promise<void> {
        await apiClient.delete('/friends/remove', {
            params: { friendId },
        });
    },
};
