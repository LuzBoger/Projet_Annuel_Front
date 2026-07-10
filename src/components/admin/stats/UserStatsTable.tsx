import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminStats } from '@/hooks/useAdminStats';
import { BadgeTag } from '@/components/ui/BadgeTag';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { TableColumn } from '@/types/components/tableColumn';
import { UserStatsDetailModal } from '@/components/admin/stats/UserStatsDetailModal';
import { UserEditModal } from '@/components/admin/stats/UserEditModal';
import { Edit, Eye } from '@/assets/icons';
import { UserStatsResponse } from '@/types/admin/stats/stats';
import { formatSeconds } from '@/lib/utils/date';

export function UserStatsTable() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const { userStatsList, loadingUsers, fetchUserStats } = useAdminStats();

    const [search, setSearch] = useState('');
    const [detailUserId, setDetailUserId] = useState<string | null>(null);
    const [editUser, setEditUser] = useState<UserStatsResponse | null>(null);

    useEffect(() => {
        fetchUserStats('', 0, 10);
    }, [fetchUserStats]);

    const filtered = useMemo(() => {
        const users = userStatsList?.users ?? [];
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter(user => user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }, [userStatsList?.users, search]);

    const columns: TableColumn[] = [
        { key: 'user', label: t('admin.stats.table.user')},
        { key: 'status', label: t('admin.stats.table.status') },
        { key: 'xp', label: 'XP', align: 'center'},
        { key: 'accuracy', label: t('admin.stats.avgAccuracy'), align: 'center'},
        { key: 'time', label: t('admin.stats.studyTime'), align: 'center'},
        { key: 'streak',label: 'Streak', align: 'center'},
        { key: 'lessons', label: t('admin.stats.lessons'), align: 'center'},
        { key: 'topics', label: t('admin.stats.topicsCompleted'), align: 'center'},
        { key: 'activity', label: t('admin.stats.table.lastActivity'), align: 'center'},
        { key: 'actions', label: t('common.actions') },
    ];

    return (
        <div className="w-full space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('admin.stats.usersTitle')}
                    </h2>
                    {userStatsList && (
                        <p className="text-sm text-gray-400">
                            {userStatsList.totalUsers.toLocaleString()} {t('admin.stats.usersCount')}
                        </p>
                    )}
                </div>
                <div className="w-full sm:w-64">
                    <Input
                        placeholder={t('common.search')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Table
                data={filtered}
                columns={columns}
                keyExtractor={u => u.accountId}
                emptyMessage={t('common.empty')}
                itemLabel={t('admin.stats.usersCount')}
                initialItemsPerPage={10}
                renderRow={user => (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <BadgeTag color={user.status === 'ACTIVE' ? 'green' : user.status === 'LOCKED' ? 'yellow' : 'red'}>
                                {t(`admin.users.status.${user.status.toLowerCase()}`)}
                            </BadgeTag>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.totalXP.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.avgAccuracy}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {formatSeconds(user.totalStudyTimeMinutes)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.currentStreak}j
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.totalLessonsCompleted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.topicsCompleted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {user.lastActivityAt
                                ? new Date(user.lastActivityAt).toLocaleDateString(locale)
                                : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2 justify-end">
                                <IconButton
                                    icon={<Eye className="w-4 h-4" />}
                                    title={t('common.view')}
                                    onClick={() => setDetailUserId(user.accountId)}
                                />
                                <IconButton
                                    icon={<Edit className="w-4 h-4" />}
                                    title={t('common.edit')}
                                    onClick={() => setEditUser(user)}
                                />
                            </div>
                        </td>
                    </>
                )}
            />

            {loadingUsers && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 px-6 flex items-center">
                            <div className="h-4 w-48 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
                        </div>
                    ))}
                </div>
            )}

            <UserStatsDetailModal
                userId={detailUserId}
                onClose={() => setDetailUserId(null)}
            />

            <UserEditModal
                user={editUser}
                onClose={() => setEditUser(null)}
                onSuccess={() => {
                    setEditUser(null);
                    fetchUserStats('', 0, 10);
                }}
            />
        </div>
    );
}
