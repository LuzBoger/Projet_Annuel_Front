import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MetaData } from "@/components/seo/MetaData";
import { StatsCard } from "@/components/ui/card/StatsCard";
import { useAdminStats } from "@/hooks/useAdminStats";
import { useSubscription } from "@/hooks/useSubscription";
import { User, StarIcon, BookOpen, Brain, Eye, ChevronRight } from "@/assets/icons";

const sections = [
    { to: "/admin/stats", label: "admin.nav.stats", description: "admin.dashboard.statsDesc", icon: User, variant: "brand" as const },
    { to: "/admin/subscriptions", label: "admin.nav.subscriptions", description: "admin.dashboard.subscriptionsDesc", icon: StarIcon, variant: "amber" as const },
    { to: "/admin/plans", label: "admin.nav.plans", description: "admin.dashboard.plansDesc", icon: BookOpen, variant: "blue" as const },
    { to: "/admin/languages", label: "admin.nav.languages", description: "admin.dashboard.languagesDesc", icon: Brain, variant: "emerald" as const },
    { to: "/admin/topics", label: "admin.nav.topics", description: "admin.dashboard.topicsDesc", icon: BookOpen, variant: "rose" as const },
    { to: "/admin/reviews", label: "admin.nav.reviews", description: "admin.dashboard.reviewsDesc", icon: Eye, variant: "default" as const },
];

export default function AdminDashboard() {
    const { t } = useTranslation();
    const { engagement, learningMetrics, loadingEngagement, loadingMetrics, fetchAllStats } = useAdminStats();
    const { subscriptionStats, fetchSubscriptionStats } = useSubscription();

    useEffect(() => {
        fetchAllStats();
        fetchSubscriptionStats();
    }, [fetchAllStats, fetchSubscriptionStats]);

    return (
        <>
            <MetaData title={t('admin.dashboard.title')} robots="noindex, nofollow" />
            <div className="flex flex-col space-y-10">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('admin.dashboard.title')}</h1>
                    <p className="text-sm text-gray-400 mt-1">{t('admin.dashboard.subtitle')}</p>
                </div>

                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                        {t('admin.stats.engagement')}
                    </h2>
                    {loadingEngagement || !engagement ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard title={t('admin.stats.totalUsers')} value={engagement.totalUsers.toLocaleString()} variant="brand" />
                            <StatsCard title={t('admin.stats.newUsers7d')} value={engagement.newUsersLast7Days.toLocaleString()} variant="emerald" />
                            <StatsCard title={t('admin.stats.activeUsers7d')} value={engagement.activeUsersLast7Days.toLocaleString()} variant="emerald" />
                            <StatsCard title={t('admin.stats.activeStreaks')} value={engagement.usersWithActiveStreak.toLocaleString()} variant="rose" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Learning metrics */}
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                            {t('admin.stats.learningMetrics')}
                        </h2>
                        {loadingMetrics || !learningMetrics ? (
                            <div className="grid grid-cols-2 gap-4 animate-pulse">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <StatsCard title={t('admin.stats.avgAccuracy')} value={`${learningMetrics.avgAccuracy.toFixed(1)}%`} variant="default" />
                                <StatsCard title={t('admin.stats.avgCompletion')} value={`${learningMetrics.avgCompletionPercentage.toFixed(1)}%`} variant="default" />
                                <StatsCard
                                    title={t('admin.stats.totalStudyTime')}
                                    value={(() => {
                                        const h = Math.floor(learningMetrics.totalStudyTimeMinutes / 60);
                                        const m = learningMetrics.totalStudyTimeMinutes % 60;
                                        return h === 0 ? `${m}m` : m > 0 ? `${h}h ${m}m` : `${h}h`;
                                    })()}
                                    variant="blue"
                                />
                                {learningMetrics.mostPopularLanguage && (
                                    <StatsCard title={t('admin.stats.mostPopularLanguage')} value={learningMetrics.mostPopularLanguage} variant="amber" />
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                            {t('admin.nav.subscriptions')}
                        </h2>
                        {!subscriptionStats ? (
                            <div className="grid grid-cols-2 gap-4 animate-pulse">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <StatsCard title={t('admin.dashboard.activeSubscribers')} value={subscriptionStats.activeSubscribers.toLocaleString()} variant="brand" />
                                <StatsCard title="Premium" value={subscriptionStats.premiumSubscribers.toLocaleString()} variant="amber" />
                                <StatsCard title="Free" value={subscriptionStats.freeSubscribers.toLocaleString()} variant="default" />
                                <StatsCard title={t('admin.dashboard.totalRevenue')} value={`${subscriptionStats.totalRevenue.toLocaleString()}€`} variant="emerald" />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                        {t('admin.dashboard.sections')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sections.map(({ to, label, description, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className="group flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t(label)}</p>
                                    <p className="text-xs text-gray-400 truncate">{t(description)}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}
