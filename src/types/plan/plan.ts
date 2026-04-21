import { PaymentInterval } from "@/types/payment/payment";
import { SubscriptionType } from "@/types/subscription/subscription";

export interface PlanResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    paymentInterval: PaymentInterval;
    subscriptionType: SubscriptionType;
    isActive: boolean;
}

export interface CreatePlanRequest {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    paymentInterval: PaymentInterval;
    subscriptionType: SubscriptionType;
    stripePriceId?: string;
}

export interface UpdatePlanRequest {
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    paymentInterval?: PaymentInterval;
    subscriptionType?: SubscriptionType;
    stripePriceId?: string;
    isActive?: boolean;
}

export interface SubscribePlanRequest {
    planId: string;
}

export interface ChangePlanRequest {
    newPlanId: string;
}
