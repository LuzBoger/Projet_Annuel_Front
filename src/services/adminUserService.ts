import apiClient from "@/services/axios";
import { AdminUserListResponse, UpdateUserStatusRequest } from "@/types/admin/users/users";

export const adminUserService = {
    async getUsers(search = '', page = 0, size = 10): Promise<AdminUserListResponse> {
        const response = await apiClient.get<AdminUserListResponse>('/admin/users', {
            params: { search: search || undefined, page, size },
        });
        return response.data;
    },

    async updateUserStatus(userId: string, request: UpdateUserStatusRequest): Promise<void> {
        await apiClient.patch(`/admin/users/${userId}/status`, request);
    },

    async unlockUser(userId: string): Promise<void> {
        await apiClient.patch(`/admin/users/${userId}/unlock`);
    },

    async deleteUser(userId: string): Promise<void> {
        await apiClient.delete(`/admin/users/${userId}`);
    },

    async resetUserPassword(userId: string, newPassword: string): Promise<void> {
        await apiClient.patch(`/admin/users/${userId}/password`, { newPassword });
    },
};
