import { UpdatePasswordRequest, UpdateProfileRequest, UploadResponse, UserProfileResponse } from "@/types/profile/profile";
import apiClient from "@/services/axios";
import { ApiResponse } from "@/types/api/response";
import { CompleteOnboardingRequest } from "@/types/account";
import { StreakResponse } from "@/types/profile/streak";
import { NotificationPreferencesResponse } from "@/types/profile/notificationPreferences";
import { FILENAME_REGEX } from "@/constants/global";

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
    },

    async completeOnboarding(data: CompleteOnboardingRequest): Promise<void> {
        await apiClient.post('/onboarding/complete', data);
    },

    async getStreak(): Promise<StreakResponse> {
        const response = await apiClient.get<StreakResponse>('/profile/streak');
        return response.data;
    },

    async getNotificationPreferences(): Promise<NotificationPreferencesResponse> {
        const response = await apiClient.get<NotificationPreferencesResponse>('/profile/notification-preferences');
        return response.data;
    },

    async updateNotificationPreferences(data: NotificationPreferencesResponse): Promise<NotificationPreferencesResponse> {
        const response = await apiClient.put<NotificationPreferencesResponse>('/profile/notification-preferences', data);
        return response.data;
    },

    async exportData(): Promise<{ blob: Blob; filename: string }> {
        const response = await apiClient.get('/data-privacy/export', { responseType: 'blob' });
        const disposition = response.headers['content-disposition'] ?? '';
        const match = disposition.match(FILENAME_REGEX);
        const filename = match?.[1] ?? 'data.json';
        return { blob: response.data, filename };
    },

    async deleteAccount(password: string): Promise<void> {
        await apiClient.delete('/data-privacy/delete', { data: { password } });
    }

}
