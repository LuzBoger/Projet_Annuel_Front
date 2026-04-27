export interface LanguageResponse {
    id: string;
    code: string;
    name: string;
    levelRange?: string;
    topicsCount?: number;
    lessonsCount?: number;
    orderIndex: number;
    isActive: boolean;
    isPopular?: boolean;
    region?: string;
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

export type StepOnBoarding = 'native' | 'learning' ;
