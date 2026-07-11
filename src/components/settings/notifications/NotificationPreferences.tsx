import { DEFAULT_SETTINGS, getLabels } from "@/constants/settingNotification";
import { profileService } from "@/services/profileService";
import { NotificationPreferencesResponse } from "@/types/profile/notificationPreferences";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, Flame, Clock, Trophy, Star, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/Switch";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationPreferences() {
    const {t} = useTranslation();
    const { isSubscribed, isSupported } = usePushNotifications();
    const [choices, setChoices] = useState<NotificationPreferencesResponse>(DEFAULT_SETTINGS);

    useEffect(() => {
        profileService.getNotificationPreferences().then(setChoices);
    }, []);

    const handleToggle = async (key: keyof NotificationPreferencesResponse) => {
        const updated = {...choices, [key]: !choices[key]};
        setChoices(updated);
        await profileService.updateNotificationPreferences(updated);
    };

    const config = {
        lessonRemindersEnabled: {
            icon: <BookOpen className="w-5 h-5" />,
            colorClass: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
            descKey: "settings.notifications.lessonReminders_desc"
        },
        streakUrgencyEnabled: {
            icon: <Flame className="w-5 h-5" />,
            colorClass: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
            descKey: "settings.notifications.streakUrgency_desc"
        },
        inactivityEnabled: {
            icon: <Clock className="w-5 h-5" />,
            colorClass: "bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400",
            descKey: "settings.notifications.inactivity_desc"
        },
        weeklyGoalRemindersEnabled: {
            icon: <Trophy className="w-5 h-5" />,
            colorClass: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
            descKey: "settings.notifications.weeklyGoal_desc"
        },
        reviewRemindersEnabled: {
            icon: <Star className="w-5 h-5" />,
            colorClass: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
            descKey: "settings.notifications.reviewReminders_desc"
        }
    };

    const pushDisabled = isSupported && !isSubscribed;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t("settings.notifications.title")}
                </h3>
            </div>

            {pushDisabled && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
                    <BellOff className="w-4 h-4 shrink-0" />
                    <span>{t("settings.notifications.pushRequired")}</span>
                </div>
            )}

            <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800/50 shadow-sm ${pushDisabled ? "opacity-60" : ""}`}>
                {(Object.keys(choices) as (keyof NotificationPreferencesResponse)[]).map((key) => {
                    const itemConfig = config[key];
                    return (
                        <div key={key} className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className={`p-2.5 rounded-xl shrink-0 ${itemConfig.colorClass}`}>
                                    {itemConfig.icon}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {getLabels(t)[key]}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                        {t(itemConfig.descKey)}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Switch
                                    checked={choices[key]}
                                    onChange={() => handleToggle(key)}
                                    disabled={pushDisabled}
                                    className="border border-gray-300/40 dark:border-transparent"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
