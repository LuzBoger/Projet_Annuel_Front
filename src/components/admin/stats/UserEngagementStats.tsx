import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminStats } from '@/hooks/useAdminStats';
import { StatsCard } from '@/components/ui/card/StatsCard';
import { UserGrowthChart } from '@/components/admin/stats/UserGrowthChart';

export function UserEngagementStats() {
    const { t } = useTranslation();
    const { engagement, loadingEngagement, fetchEngagement } = useAdminStats();

    useEffect(() => {
        fetchEngagement();
    }, [fetchEngagement]);

    if (loadingEngagement || !engagement) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                    ))}
                </div>
                <div className="h-[360px] rounded-2xl bg-gray-100 dark:bg-gray-800" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t('admin.stats.totalUsers')}
                    value={(engagement.totalUsers ?? 0).toLocaleString()}
                    variant="brand"
                />
                <StatsCard
                    title={t('admin.stats.newUsers7d')}
                    value={(engagement.newUsersLastSevenDays ?? 0).toLocaleString()}
                    variant="emerald"
                />
                <StatsCard
                    title={t('admin.stats.activeUsers7d')}
                    value={(engagement.activeUsersLastSevenDays ?? 0).toLocaleString()}
                    variant="emerald"
                />
                <StatsCard
                    title={t('admin.stats.activeStreaks')}
                    value={(engagement.usersWithActiveStreak ?? 0).toLocaleString()}
                    variant="rose"
                />
            </div>
            <UserGrowthChart data={engagement.newUsersByMonth} />
        </div>
    );
}
