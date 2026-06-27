import { useTranslation } from 'react-i18next';
import { MetaData } from '@/components/seo/MetaData';
import { UserEngagementStats } from '@/components/admin/stats/UserEngagementStats';
import { LearningMetricsStats } from '@/components/admin/stats/LearningMetricsStats';
import { UserStatsTable } from '@/components/admin/stats/UserStatsTable';

export default function AdminUserStats() {
    const { t } = useTranslation();

    return (
        <>
            <MetaData title={t('admin.stats.pageTitle')} robots="noindex, nofollow" />
            <div className="flex flex-col space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-900 dark:text-white mb-6">
                        {t('admin.stats.pageTitle')}
                    </h1>
                </div>

                <div>
                    <h2 className="text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                        {t('admin.stats.engagement')}
                    </h2>
                    <UserEngagementStats />
                </div>

                <div>
                    <h2 className="text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                        {t('admin.stats.learningMetrics')}
                    </h2>
                    <LearningMetricsStats />
                </div>

                <UserStatsTable />
            </div>
        </>
    );
}
