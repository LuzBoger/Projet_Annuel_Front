import { LearningMetricsResponse, UserDetailResponse, UserEngagementResponse, UserStatsListResponse } from "@/types/admin/stats/stats";
import apiClient from "@/services/axios";

export const adminStatsService = {
    async getUserEngagement(): Promise<UserEngagementResponse> {
        const response = await apiClient.get<UserEngagementResponse>('/admin/stats/engagement');
        return response.data;
    },

    async getLearningMetrics(): Promise<LearningMetricsResponse> {
        const response = await apiClient.get<LearningMetricsResponse>('/admin/stats/learning');
        return response.data;
    },

    async getUserStats(search = '', page = 0, size = 10): Promise<UserStatsListResponse> {
        const response = await apiClient.get<UserStatsListResponse>('/admin/stats/users', {
            params: { search: search || undefined, page, size },
        });
        return response.data;
    },

    async getUserDetail(userId: string): Promise<UserDetailResponse> {
        const response = await apiClient.get<UserDetailResponse>(`/admin/stats/users/${userId}`);
        return response.data;
    },
};  