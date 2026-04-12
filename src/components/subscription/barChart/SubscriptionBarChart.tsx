import { SubscriptionsByMonth, SubscriptionsByYear, ViewType } from "@/types/subscription/stats";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubscriptionsBarChartHeader } from "@/components/subscription/barChart/SubscriptionsBarChartHeader";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ThemeContext } from "@/contexts/ThemeContext";



interface SubscriptionBarChartProps {
    monthly: SubscriptionsByMonth[];
    yearly: SubscriptionsByYear[];
}

export function SubscriptionBarChart({ monthly, yearly }: SubscriptionBarChartProps) {
    const {t} = useTranslation();
    const [view, setView] = useState<ViewType>('monthly');
    const themeCtx = useContext(ThemeContext);
    const isDark = themeCtx?.theme === 'dark';

    const dataKey = t('subscriptions.title');

    const data = view === 'monthly' ? monthly.map((item) => ({
        label: item.month,
        [dataKey]: item.subscriberCount,
    })) : yearly.map((item) => ({
        label: item.year.toString(),
        [dataKey]: item.subscriberCount,
    }));

    const isEmpty = data.length === 0;

   return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <SubscriptionsBarChartHeader view={view} onChange={setView} />

      {isEmpty ? (
        <div className="flex items-center justify-center h-[300px] text-slate-400 dark:text-slate-500 text-sm">
          {t('common.noData')}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f1f5f9'} vertical={false} />
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
                border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}`,
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                color: isDark ? '#f9fafb' : '#0f172a',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '13px',
              }}
              cursor={{ fill: isDark ? '#374151' : '#f8fafc' }}
            />
            <Bar
              dataKey={dataKey}
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
