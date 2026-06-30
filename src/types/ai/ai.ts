export interface AIQuotaResponse {
    maxQuota: number;
    currentUsage: number;
    remainingQuota: number;
    periodEnd: string;
}
