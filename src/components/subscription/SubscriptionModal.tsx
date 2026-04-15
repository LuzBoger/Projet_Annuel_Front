import { useEffect } from "react";
import { SubscriptionDetailResponse } from "@/types/subscription/subscription";
import { Button } from "@/components/ui/Button";
import { useSubscription } from "@/hooks/useSubscription";
import { useTranslation } from "react-i18next";
import { PaymentHistoryList } from "@/components/subscription/payment/PaymentHistoryList";
import { statusColors } from "@/constants/colors";
import { formDateTime } from "@/lib/utils/date";
import { Modal } from "@/components/ui/Modal";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('subscription.details.title')}
      size="lg"
    >
      <div className="flex items-center justify-between mb-4">
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

      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        <h4 className="text-md font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          {t('subscription.details.payment_history_title')}
        </h4>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl" />
            <div className="h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl" />
            <div className="h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl" />
          </div>
        ) : (
          <PaymentHistoryList payments={payments} />
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button variant="outline" onClick={onClose} className="rounded-xl">
          {t('common.close')}
        </Button>
      </div>
    </Modal>
  );
} 
