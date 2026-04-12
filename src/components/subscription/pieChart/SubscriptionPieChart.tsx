import { COLORS_PIE_CHART } from "@/constants/colors";
import { SubscriptionByPlan } from "@/types/subscription/stats";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Legend, ResponsiveContainer, Tooltip, Pie, Cell } from "recharts";
import { ThemeContext } from "@/contexts/ThemeContext";


interface SubscriptionPieChartProps {
    data: SubscriptionByPlan;
}

export function SubscriptionPieChart({ data }: SubscriptionPieChartProps) {
    const {t} = useTranslation();
    const themeCtx = useContext(ThemeContext);
    const isDark = themeCtx?.theme === 'dark';

    if (!data) return null;

    const planData = [
        { name: `${t('subscriptions.premium')} (${data.premiumPercentage}%)`, value: data.premiumCount },
        { name: `${t('subscriptions.free')} (${data.freePercentage}%)`, value: data.freeCount },
    ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        {t('dashboard.freeVsPremium')}
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={planData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {planData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_PIE_CHART[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}`,
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f9fafb' : '#0f172a',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              fontSize: '13px',
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-10 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-brand-500">{data.premiumCount}</p>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{t('subscriptions.premium')}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-brand-300 dark:text-brand-400">{data.freeCount}</p>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{t('subscriptions.free')}</p>
        </div>
      </div>
    </div>
  );
};
