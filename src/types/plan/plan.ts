import { PaymentInterval } from "../payment/payment";
import { SubscriptionType } from "../subscription/subscription";

export interface PlanResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    paymentInterval: PaymentInterval;
    subscriptionType: SubscriptionType;
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