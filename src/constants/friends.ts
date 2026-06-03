import { FriendshipStatus } from "@/types/friends/friends";

export const FRIENDS_STATUS_TITLE: Record<FriendshipStatus, string> = {
    NONE: 'friends.addFriend',
    PENDING_SENT: 'friends.pending',
    PENDING_RECEIVED: 'friends.incoming',
    ACCEPTED: 'friends.alreadyFriends',
};
