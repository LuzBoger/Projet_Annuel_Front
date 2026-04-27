import { PaymentHistoryResponse } from "@/types/payment/payment";
import { ChangePlanRequest, SubscribePlanRequest } from "@/types/plan/plan";
import { CheckoutStripeResponse } from "@/types/stripe/stripe";
import { CancelSubscriptionRequest, SubscriptionDetailResponse } from "@/types/subscription/subscription";
import apiClient from "@/services/axios";
import { SubscriptionStats } from "@/types/subscription/stats";

export const subscriptionService = {

    async getAllSubscriptions(): Promise<SubscriptionDetailResponse[]> {
        const response = await apiClient.get<SubscriptionDetailResponse[]>('/subscriptions/all-subscriptions');
        return response.data;
    },

    async getSubscriptionByAccountId(accountId: string): Promise<SubscriptionDetailResponse> {
        const response = await apiClient.get<SubscriptionDetailResponse>(`/subscriptions/${accountId}`);
        return response.data;
    },

    async cancelSubscriptionByAdmin(accountId: string, data: CancelSubscriptionRequest) : Promise<SubscriptionDetailResponse> {
        const response = await apiClient.post<SubscriptionDetailResponse>(`/subscriptions/${accountId}/cancel`, data);
        return response.data;
    },

    async getSubscriptionDetails(): Promise<SubscriptionDetailResponse> {
        const response = await apiClient.get<SubscriptionDetailResponse>('/subscriptions/detail');
        return response.data;
    },

    async cancelSubscription(data: CancelSubscriptionRequest): Promise<SubscriptionDetailResponse> {
        const response = await apiClient.post<SubscriptionDetailResponse>('/subscriptions/cancel', data);
        return response.data;
    },

    async reactivateSubscription(): Promise<SubscriptionDetailResponse> {
        const response = await apiClient.post<SubscriptionDetailResponse>('/subscriptions/reactivate');
        return response.data;
    },

    async changePlan(data: ChangePlanRequest): Promise<CheckoutStripeResponse> {
        const response = await apiClient.post<CheckoutStripeResponse>('/subscriptions/change-plan', data);
        return response.data;
    },

    async getPaymentHistory() : Promise<PaymentHistoryResponse[]> {
        const response = await apiClient.get<PaymentHistoryResponse[]>('/subscriptions/payments');
        return response.data;
    },

    async getPaymentHistoryByAccountId(accountId: string): Promise<PaymentHistoryResponse[]> {
        const response = await apiClient.get<PaymentHistoryResponse[]>(`/subscriptions/${accountId}/payments`);
        return response.data;
    },

    async subscribeToPlan(data: SubscribePlanRequest): Promise<CheckoutStripeResponse> {
        const response = await apiClient.post<CheckoutStripeResponse>('/subscriptions/subscribe', data);
        return response.data;
    },

    async getSubscriptionStats(): Promise<SubscriptionStats> {
        const response = await apiClient.get<SubscriptionStats>('/subscriptions/stats');
        return response.data;
    }
}
