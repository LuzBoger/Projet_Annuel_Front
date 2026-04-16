import { useTranslation } from "react-i18next";
import { PlanResponse } from "@/types/plan/plan";
import { getFormatForCurrency } from "@/lib/utils/currency";
import { Button } from "@/components/ui/Button";
import BadgeActive from "@/components/ui/BadgeActive";

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
        <div className={`relative flex flex-col p-8 rounded-2xl border-2 shadow-sm transition-all duration-300
            ${plan.subscriptionType === 'FREE'
                ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800'
                : 'bg-brand-600 border-brand-600'
            }
            ${isCurrentUserPlan ? 'border-brand-500 shadow-lg shadow-brand-100' : ''}
        `}>

            {isCurrentUserPlan && <BadgeActive />}

            <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 ${plan.subscriptionType === 'FREE' ? 'text-gray-400 dark:text-gray-500' : 'text-brand-300'}`}>
                {plan.name}
            </h3>

            <div className="mb-1">
                <span className={`text-4xl font-black ${plan.subscriptionType === 'FREE' ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                    {plan.subscriptionType === 'FREE' ? t('subscription.type.free') : getFormatForCurrency(locale, plan.currency, plan.price)}
                </span>
                {plan.subscriptionType !== 'FREE' && plan.paymentInterval && (
                    <span className="ml-1 text-brand-300 text-sm">
                        / {t(`subscription.interval.${plan.paymentInterval.toLowerCase()}`)}
                    </span>
                )}
            </div>

            {plan.description && (
                <p className={`text-sm leading-relaxed mb-8 ${plan.subscriptionType === 'FREE' ? 'text-gray-400 dark:text-gray-500' : 'text-brand-200'}`}>
                    {plan.description}
                </p>
            )}

            <div className="mt-auto">
                {isCurrentUserPlan ? (
                    <p className={`text-sm font-semibold ${plan.subscriptionType === 'FREE' ? 'text-gray-400 dark:text-gray-500' : 'text-brand-200'}`}>
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
