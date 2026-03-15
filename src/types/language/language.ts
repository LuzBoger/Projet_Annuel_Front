export interface LanguageResponse {
    id: string;
    code: string;
    name: string;
    orderIndex: number;
    isActive: boolean;
}

export interface CreateLanguageRequest {
    code: string;
    name: string;
    orderIndex: number;
    isActive: boolean;
}

export interface UpdateLanguageRequest {
    code: string;
    name: string;
    orderIndex: number;
    isActive: boolean;
}
