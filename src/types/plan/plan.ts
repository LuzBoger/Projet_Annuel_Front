import { PaymentInterval } from "../payment/payment";

export interface PlanResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    paymentInterval: PaymentInterval;
}

export interface CreatePlanRequest {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    paymentInterval: PaymentInterval;
    stripePriceId?: string;
}

export interface UpdatePlanRequest {
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    paymentInterval?: PaymentInterval;
    stripePriceId?: string;
    isActive?: boolean;
}

export interface SubscribePlanRequest {
    planId: string;
}

export interface ChangePlanRequest {
    newPlanId: string;
}