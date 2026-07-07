export type BadgeColor = "brand" | "blue" | "green" | "red" | "yellow" | "gray" | "purple";

export interface BadgeTagProps {
    children: React.ReactNode;
    color?: BadgeColor;
    className?: string;
    title?: string;
}
