import { usePushNotifications } from "@/hooks/usePushNotifications";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { Bell, BellOff } from "lucide-react";

export function NotificationToggle() {
    const {t} = useTranslation();
    const { isSubscribed, isSupported, subscribeUser, unsubscribeUser } = usePushNotifications();

    if (!isSupported) {
        return null;
    }
    
    return (
        <Button
            variant="none"
            onClick={isSubscribed ? unsubscribeUser : subscribeUser}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                       bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            title={isSubscribed ? t('notifications.disable') : t('notifications.enable')}
        >
            {isSubscribed ? (
                <>
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <span>{t('notifications.enabled')}</span>
                </>
            ) : (
                <>
                    <BellOff className="w-4 h-4 text-gray-500" />
                    <span>{t('notifications.enable')}</span>
                </>
            )}
        </Button>
    );

}
    


