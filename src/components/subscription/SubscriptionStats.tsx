import { SubscriptionStats } from "@/types/subscription/stats";
import { StatsCard } from "../ui/card/StatsCard";
import { useTranslation } from "react-i18next";

interface SubscriptionStatsProps {
    stats: SubscriptionStats;
}

export function SubscriptionStats({ stats }: SubscriptionStatsProps) {
    const { t } = useTranslation();
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title={t("subscription.stats.totalActiveSubscribers")} value={stats.activeSubscribers} color="text-brand-600" />
                <StatsCard title={t("subscription.stats.totalRevenue")} value={stats.totalRevenue.toFixed(2)} color="text-red-600" />
            </div>
    )
}
