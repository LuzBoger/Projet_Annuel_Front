import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { useEffect, useState } from "react";
import { SubscriptionDetails } from '@/components/subscription/SubscriptionDetails';
import { SubscriptionActions } from "@/components/subscription/SubscriptionActions";
import { CancelSubscriptionModal } from "@/components/subscription/CancelSubscriptionModal";
import { PaymentHistoryTable } from '@/components/subscription/payment/PaymentHistoryTable';
import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";

export default function Subscription() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const {subscription,payment: payments,loading: isLoading,error,cancelSubscription,reactivateSubscription, fetchSubscription,fetchPaymentHistory} = useSubscription();

    useEffect(() => {
        fetchSubscription();
        fetchPaymentHistory();
    }, [fetchSubscription, fetchPaymentHistory]);
    
    const handleCancel = async (isCancelNow: boolean, reason: string) => {
        await cancelSubscription({
            isCancelAtPeriodEnd: !isCancelNow,
            cancellationReason: reason 
        });

        setShowModal(false);
    };

    if (isLoading && !subscription) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
            </div>
        );
    }


    return (
        <>
        <MetaData title={t('subscription.page_title')}  robots="noindex, nofollow"  />
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-brand-900 dark:text-white mb-6">{t("subscription.title")}</h1>
            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
                    <p>{error}</p>
                </div>
            )}
            {subscription && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <SubscriptionDetails subscription={subscription} />
                    </div>
                    <div>
                        {subscription.plan?.subscriptionType === 'FREE' ? (
                            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 text-center">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('subscription.upgrade_message')}</p>
                                <Button
                                    onClick={() => navigate('/plans')}
                                    className="px-6 py-3"
                                >
                                    {t('subscription.view_plans')}
                                </Button>
                            </div>
                        ) : (
                            <SubscriptionActions
                                subscription={subscription}
                                isLoading={isLoading}
                                onCancel={() => setShowModal(true)}
                                onReactivate={reactivateSubscription}
                                onChangePlan={() => navigate('/plans')}
                            />
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('subscription.payment_history_title')}</h2>
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <PaymentHistoryTable payments={payments} />
                </div>
            </div>

            <CancelSubscriptionModal
                isOpen={showModal}
                isLoading={isLoading}
                onCancel={() => setShowModal(false)}
                onConfirm={handleCancel}
            />
        </div>
        </>
    );
    
}    
