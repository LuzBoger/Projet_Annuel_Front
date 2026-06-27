export interface UserGrowthByMonthResponse {
    month: string;
    count: number;
}

export interface LearningMetricsResponse {
    avgAccuracy: number;
    avgCompletionPercentage: number;
    totalStudyTimeMinutes: number;
    mostPopularLanguage: string | null;
}

export interface UserEngagementResponse {
    totalUsers: number;
    newUsersLast7Days: number;
    activeUsersLast7Days: number;
    usersWithActiveStreak: number;
    newUsersByMonth: UserGrowthByMonthResponse[];
}

export interface UserStatsResponse {
    accountId: string;
    username: string;
    email: string;
    photoUrl: string | null;
    status: string;
    totalXP: number;
    totalLessonsCompleted: number;
    avgAccuracy: number;
    totalStudyTimeMinutes: number;
    currentStreak: number;
    longestStreak: number;
    topicsCompleted: number;
    lastActivityAt: string | null;
}

export interface UserStatsListResponse {
    users: UserStatsResponse[];
    totalUsers: number;
    currentPage: number;
    pageSize: number;
}

export interface TopicStatsResponse {
    topicId: string;
    topicName: string;
    languageName: string;
    completionPercentage: number;
    totalXP: number;
    completedLessons: number;
    totalAnswers: number;
    correctAnswers: number;
    accuracy: number | null;
    studyTimeSeconds: number;
    lastStudiedAt: string | null;
}


export interface UserDetailResponse {
    accountId: string;
    username: string;
    email: string;
    photoUrl: string | null;
    status: string;
    currentStreak: number;
    longestStreak: number;
    totalXP: number;
    totalLessonsCompleted: number;
    avgAccuracy: number;
    totalStudyTimeMinutes: number;
    topicsCompleted: number;
    topicStats: TopicStatsResponse[];
}