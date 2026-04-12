import { useTranslation } from "react-i18next";
import { SubscriptionDetailResponse } from "@/types/subscription/subscription";
import { statusColors } from "@/constants/colors";
import { formDate } from "@/lib/utils/date";

interface SubscriptionDetailsProps {
    subscription: SubscriptionDetailResponse;
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                <div className="flex items-center gap-3">

                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {t('subscription.details.my_subscription')}
                        </h3>
                    </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[subscription.status] || statusColors.PENDING}`}>
                    {t(`subscription.details.status.${subscription.status.toLowerCase()}`)}
                </span>
            </div>

            <div className="px-6 py-2">
                {subscription.plan?.subscriptionType === 'PREMIUM' && (
                    <>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-50 dark:border-slate-700 text-sm">
                            <span className="text-slate-500 dark:text-slate-400">{t('subscription.details.current_period')}</span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {formDate(subscription.currentPeriodStart, locale)} - {formDate(subscription.currentPeriodEnd, locale)}
                            </span>
                        </div>

                        {subscription.daysRemaining !== null && (
                            <div className="flex justify-between items-center py-2.5 text-sm">
                                <span className="text-slate-500 dark:text-slate-400">{t('subscription.details.days_remaining')}</span>
                                <span className={`font-medium ${subscription.daysRemaining <= 7 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                                    {subscription.daysRemaining} {t('subscription.details.days')}
                                </span>
                            </div>
                        )}

                        {subscription.cancelAtPeriodEnd && (
                            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex gap-2 items-start">
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    {t('subscription.details.cancel_at_period_end_warning')}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}
