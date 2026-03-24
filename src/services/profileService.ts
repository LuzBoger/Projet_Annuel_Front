import { UpdatePasswordRequest, UpdateProfileRequest, UploadResponse, UserProfileResponse } from "@/types/profile/profile";
import apiClient from "./axios";
import { ApiResponse } from "@/types/api/response";

export const profileService = {

    async changePassword(data: UpdatePasswordRequest): Promise<ApiResponse> {
        const response = await apiClient.put<ApiResponse>('/profile/password', data);
        return response.data;
    },

    async getMyProfile() : Promise<UserProfileResponse> {
        const response = await apiClient.get<UserProfileResponse>('/profile');
        return response.data;
    },

    async getUserProfile(accountId: string): Promise<UserProfileResponse> {
        const response = await apiClient.get<UserProfileResponse>(`/profile/${accountId}`);
        return response.data;
    },

    async updateProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
        const response = await apiClient.put<UserProfileResponse>('/profile', data);
        return response.data;
    },

    async uploadProfileImage(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post<UploadResponse>('/profile/upload', formData);
        return response.data;   
    },

    async deleteProfileImage(): Promise<ApiResponse> {
        const response = await apiClient.delete<ApiResponse>('/profile/delete/image');
        return response.data;
    },

    async addActiveLanguage(languageId: string): Promise<UserProfileResponse> {
        const response = await apiClient.put<UserProfileResponse>(`/profile/active-language/${languageId}`);
        return response.data;
    }
}
