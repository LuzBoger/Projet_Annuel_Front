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
        "COMPLETED": { label: t("components.badgeStatusLanguages.completed"), icon: <Check />, className: "bg-green-50 text-green-700" },
        "IN_PROGRESS": { label: t("components.badgeStatusLanguages.inProgress"), icon: <PlayIcon />, className: "bg-amber-50 text-amber-700" },
        "NOT_STARTED": { label: t("components.badgeStatusLanguages.notStarted"), icon: <Circle />, className: "bg-gray-100 text-gray-500" },
    }

    const { label, icon, className } = COLORS_STATUS[status];

    return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
        {icon}
        {label}
     </span>
    );
}