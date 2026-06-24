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
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/80 transition-colors"
            title={isSubscribed ? t('settings.notifications.disable') : t('settings.notifications.enable')}
        >
            {isSubscribed ? (
                <>
                    <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{t('settings.notifications.enabled')}</span>
                </>
            ) : (
                <>
                    <BellOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>{t('settings.notifications.enable')}</span>
                </>
            )}
        </Button>
    );

}
    


