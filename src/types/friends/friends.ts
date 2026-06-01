export type FriendshipStatus = 'NONE' | 'PENDING_SENT' | 'PENDING_RECEIVED' | 'FRIENDS';

export interface FriendResponse {
    id: string;
    accountId: string;
    username: string;
    photoUrl?: string;
    currentStreak: number;
    friendSince: string;
}

export interface FriendsRequestResponse {
    id: string;
    accountId: string;
    username: string;
    photoUrl?: string;
    createdAt: string;
}

export interface AccountSearchResponse{
    accountId: string;
    username: string;
    photoUrl?: string;
    bio?: string;
    status: FriendshipStatus;
    friendRequestId?: string;
}
export type Tab = 'friends' | 'requests' | 'search';
export type RequestType = 'incoming' | 'sent';
