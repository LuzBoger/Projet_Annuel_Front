import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";
import { useEffect, useState } from "react";
import { SubscriptionDetails } from '../../components/subscription/SubscriptionDetails';
import { SubscriptionActions } from "../../components/subscription/SubscriptionActions";
import { CancelSubscriptionModal } from "../../components/subscription/CancelSubscriptionModal";
import { PaymentHistoryTable } from '../../components/subscription/payment/PaymentHistoryTable';

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
                    <div className="h-8 bg-gray-200 rounded w-1/3" />
                    <div className="h-48 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-indigo-900 mb-6">{t("subscription.title")}</h1>
            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
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
                            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                                <p className="text-gray-600 mb-4">{t('subscription.upgrade_message')}</p>
                                <button
                                    onClick={() => navigate('/plans')}
                                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    {t('subscription.view_plans')}
                                </button>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('subscription.payment_history_title')}</h2>
                <div className="bg-white rounded-lg border border-gray-200">
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
    );
    
}    