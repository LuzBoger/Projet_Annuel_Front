export type ViewType = 'monthly' | 'yearly';

export interface SubscriptionsByMonth {
    month: string;
    subscriberCount: number;
}

export interface SubscriptionsByYear {
    year: number;
    subscriberCount: number;
} 

export interface SubscriptionByPlan {
    freeCount: number;
    premiumCount: number;
    freePercentage: number;
    premiumPercentage: number;
}

export interface SubscriptionStats {
    activeSubscribers: number;
    premiumSubscribers: number;
    freeSubscribers: number;
    totalRevenue: number;
    subscriptionsByMonth: SubscriptionsByMonth[];
    subscriptionsByYear: SubscriptionsByYear[];
    subscriptionsByPlan: SubscriptionByPlan;
}

