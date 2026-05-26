import { getNextMilestone, getPrevMilestone } from "@/lib/utils/streak";
import { StreakResponse } from "@/types/profile/streak";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useTranslation } from "react-i18next";

interface StreakCardProps {
    streak: StreakResponse;
}

export function StreakCard({ streak }: StreakCardProps) {
    const {t} = useTranslation();

    const nextMilestone = getNextMilestone(Math.max(streak.currentStreak, 1));
    const prevMilestone = getPrevMilestone(Math.max(streak.currentStreak, 1));

    const progress = ((streak.currentStreak - prevMilestone) / (nextMilestone - prevMilestone)) * 100;
    const dayLeft = nextMilestone - streak.currentStreak;

    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex items-baseline justify-between mb-1">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                    🔥 {streak.currentStreak} {t("dashboard.streak.days")}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    {t("dashboard.streak.best")} {streak.longestStreak}
                </p>
            </div>
            <ProgressBar percent={Math.min(progress, 100)} />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t("dashboard.streak.milestone", { days: dayLeft })} 🏆
            </p>
        </div>
    );
}

