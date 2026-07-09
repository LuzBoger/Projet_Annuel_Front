import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useEffect, useRef } from "react";
import { API_URL, SSE_EVENT } from "@/constants/global";
import { NotificationType } from "@/types/components/notification";

export function useNotifications(onReviewAuto?: () => void) {

    const { t } = useTranslation();
    const { user } = useAuth();
    const { addToast } = useToast();
    const addToastRef = useRef(addToast);
    const tRef = useRef(t);
    const onReviewAutoRef = useRef(onReviewAuto);

    useEffect(() => { addToastRef.current = addToast; }, [addToast]);
    useEffect(() => { tRef.current = t; }, [t]);
    useEffect(() => { onReviewAutoRef.current = onReviewAuto; }, [onReviewAuto]);

    useEffect(() => {
        if (!user) return;

        const eventSource = new EventSource(
            `${API_URL}/notifications/stream`,
            { withCredentials: true }
        );

        Object.entries(SSE_EVENT).forEach(([eventName, { key, type }]) => {
            eventSource.addEventListener(eventName, () => {
                addToastRef.current({ message: tRef.current(key), type: type as NotificationType });
                window.dispatchEvent(new CustomEvent(eventName));
                if (eventName === "REVIEW_AUTO_REJECTED" || eventName === "REVIEW_REJECTED" || eventName === "REVIEW_APPROVED") {
                    onReviewAutoRef.current?.();
                }
            });
        });

        return () => {
            eventSource.close();
        };
    }, [user]);
}
