export type BadgeLanguagesStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

export interface StatusStyles {
    label: string;
    icon: React.ReactNode;
    className: string;
}
