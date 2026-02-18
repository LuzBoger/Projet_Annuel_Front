import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { RefreshTokenResponse } from '../types/auth/refreshToken';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-2fa'];

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

let isRefreshing = false;
let pendingRequests: Array<{
    resolve: (value: undefined ) => void;
    reject: (reason?: AxiosError) => void;
}> = [];


const processRequests = (error: AxiosError | null) => {
    pendingRequests.forEach((promise) => {
        if(error) {
            promise.reject(error);
        } else {
            promise.resolve(undefined);
        }
    });
    pendingRequests = [];
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const isPublic = PUBLIC_ENDPOINTS.some(endpoint => originalRequest.url?.includes(endpoint));

        if (error.response?.status === 401 && !originalRequest._retry && !isPublic) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingRequests.push({ resolve: () => resolve(apiClient(originalRequest)), reject });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;
            try {
                await apiClient.post<RefreshTokenResponse>('/auth/refresh');
                processRequests(null);
                return apiClient(originalRequest);
            } catch (refreshError) {
                processRequests(refreshError as AxiosError);
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);
export default apiClient;