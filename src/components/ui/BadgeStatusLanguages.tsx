import { Check } from "@/assets/icons";
import { BadgeLanguagesStatus, StatusStyles } from "@/types/components/badgeLanguagesStatus";
import { Circle, PlayIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BadgeStatusLanguagesProps {
    status: BadgeLanguagesStatus;
}
export function BadgeStatusLanguages({ status }: BadgeStatusLanguagesProps) {

    const {t} = useTranslation();

    const COLORS_STATUS: Record<BadgeLanguagesStatus, StatusStyles> = {
        "COMPLETED": { label: t("components.badgeStatusLanguages.completed"), icon: <Check />, className: "bg-green-50/40 border-green-200 text-green-700 dark:bg-green-500/20 dark:border-green-500/40 dark:text-green-400" },
        "IN_PROGRESS": { label: t("components.badgeStatusLanguages.inProgress"), icon: <PlayIcon />, className: "bg-amber-50/40 border-amber-200 text-amber-700 dark:bg-amber-500/20 dark:border-amber-500/40 dark:text-amber-400" },
        "NOT_STARTED": { label: t("components.badgeStatusLanguages.notStarted"), icon: <Circle />, className: "bg-gray-100/50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400" },
    }

    const { label, icon, className } = COLORS_STATUS[status];

    return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
        {icon}
        {label}
     </span>
    );
}
