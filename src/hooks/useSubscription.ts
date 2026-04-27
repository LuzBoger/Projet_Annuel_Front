import { useCallback, useState } from "react";
import { CancelSubscriptionRequest, SubscriptionDetailResponse } from "@/types/subscription/subscription";
import { subscriptionService } from "@/services/subscriptionService";
import { CheckoutStripeResponse } from "@/types/stripe/stripe";
import { PaymentHistoryResponse } from "@/types/payment/payment";
import { useTranslation } from "react-i18next";
import { SubscriptionStats } from "@/types/subscription/stats";

export function useSubscription() {
    const {t} = useTranslation();
    const [subscription, setSubscription] = useState<SubscriptionDetailResponse | null>(null);
    const [subscriptions, setSubscriptions] = useState<SubscriptionDetailResponse[]>([]);
    const [payment, setPayment] = useState<PaymentHistoryResponse[]>([]);
    const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllSubscriptions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getAllSubscriptions();
            setSubscriptions(response);
        } catch {
            setError(t('error.fetchSubscriptions'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchSubscriptionByAccountId = useCallback(async (accountId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getSubscriptionByAccountId(accountId);
            setSubscription(response);
        } catch {
            setError(t('error.fetchSubscriptionByAccountId'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchSubscription = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getSubscriptionDetails();
            setSubscription(response);
        } catch {
            setError(t('error.fetchSubscriptionDetails'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const cancelSubscriptionByAdmin = async (accountId: string, data: CancelSubscriptionRequest): Promise<SubscriptionDetailResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.cancelSubscriptionByAdmin(accountId, data);
            setSubscription(response);
            return response;
        } catch (err) {
            setError(t('error.cancelSubscriptionByAdmin'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const cancelSubscription = async (data: CancelSubscriptionRequest): Promise<SubscriptionDetailResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.cancelSubscription(data);
            setSubscription(response);
            return response;
        } catch (err) {
            setError(t('error.cancelSubscription'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reactivateSubscription = async (): Promise<SubscriptionDetailResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.reactivateSubscription();
            setSubscription(response);
            return response;
        } catch (err) {
            setError(t('error.reactivateSubscription'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const subscribeToPlan = async (planId: string): Promise<CheckoutStripeResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.subscribeToPlan({ planId });
            return response;
        } catch (err) {
            setError(t('error.subscribeToPlan'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changePlan = async (planId: string): Promise<CheckoutStripeResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.changePlan({ newPlanId: planId });
            return response;
        } catch (err) {
            setError(t('error.changePlan'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchPaymentHistory = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getPaymentHistory();
            setPayment(response);
        } catch {
            setError(t('error.fetchPaymentHistory'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchPaymentHistoryByAccountId = useCallback(async (accountId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getPaymentHistoryByAccountId(accountId);
            setPayment(response);
        } catch {
            setError(t('error.fetchPaymentHistoryByAccountId'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchSubscriptionStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await subscriptionService.getSubscriptionStats();
            setSubscriptionStats(response);
        } catch {
            setError(t('error.fetchSubscriptionStats'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    return {subscription,subscriptions,payment, subscriptionStats,loading,error,fetchAllSubscriptions,fetchSubscriptionByAccountId,fetchSubscription,cancelSubscriptionByAdmin,cancelSubscription,reactivateSubscription,subscribeToPlan,changePlan,fetchPaymentHistory,fetchPaymentHistoryByAccountId,fetchSubscriptionStats};
}
