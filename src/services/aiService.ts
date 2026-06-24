import apiClient from "./axios";
import { AIQuotaResponse } from "@/types/ai/ai";
import { AIMemorizationHelpRequest, AIMemorizationHelpResponse } from "@/types/lesson/lesson";

export const aiService = {
    async getQuota(): Promise<AIQuotaResponse> {
        const response = await apiClient.get<AIQuotaResponse>('/ai/quota');
        return response.data;
    },

    async getMemorizationHelp(data: AIMemorizationHelpRequest): Promise<AIMemorizationHelpResponse> {
        const response = await apiClient.post<AIMemorizationHelpResponse>('/lessons/help', data);
        return response.data;
    }
};
