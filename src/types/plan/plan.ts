import { PaymentInterval } from "@/types/payment/payment";
import { SubscriptionType } from "@/types/subscription/subscription";

export interface PlanResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    paymentInterval?: PaymentInterval | null;
    subscriptionType: SubscriptionType;
    isActive: boolean;
}

export interface CreatePlanRequest {
    name: string;
    description?: string | null;
    price: number;
    currency?: string | null;
    paymentInterval?: PaymentInterval | null;
    subscriptionType: SubscriptionType;
    stripePriceId?: string | null;
}

export interface UpdatePlanRequest {
    name?: string | null;
    description?: string | null;
    price?: number | null;
    currency?: string | null;
    paymentInterval?: PaymentInterval | null;
    subscriptionType?: SubscriptionType | null;
    stripePriceId?: string | null;
    isActive?: boolean | null;
}

export interface SubscribePlanRequest {
    planId: string;
}

export interface ChangePlanRequest {
    newPlanId: string;
}
