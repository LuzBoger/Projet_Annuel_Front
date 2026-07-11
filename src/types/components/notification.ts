export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface PushNotificationContextType {
    isSubscribed: boolean;
    isSupported: boolean;
    subscribeUser: () => Promise<void>;
    unsubscribeUser: () => Promise<void>;
}