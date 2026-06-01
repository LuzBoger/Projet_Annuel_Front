import { AccountSearchResponse } from "@/types/friends/friends";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Clock, UserCheck, UserPlus, UserX } from "lucide-react";

interface FriendActionButtonProps {
    user: AccountSearchResponse;
    loading: boolean;
    onSendRequest: (accountId: string) => void;
    onAcceptRequest: (requestId: string) => void;
    onDeclineRequest: (requestId: string) => void;
    onRemoveFriend: (friendId: string) => void;
}

export function FriendActionButton({ user, loading, onSendRequest, onAcceptRequest, onDeclineRequest, onRemoveFriend }: FriendActionButtonProps) {

    const {t} = useTranslation();

  switch (user.status) {
        case 'NONE':
            return (
                <Button
                    variant="primary"
                    size="sm"
                    disabled={loading}
                    onClick={() => onSendRequest(user.accountId)}
                >
                    <UserPlus className="w-4 h-4 mr-1" />
                    {t('friends.addFriend')}
                </Button>
            );
        case 'PENDING_SENT':
            return (
                <Button
                    variant="pill-gray"
                    size="sm"
                    disabled={loading}
                    onClick={() => user.friendRequestId && onRemoveFriend(user.friendRequestId)}
                >
                    <Clock className="w-4 h-4 mr-1" />
                    {t('friends.pending')}
                </Button>
            );
        case 'PENDING_RECEIVED':
            return (
                <div className="flex gap-2">
                    <Button
                        variant="pill-green"
                        size="sm"
                        disabled={loading}
                        onClick={() => user.friendRequestId && onAcceptRequest(user.friendRequestId)}
                    >
                        <UserCheck className="w-4 h-4 mr-1" />
                        {t('friends.accept')}
                    </Button>
                    <Button
                        variant="pill-red"
                        size="sm"
                        disabled={loading}
                        onClick={() => user.friendRequestId && onDeclineRequest(user.friendRequestId)}
                    >
                        <UserX className="w-4 h-4 mr-1" />
                        {t('friends.decline')}
                    </Button>
                </div>
            );
        case 'FRIENDS':
            return (
                <Button
                    variant="pill-gray"
                    size="sm"
                    disabled={loading}
                    onClick={() => user.friendRequestId && onRemoveFriend(user.friendRequestId)}
                >
                    <UserCheck className="w-4 h-4 mr-1" />
                    {t('friends.alreadyFriends')}
                </Button>
            );
        default:
            return (
                <Button
                    variant="primary"
                    size="sm"
                    disabled={loading}
                    onClick={() => onSendRequest(user.accountId)}
                >
                    <UserPlus className="w-4 h-4 mr-1" />
                    {t('friends.addFriend')}
                </Button>
            );
    }
}