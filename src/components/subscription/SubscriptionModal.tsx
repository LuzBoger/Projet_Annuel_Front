import { useEffect } from "react";
import { SubscriptionDetailResponse } from "@/types/subscription/subscription";
import { Button } from "@/components/ui/Button";
import { useSubscription } from "@/hooks/useSubscription";
import { useTranslation } from "react-i18next";
import { PaymentHistoryTable } from "@/components/subscription/payment/PaymentHistoryTable";
import { statusColors } from "@/constants/colors";
import { formDateTime } from "@/lib/utils/date";

    interface SubscriptionModalProps {
        isOpen: boolean;
        onClose: () => void;
        subscription: SubscriptionDetailResponse | null;
        accountId: string;
    }

    export function SubscriptionModal({ isOpen, onClose, subscription, accountId }: SubscriptionModalProps) {
        const {t, i18n} = useTranslation();
        const locale = i18n.language;
        const { payment: payments, loading: isLoading, fetchPaymentHistoryByAccountId } = useSubscription();

        useEffect(() => {
            if (isOpen && accountId) {
                fetchPaymentHistoryByAccountId(accountId);
            }
        }, [isOpen, accountId, fetchPaymentHistoryByAccountId]);

        if (!isOpen || !subscription){
            return null;
        }

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {t('subscription.details.title')}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[subscription.status] || statusColors.PENDING}`}>
                        {t(`subscription.details.status.${subscription.status.toLowerCase()}`)}
                    </span>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.type')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{subscription.plan?.subscriptionType}</span>
                    </div>
                    {subscription.plan && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.plan_name')}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{subscription.plan.name}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.start_date')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formDateTime(subscription.startDate, locale)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.end_date')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formDateTime(subscription.endDate, locale)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.current_period')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {formDateTime(subscription.currentPeriodStart, locale)} - {formDateTime(subscription.currentPeriodEnd, locale)}
                        </span>
                    </div>
                    {subscription.cancelAtPeriodEnd && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                {t('subscription.details.cancel_at_period_end_warning')}
                            </p>
                        </div>
                    )}
                    {subscription.canceledAt && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">{t('subscription.details.canceled_at')}</span>
                            <span className="font-medium text-red-600">{formDateTime(subscription.canceledAt, locale)}</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                        {t('subscription.details.payment_history_title')}
                    </h4>
                    {isLoading ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ) : (
                        <PaymentHistoryTable payments={payments} />
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={onClose}>
                        {t('common.close')}
                    </Button>
                </div>
            </div>
        </div>
    );
} 
