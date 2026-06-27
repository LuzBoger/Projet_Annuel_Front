import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminStats } from '@/hooks/useAdminStats';
import { StatsCard } from '@/components/ui/card/StatsCard';
import { formatMinutes } from '@/lib/utils/date';

export function LearningMetricsStats() {
    const { t } = useTranslation();
    const { learningMetrics, loadingMetrics, fetchLearningMetrics } = useAdminStats();

    useEffect(() => {
        fetchLearningMetrics();
    }, [fetchLearningMetrics]);

    if (loadingMetrics || !learningMetrics) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
                title={t('admin.stats.avgAccuracy')}
                value={`${learningMetrics.avgAccuracy.toFixed(1)}%`}
                variant="default"
            />
            <StatsCard
                title={t('admin.stats.avgCompletion')}
                value={`${learningMetrics.avgCompletionPercentage.toFixed(1)}%`}
                variant="default"
            />
            <StatsCard
                title={t('admin.stats.totalStudyTime')}
                value={formatMinutes(learningMetrics.totalStudyTimeMinutes)}
                variant="blue"
            />
            {learningMetrics.mostPopularLanguage && (
                <StatsCard
                    title={t('admin.stats.mostPopularLanguage')}
                    value={learningMetrics.mostPopularLanguage}
                    variant="amber"
                />
            )}
        </div>
    );
}
