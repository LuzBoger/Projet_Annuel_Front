export type LessonStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface UserLessonProgressSummary {
    status: LessonStatus;
    totalAttempts: number;
    failedAttempts: number;
    score: number;
    timeSpentSeconds: number;
    completedAt?: string;
    lastAttemptAt?: string;
}

export interface LessonResponse {
    id: string;
    topicId: string;
    topicName: string;
    title: string;
    description?: string;
    orderIndex: number;
    xpReward: number;
    minLevelRequired: number;
    durationMinutes: number;
    passScorePercentage: number;
    isActive: boolean;
    lessonType: string;
    userProgress?: UserLessonProgressSummary;
}
