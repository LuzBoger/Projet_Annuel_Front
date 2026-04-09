import { COLORS_PIE_CHART } from "@/constants/colors";
import { SubscriptionByPlan } from "@/types/subscription/stats";
import { useTranslation } from "react-i18next";
import { PieChart, Legend, ResponsiveContainer, Tooltip, Pie, Cell } from "recharts";


interface SubscriptionPieChartProps {
    data: SubscriptionByPlan;
}

export function SubscriptionPieChart({ data }: SubscriptionPieChartProps) {
    const {t} = useTranslation();

    if (!data) return null;

    const planData = [
        { name: `${t('subscriptions.premium')} (${data.premiumPercentage}%)`, value: data.premiumCount },
        { name: `${t('subscriptions.free')} (${data.freePercentage}%)`, value: data.freeCount },
    ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
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
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              fontSize: '13px',
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value: string) => <span className="text-sm text-slate-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-10 mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-500">{data.premiumCount}</p>
          <p className="text-xs font-medium text-slate-400 mt-1">{t('subscriptions.premium')}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-300">{data.freeCount}</p>
          <p className="text-xs font-medium text-slate-400 mt-1">{t('subscriptions.free')}</p>
        </div>
      </div>
    </div>
  );
};
