import apiClient from "@/services/axios";
import type { CreateLanguageRequest, LanguageResponse, UpdateLanguageRequest } from "@/types/language/language";

export const languageService = {

    async getAllLanguages(): Promise<LanguageResponse[]> {
        const response = await apiClient.get<LanguageResponse[]>('/languages');
        return response.data;
    },

    async getLanguageById(id: string): Promise<LanguageResponse> {
        const response = await apiClient.get<LanguageResponse>(`/languages/${id}`);
        return response.data;
    },

    async getLanguageByCode(code: string): Promise<LanguageResponse> {
        const response = await apiClient.get<LanguageResponse>(`/languages/code/${code}`);
        return response.data;
    },

    async createLanguage(data: CreateLanguageRequest): Promise<LanguageResponse> {
        const response = await apiClient.post<LanguageResponse>('/languages', data);
        return response.data;
    },

    async updateLanguage(languageId: string, data: UpdateLanguageRequest): Promise<LanguageResponse> {
        const response = await apiClient.put<LanguageResponse>(`/languages/${languageId}`, data);
        return response.data;
    },

    async deleteLanguage(languageId: string): Promise<void> {
        await apiClient.delete(`/languages/${languageId}`);
    }
};
