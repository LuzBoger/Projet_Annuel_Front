export const getMessages = (t: (key: string) => string): Record<string, string[]> => ({
    morning: [
        t("dashboard.welcome.morning.0"),
        t("dashboard.welcome.morning.1"),
        t("dashboard.welcome.morning.2"),
        t("dashboard.welcome.morning.3"),
        t("dashboard.welcome.morning.4"),
        t("dashboard.welcome.morning.5"),
    ],
    afternoon: [
        t("dashboard.welcome.afternoon.0"),
        t("dashboard.welcome.afternoon.1"),
        t("dashboard.welcome.afternoon.2"),
        t("dashboard.welcome.afternoon.3"),
        t("dashboard.welcome.afternoon.4"),
        t("dashboard.welcome.afternoon.5"),
    ],
    evening: [
        t("dashboard.welcome.evening.0"),
        t("dashboard.welcome.evening.1"),
        t("dashboard.welcome.evening.2"),
        t("dashboard.welcome.evening.3"),
        t("dashboard.welcome.evening.4"),
        t("dashboard.welcome.evening.5"),
    ],
});
