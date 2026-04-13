import { ProgressOverviewResponse } from "@/types/progress/progress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useTranslation } from "react-i18next";

interface XpCardProps {
    overview: ProgressOverviewResponse;
}

export function XpCard({ overview }: XpCardProps) {
    const { overallLevel, levelProgressPercentage, nextLevelXP } = overview;
    const currentLevelXP = Math.max(0, overview.currentLevelXP);
    const totalLevelXP = currentLevelXP + nextLevelXP;

    const { t } = useTranslation();
      return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
            <div className="flex items-baseline justify-between mb-1">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{t("dashboard.xp.level")} {overallLevel}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    {currentLevelXP.toLocaleString()} / {totalLevelXP.toLocaleString()} XP
                </p>
            </div>
            <ProgressBar percent={levelProgressPercentage} />
        </div>
    );
}
