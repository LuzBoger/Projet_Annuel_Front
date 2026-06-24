import { useAuth } from "@/hooks/useAuth";
import { useChallengeNotificationSocket } from "@/hooks/useChallengeNotificationSocket";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function ChallengeNotification() {
    const {user} = useAuth();
    const {t} = useTranslation();
    const {addToast} = useToast();
    const {notif, clearInvite} = useChallengeNotificationSocket(user?.id || '');

    useEffect(() => {
        if(!notif) {
            return;
        }

        addToast({
            type: 'info',
            message: t('challenge.notification.invite', { from: notif.username }),
        });
        clearInvite();
    }, [notif, addToast, clearInvite, t]);

    return null;
}