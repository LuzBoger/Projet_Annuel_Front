import { NotificationPreferencesResponse } from "@/types/profile/notificationPreferences";

export const DEFAULT_SETTINGS: NotificationPreferencesResponse = {
    lessonRemindersEnabled: true,
    streakUrgencyEnabled: true,
    inactivityEnabled: true,
    weeklyGoalRemindersEnabled: true,
    reviewRemindersEnabled: true,
}

export const getLabels = (t: (key: string) => string): Record<keyof NotificationPreferencesResponse, string> => ({
    lessonRemindersEnabled: t("settings.notifications.lessonReminders"),
    streakUrgencyEnabled: t("settings.notifications.streakUrgency"),
    inactivityEnabled: t("settings.notifications.inactivity"),
    weeklyGoalRemindersEnabled: t("settings.notifications.weeklyGoal"),
    reviewRemindersEnabled: t("settings.notifications.reviewReminders"),
});