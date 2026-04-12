import { useTranslation } from 'react-i18next';
import { SubscriptionDetailResponse } from '@/types/subscription/subscription';
import { Button } from '@/components/ui/Button';

interface SubscriptionActionsProps {
    subscription: SubscriptionDetailResponse;
    onCancel: () => void;
    onReactivate: () => void;
    onChangePlan: () => void;
    isLoading: boolean;
}

export function SubscriptionActions({ subscription, onCancel, onReactivate, onChangePlan, isLoading }: SubscriptionActionsProps) {
    const { t } = useTranslation();

    if (subscription.plan?.subscriptionType !== 'PREMIUM') {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                <h3 className="text-base font-bold text-slate-900">
                    {t('subscription.manage.title')}
                </h3>
            </div>

            <div className="px-6 py-5 space-y-3">
                <Button variant='outline' fullWidth disabled={isLoading} onClick={onChangePlan}>
                    {t('subscription.manage.change_plan')}
                </Button>

                {subscription.cancelAtPeriodEnd ? (
                    <Button variant='primary' fullWidth disabled={isLoading} onClick={onReactivate}>
                        {t('subscription.manage.reactivate')}
                    </Button>
                ) : (
                    <Button variant='danger' fullWidth disabled={isLoading} onClick={onCancel}>
                        {t('subscription.manage.cancel')}
                    </Button>
                )}
            </div>

        </div>
    );
}
