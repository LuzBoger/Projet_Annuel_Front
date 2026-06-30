import { RankingResponse } from "@/types/ranking/ranking"
import apiClient from "@/services/axios"
import { RANKING_PAGE_SIZE, RANKING_PAGES } from "@/constants/ranking";

export const rankingService = {
    async getGlobalRanking(page = RANKING_PAGES, size = RANKING_PAGE_SIZE): Promise<RankingResponse> {
        const response = await apiClient.get<RankingResponse>('/ranking/global', {
            params: {page, size}
        })
        return response.data;   
    },

    async getLanguageRanking(languageId: string,page = RANKING_PAGES, size = RANKING_PAGE_SIZE): Promise<RankingResponse> {
        const response = await apiClient.get<RankingResponse>(`/ranking/language/${languageId}`, {
            params: {page, size}
        })
        return response.data;
    },

    async getFriendsRanking(page = RANKING_PAGES, size = RANKING_PAGE_SIZE): Promise<RankingResponse> {
    const response = await apiClient.get<RankingResponse>('/ranking/friends', {
        params: { page, size },
    });
    return response.data;
},
};