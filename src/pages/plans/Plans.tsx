import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useSubscription } from "../../hooks/useSubscription";
import { usePlan } from "../../hooks/usePlan";
import { useAuth } from "../../hooks/useAuth";
import { PlanCard } from "../../components/ui/card/PlanCard";
import { ErrorResponse } from "../../types/api/response";

export default function Plans() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { subscription, subscribeToPlan, fetchSubscription, changePlan } = useSubscription();
    const { plans, fetchPlans, loading, error: fetchError } = usePlan();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchPlans();
        fetchSubscription();
    }, [fetchPlans, fetchSubscription]);

    const handleSelectPlan = async (planId: string) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setError(null);
        setSuccess(null);

        try {
            let response;
            if (subscription?.plan?.subscriptionType === 'PREMIUM') {
                response = await changePlan(planId);
            } else {
                response = await subscribeToPlan(planId);
            }

            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            } else if (response.message) {
                setSuccess(response.message);
                await fetchSubscription();
            }
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            setError(axiosError.response?.data?.message || t('error.unknown'));
        }
    };

    if (loading && plans.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-64 bg-gray-200 rounded" />
                        <div className="h-64 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    const displayError = error || fetchError;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-indigo-900">
                    {t('subscription.plans.title')}
                </h1>
                <p className="mt-2 text-gray-600">
                    {t('subscription.plans.description')}
                </p>
            </div>

            {success && (
                <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
                    <p>{success}</p>
                </div>
            )}

            {displayError && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{displayError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        isCurrentUserPlan={subscription?.plan?.id === plan.id}
                        hasActiveSubscription={subscription?.plan?.subscriptionType === 'PREMIUM'}
                        isLoading={loading}
                        onSelect={handleSelectPlan}
                    />
                ))}
            </div>
        </div>
    );
}
