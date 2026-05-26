import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { API_URL, SSE_EVENT } from "@/constants/global";
import { NotificationType } from "@/types/components/notification";

export function useNotifications(onReviewAuto?: () => void) {

    const {t} = useTranslation();
    const  {user} = useAuth();
    const {addToast} = useToast();

    useEffect(() => {
        if(!user) {
            return;
        }

        const eventSource = new EventSource(
            `${API_URL}/notifications/stream`,
            { withCredentials: true }
        );

        Object.entries(SSE_EVENT).forEach(([eventName, { key, type }]) => {
            eventSource.addEventListener(eventName, () => {
                addToast({ message: t(key), type: type as NotificationType });
                window.dispatchEvent(new CustomEvent(eventName));
                if(eventName === "REVIEW_AUTO_REJECTED" || eventName === "REVIEW_REJECTED" || eventName === "REVIEW_APPROVED") {
                    onReviewAuto?.();
                }
            });
        });

        eventSource.onerror = () => eventSource.close();
        return () => {
            eventSource.close();
        };
    }, [user, addToast, t, onReviewAuto]);
}