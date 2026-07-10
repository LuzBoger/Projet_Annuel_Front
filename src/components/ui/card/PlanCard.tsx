import { useTranslation } from "react-i18next";
import { PlanResponse } from "@/types/plan/plan";
import { getFormatForCurrency } from "@/lib/utils/currency";
import { Button } from "@/components/ui/Button";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { Check } from "@/assets/icons";

interface PlanCardProps {
    plan: PlanResponse;
    isCurrentUserPlan?: boolean;
    hasActiveSubscription?: boolean;
    onSelect(planId: string): void;
    isLoading?: boolean;
}

export function PlanCard({ plan, isCurrentUserPlan = false, hasActiveSubscription = false, onSelect, isLoading }: PlanCardProps) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    return (
        <div className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all duration-300
            ${plan.subscriptionType === 'FREE'
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 shadow-sm'
                : 'bg-white dark:bg-gray-800 border-brand-500 dark:border-brand-500 shadow-lg shadow-brand-500/5 dark:shadow-brand-500/5'
            }
            ${isCurrentUserPlan ? 'border-brand-500 shadow-lg shadow-brand-500/10' : ''}
        `}>

            {isCurrentUserPlan ? (
                <BadgeTag color="brand" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-md whitespace-nowrap bg-white dark:bg-gray-800 !px-4 !py-1.5">
                    <Check className="w-3 h-3" />
                    {t("common.active")}
                </BadgeTag>
            ) : plan.subscriptionType !== 'FREE' && (
                <BadgeTag color="yellow" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-md whitespace-nowrap bg-yellow-100 dark:bg-yellow-950 !px-4 !py-1.5">
                    Premium
                </BadgeTag>
            )}

            <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 ${plan.subscriptionType === 'FREE' ? 'text-gray-400 dark:text-gray-500' : 'text-brand-600 dark:text-brand-400'}`}>
                {plan.name}
            </h3>

            <div className="mb-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">
                    {plan.subscriptionType === 'FREE' ? t('subscription.type.free') : getFormatForCurrency(locale, plan.currency, plan.price)}
                </span>
                {plan.subscriptionType !== 'FREE' && plan.paymentInterval && (
                    <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm">
                        / {t(`subscription.interval.${plan.paymentInterval.toLowerCase()}`)}
                    </span>
                )}
            </div>

            {plan.description && (
                <p className="text-sm leading-relaxed mb-8 text-gray-500 dark:text-gray-400">
                    {plan.description}
                </p>
            )}


            {plan.features && plan.features.length > 0 && (
                 <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                        <li key={feature.id} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {feature.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {plan.aiQuota !== undefined && (
                    <p className="text-xs mb-4 text-gray-400 dark:text-gray-500">
                {t('subscription.ai_quota.limited', { count: plan.aiQuota })}
            </p>   
            )}
            <div className="mt-auto">
                {isCurrentUserPlan ? (
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                        ✓ {t('subscription.current_plan')}
                    </p>
                ) : plan.subscriptionType === 'FREE' && !hasActiveSubscription ? (
                    <p className="text-sm font-medium text-gray-300">
                        {t('subscription.included')}
                    </p>
                ) : (
                    <Button variant={plan.subscriptionType === 'FREE' ? 'outline' : 'primary'} fullWidth isLoading={isLoading} disabled={isLoading} onClick={() => onSelect(plan.id)}>
                        {t('subscription.select_plan')}
                    </Button>
                )}
            </div>
        </div>
    );
}
