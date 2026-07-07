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
    aiQuota: number;
    features: PlanFeatureResponse[];
}

export interface CreatePlanRequest {
    name: string;
    description?: string | null;
    price: number;
    currency?: string | null;
    paymentInterval?: PaymentInterval | null;
    subscriptionType: SubscriptionType;
    stripePriceId?: string | null;
    aiQuota: number;
    features?: PlanFeatureRequest[] | null;
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
    aiQuota?: number | null;
    features?: PlanFeatureRequest[] | null;
}

export interface SubscribePlanRequest {
    planId: string;
}

export interface ChangePlanRequest {
    newPlanId: string;
}

export interface PlanFeatureResponse {
    id: string;
    label: string;
    orderIndex: number;
}

export interface PlanFeatureRequest {
    label: string;
    orderIndex?: number | null;
}

export interface PlanFormValues {
    name: string;
    description?: string;
    price: number;
    currency: string;
    paymentInterval?: PaymentInterval | null;
    subscriptionType: SubscriptionType;
    stripePriceId?: string | null;
    isActive?: boolean;
    aiQuota?: number;
    features?: PlanFeatureRequest[];
}