import { useTranslation } from "react-i18next";
import { PlanResponse } from "../../../types/plan/plan";
import { getFormatForCurrency } from "../../../lib/utils/currency";
import { Button } from "../Button";
import BadgeActive from "../BadgeActive";

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
    const isPlanFree = plan.price === 0;

    return (
        <div className={`relative flex flex-col p-8 rounded-2xl border-2 shadow-sm transition-all duration-300
            ${isPlanFree
                ? 'bg-white border-gray-100'
                : 'bg-indigo-600 border-indigo-600'
            }
            ${isCurrentUserPlan ? 'border-indigo-500 shadow-lg shadow-indigo-100' : ''}
        `}>

            {isCurrentUserPlan && <BadgeActive />}

            <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 ${isPlanFree ? 'text-gray-400' : 'text-indigo-300'}`}>
                {plan.name}
            </h3>

            <div className="mb-1">
                <span className={`text-4xl font-black ${isPlanFree ? 'text-gray-900' : 'text-white'}`}>
                    {isPlanFree ? t('subscription.free') : getFormatForCurrency(locale, plan.currency, plan.price)}
                </span>
                {!isPlanFree && plan.paymentInterval && (
                    <span className="ml-1 text-indigo-300 text-sm">
                        / {t(`subscription.interval.${plan.paymentInterval.toLowerCase()}`)}
                    </span>
                )}
            </div>

            {plan.description && (
                <p className={`text-sm leading-relaxed mb-8 ${isPlanFree ? 'text-gray-400' : 'text-indigo-200'}`}>
                    {plan.description}
                </p>
            )}

            <div className="mt-auto">
                {isCurrentUserPlan ? (
                    <p className={`text-sm font-semibold ${isPlanFree ? 'text-gray-400' : 'text-indigo-200'}`}>
                        ✓ {t('subscription.current_plan')}
                    </p>
                ) : isPlanFree && !hasActiveSubscription ? (
                    <p className="text-sm font-medium text-gray-300">
                        {t('subscription.included')}
                    </p>
                ) : (
                    <Button variant={isPlanFree ? 'outline' : 'primary'} fullWidth isLoading={isLoading} disabled={isLoading} onClick={() => onSelect(plan.id)}>
                        {t('subscription.select_plan')}
                    </Button>
                )}
            </div>
        </div>
    );
}
