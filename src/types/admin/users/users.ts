export interface AdminUserSummaryResponse {
    accountId: string;
    username: string;
    email: string;
    status: string;
    role: string;
    currentStreak: number;
    createdAt: string;
    bannedOfReview: boolean;
    failedLoginAttempts: number;
}

export interface AdminUserListResponse {
    users: AdminUserSummaryResponse[];
    totalUsers: number;
    currentPage: number;
    pageSize: number;
}

export interface UpdateUserStatusRequest {
    status: 'ACTIVE' | 'LOCKED' | 'PENDING_VERIFICATION' | 'SUSPENDED';
}

