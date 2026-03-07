import type { RoleEnum } from "../enum/roles";

export interface LoginRequest {
    email: string;
    password: string;
}
export interface AdminLoginRequest {
    email: string;
    password: string;
    secretKey: string;
}
export interface LoginResponse {
    userId: string;
    email: string;
    username: string;
    role: RoleEnum;
    accessToken: string;
    refreshToken: string;
    requires2FA: boolean;
    tempUserId?: string; 
    message: string;
}

export interface AdminLoginResponse {
    message: string;
}


