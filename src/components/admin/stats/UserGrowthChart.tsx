import { useContext } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { UserGrowthByMonthResponse } from '@/types/admin/stats/stats';

interface UserGrowthChartProps {
    data: UserGrowthByMonthResponse[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
    const themeCtx = useContext(ThemeContext);
    const isDark = themeCtx?.theme === 'dark';
    const { t } = useTranslation();

    const chartData = data.map(item => ({
        label: item.month,
        [t('admin.stats.newUsers')]: item.count,
    }));

    const isEmpty = chartData.length === 0;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">
                {t('admin.stats.userGrowthTitle')}
            </h3>

            {isEmpty ? (
                <div className="flex items-center justify-center h-[300px] text-slate-400 dark:text-slate-500 text-sm">
                    {t('common.noData')}
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#f1f5f9'} vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: `1px solid ${isDark ? '#1f2937' : '#e2e8f0'}`,
                                backgroundColor: isDark ? '#030712' : '#ffffff',
                                color: isDark ? '#f9fafb' : '#0f172a',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                fontSize: '13px',
                            }}
                            cursor={{ fill: isDark ? '#111827' : '#f8fafc' }}
                        />
                        <Bar
                            dataKey={t('admin.stats.newUsers')}
                            fill={isDark ? '#818cf8' : '#4f46e5'}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={48}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
