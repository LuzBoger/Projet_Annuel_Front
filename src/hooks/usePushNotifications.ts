import { urlBase64ToUint8Array } from "@/lib/utils/pushNotification";
import apiClient from "@/services/axios";
import { useEffect, useState } from "react";

export function usePushNotifications() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSupported] = useState(() => typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window);

    useEffect(() => {
        if (!isSupported) {
            return;
        }
        navigator.serviceWorker.ready.then(async registration => {
            const subscription = await registration.pushManager.getSubscription();
            if (!subscription) {
                setIsSubscribed(false);
                return;
            }
            const { data } = await apiClient.get('/push-notifications/status', {
                params: { endpoint: subscription.endpoint }
            });
            setIsSubscribed(data);
        });
    }, [isSupported]);

    const subscribeUser = async () => {

        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            const { data: publicKey } = await apiClient.get('/push-notifications/vapid-public-key');
            
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });
            const keys = subscription.toJSON().keys;
            await apiClient.post('/push-notifications/subscribe', {
                endpoint: subscription.endpoint,
                publicKey: keys?.p256dh,
                auth: keys?.auth
            });
            setIsSubscribed(true);
        } catch (error) {
            console.error('Failed to subscribe the user: ', error);
        }
    };

    const unsubscribeUser = async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        const subscription = await registration?.pushManager.getSubscription();
        if(subscription) {
            await apiClient.delete('/push-notifications/unsubscribe', {
                data: {
                    endpoint: subscription.endpoint
                }
            });
            setIsSubscribed(false);
        }
     };

     return { isSubscribed, isSupported, subscribeUser, unsubscribeUser };
}