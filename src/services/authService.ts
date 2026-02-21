import type { AccountInfoResponse } from "../types/account";
import type { ApiResponse } from "../types/api/response";
import type { ForgotPasswordRequest } from "../types/auth/forgotPassword";
import type { LoginRequest, LoginResponse } from "../types/auth/login";
import type { RefreshTokenResponse } from "../types/auth/refreshToken";
import type { RegisterResponse, RegisterRequest } from "../types/auth/register";
import type { ResetPasswordRequest } from "../types/auth/resetPassword";
import type { Disable2FARequest, Enable2FARequest, Enable2FAResponse, Verify2FARequest, Verify2FASetupRequest } from "../types/auth/twoFactor";
import apiClient from "./axios";

export const authService = {

    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    async register(data: RegisterRequest) : Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    async logout(): Promise<ApiResponse> {
        const response = await apiClient.post<ApiResponse>('/auth/logout');
        return response.data;
    },

    async refreshToken(): Promise<RefreshTokenResponse> {
        const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh');
        return response.data;
    },

    async getCurrentUser(): Promise<AccountInfoResponse> {
        const response = await apiClient.get<AccountInfoResponse>('/auth/me');
        return response.data;
    },

    async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
        const response = await apiClient.post<ApiResponse>('/auth/forgot-password', data);
        return response.data;
    },

    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
        const response = await apiClient.post<ApiResponse>('/auth/reset-password', data);
        return response.data;
    },

    async verify2FA(data: Verify2FARequest) : Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/verify-2fa', data);
        return response.data;
    },

    async enable2FA(data: Enable2FARequest) : Promise<Enable2FAResponse> {
        const response = await apiClient.post<Enable2FAResponse>('/auth/2fa/enable', data);
        return response.data;
    },

    async disable2FA(data: Disable2FARequest) : Promise<ApiResponse> {
        const response = await apiClient.post<ApiResponse>('/auth/2fa/disable', data);
        return response.data;
    },

    async verify2FASetup(data: Verify2FASetupRequest) : Promise<ApiResponse> {
        const response = await apiClient.post<ApiResponse>('/auth/2fa/verify-setup', data);
        return response.data;
    },
};