import { PlanResponse } from "../plan/plan";

export type SubscriptionType = 'FREE' | 'PREMIUM';
export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELED' | 'PENDING'

export interface SubscriptionResponse {
    id: string;
    subscriptionType: SubscriptionType;
    isActive: boolean;
    startDate: string;
    endDate: string | null;
}

export interface SubscriptionDetailResponse {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    subscriptionType: SubscriptionType;
    status: SubscriptionStatus;
    plan: PlanResponse | null;
    startDate: string;
    endDate: string | null;
    currentPeriodStart: string;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: string | null;
    daysRemaining: number | null;
    isActive: boolean;
}

export interface CancelSubscriptionRequest {
    isCancelAtPeriodEnd: boolean;
    cancellationReason: string;
}

