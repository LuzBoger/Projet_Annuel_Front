import { AddUserLanguageRequest, UpdateUserLanguageRequest, UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import apiClient from "@/services/axios";

export const userLanguageService = {
    async getUserLanguages(): Promise<UserLanguageResponse[]> {
        const response = await apiClient.get<UserLanguageResponse[]>('/user-languages');
        return response.data;
    },
    
    async getUserLearningLanguages(): Promise<UserLanguageResponse[]> {
        const response = await apiClient.get<UserLanguageResponse[]>('/user-languages/type/LEARNING');
        return response.data;
    },
    async getUserNativeLanguages(): Promise<UserLanguageResponse[]> {
        const response = await apiClient.get<UserLanguageResponse[]>('/user-languages/type/NATIVE');
        return response.data;
    },

    async addUserLanguage(data: AddUserLanguageRequest): Promise<UserLanguageResponse> {
        const response = await apiClient.post<UserLanguageResponse>('/user-languages', data);
        return response.data;
    },
    async updateUserLanguage(languageId: string, data: UpdateUserLanguageRequest): Promise<UserLanguageResponse> {
        const response = await apiClient.put<UserLanguageResponse>(`/user-languages/${languageId}`, data);
        return response.data;
    },

    async deleteUserLanguage(id: string): Promise<void> {
        await apiClient.delete(`/user-languages/${id}`);
    }

}
