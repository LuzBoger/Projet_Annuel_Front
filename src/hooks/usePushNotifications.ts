import { useContext } from "react";
import { PushNotificationContext } from "@/contexts/PushNotificationContext";

export function usePushNotifications() {
    const ctx = useContext(PushNotificationContext);
    if (!ctx) throw new Error('usePushNotifications must be used inside PushNotificationProvider');
    return ctx;
}
