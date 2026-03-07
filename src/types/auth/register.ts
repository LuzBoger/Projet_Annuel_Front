import type { RoleEnum } from "../enum/roles";

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username?: string;
}

export interface RegisterResponse {
    userId: string;
    email: string;
    username: string;
    role: RoleEnum;
    message: string;
}