import { DEFAULT_SETTINGS, getLabels } from "@/constants/settingNotification";
import { profileService } from "@/services/profileService";
import { NotificationPreferencesResponse } from "@/types/profile/notificationPreferences";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function NotificationPreferences() {
    const {t} = useTranslation();
    const [choices, setChoices] = useState<NotificationPreferencesResponse>(DEFAULT_SETTINGS);

    useEffect(() => {
        profileService.getNotificationPreferences().then(setChoices);
    }, []);
    const handleToggle = async (key: keyof NotificationPreferencesResponse) => {
        const updated = {...choices, [key]: !choices[key]};
        setChoices(updated);
        await profileService.updateNotificationPreferences(updated);
    }
    
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("settings.notifications.title")}
            </h3>
            {(Object.keys(choices) as (keyof NotificationPreferencesResponse)[]).map((key) => (
                <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{getLabels(t)[key]}</span>
                    <input
                        type="checkbox"
                        checked={choices[key]}
                        onChange={() => handleToggle(key)}
                    />
                </div>
            ))}
        </div>
    );
}
