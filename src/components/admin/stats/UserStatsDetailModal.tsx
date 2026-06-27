import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminStats } from '@/hooks/useAdminStats';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Table } from '@/components/ui/Table';
import { TableColumn } from '@/types/components/tableColumn';
import { StatsCard } from '@/components/ui/card/StatsCard';
import { formatMinutes, formatSeconds } from '@/lib/utils/date';
import { Avatar } from '@/components/ui/Avatar';
import { getProfileImageUrl } from '@/lib/utils/image';

interface UserStatsDetailModalProps {
    userId: string | null;
    onClose: () => void;
}

export function UserStatsDetailModal({ userId, onClose }: UserStatsDetailModalProps) {
    const { t } = useTranslation();
    const { userDetail, loadingDetail, fetchUserDetail } = useAdminStats();

    useEffect(() => {
        if (userId) fetchUserDetail(userId);
    }, [userId, fetchUserDetail]);

    return (
        <Modal
            isOpen={!!userId}
            onClose={onClose}
            title={userDetail && !loadingDetail ? `${t('admin.stats.statsOf')} ${userDetail.username}` : t('common.loading')}
            size="xl"
        >
            {loadingDetail || !userDetail ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        {userDetail.photoUrl ? (
                            <Avatar imageUrl={userDetail.photoUrl ? getProfileImageUrl(userDetail.photoUrl) : undefined} size="w-9 h-9"/>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold shrink-0">
                                {userDetail.username[0].toUpperCase()}
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">{userDetail.username}</p>
                            <p className="text-sm text-gray-400 truncate">{userDetail.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <StatsCard title={t('admin.stats.totalXP')} value={userDetail.totalXP.toLocaleString()} variant="amber" className="p-3" />
                        <StatsCard title={t('admin.stats.avgAccuracy')} value={`${userDetail.avgAccuracy}%`} variant="emerald" className="p-3" />
                        <StatsCard title={t('admin.stats.studyTime')} value={formatMinutes(userDetail.totalStudyTimeMinutes)} variant="blue" className="p-3" />
                        <StatsCard title={t('admin.stats.lessons')} value={userDetail.totalLessonsCompleted.toLocaleString()} variant="default" className="p-3" />
                        <StatsCard title={t('admin.stats.currentStreak')} value={`${userDetail.currentStreak}j`} variant="rose" className="p-3" />
                        <StatsCard title={t('admin.stats.longestStreak')} value={`${userDetail.longestStreak}j`} variant="default" className="p-3" />
                        <StatsCard title={t('admin.stats.topicsCompleted')} value={userDetail.topicsCompleted.toLocaleString()} variant="default" className="p-3" />
                    </div>

                    {userDetail.topicStats.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {t('admin.stats.topicBreakdown')}
                            </p>
                            <Table
                                data={userDetail.topicStats}
                                columns={[
                                    { key: 'topic', label: t('admin.stats.topic') },
                                    { key: 'completion', label: t('admin.stats.completion') },
                                    { key: 'xp', label: 'XP', align: 'center' },
                                    { key: 'accuracy', label: t('admin.stats.accuracy'), align: 'center' },
                                    { key: 'time', label: t('admin.stats.time'), align: 'center' },
                                ] as TableColumn[]}
                                keyExtractor={topic => topic.topicId}
                                showControls={true}
                                renderRow={topic => (
                                    <>
                                        <td className="py-3 px-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{topic.topicName}</p>
                                            <p className="text-xs text-gray-400">{topic.languageName}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <ProgressBar percent={topic.completionPercentage} />
                                                </div>
                                                <span className="text-xs text-gray-500 shrink-0">
                                                    {topic.completionPercentage.toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
                                            {topic.totalXP} XP
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
                                            {topic.accuracy != null ? `${topic.accuracy.toFixed(1)}%` : '—'}
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
                                            {formatSeconds(topic.studyTimeSeconds)}
                                        </td>
                                    </>
                                )}
                            />
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
}
