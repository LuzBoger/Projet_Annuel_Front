import { RankingResponse } from "@/types/ranking/ranking"
import apiClient from "@/services/axios"

export const rankingService = {
    async getGlobalRanking(page = 0, size = 20): Promise<RankingResponse> {
        const response = await apiClient.get<RankingResponse>('/ranking/global', {
            params: {page, size}
        })
        return response.data;   
    },

    async getLanguageRanking(languageId: string,page = 0, size = 20): Promise<RankingResponse> {
        const response = await apiClient.get<RankingResponse>(`/ranking/language/${languageId}`, {
            params: {page, size}
        })
        return response.data;
    },
};