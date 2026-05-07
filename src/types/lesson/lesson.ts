export const LessonType = {
    FLASHCARD: "FLASHCARD",
    QCM: "QCM",
    MATCHING_PAIR: "MATCHING_PAIR",
    SORTING_EXERCISE: "SORTING_EXERCISE"
} as const;

export type LessonType = typeof LessonType[keyof typeof LessonType];
export type LessonStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type DifficultyFeedback = 'VERY_GOOD' | 'GOOD' | 'MEDIUM' | 'HARD';

export interface FlashcardRequest {
    front: string;
    back: string;
    frontLanguage: string;
    backLanguage: string;
}

export interface QcmQuestionRequest {
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}

export interface MatchingPairRequest {
    item1: string;
    item2: string;
}

export interface SortingExerciseRequest {
    items: string[];
    correctOrder: number[];
}

export interface LessonRequest {
    topicId: string;
    title: string;
    description: string;
    orderIndex: number;
    xpReward?: number;
    minLevelRequired?: number;
    durationMinutes?: number;
    isActive: boolean;
    lessonType: LessonType;
    flashcards?: FlashcardRequest[];
    questions?: QcmQuestionRequest[];
    matchingPairs?: MatchingPairRequest[];
    sortingExercise?: SortingExerciseRequest[];
}
export interface UserLessonProgressSummary {
    status: LessonStatus;
    totalAttempts: number;
    failedAttempts: number;
    score: number;
    timeSpentSeconds: number;
    completedAt?: string;
    lastAttemptAt?: string;
}

export interface LessonResponse extends LessonRequest {
    id: string;
    topicName?: string;
    isAlreadyFinish?: boolean;
    userProgress?: UserLessonProgressSummary;
}

export interface CompleteLessonRequest {
    score: number;
    timeSpentSeconds: number;
}

export interface CompleteLessonResponse {
    success: boolean;
    message?: string;
    xpEarned: number;
    totalXP: number;
    currentLevel: number;
    leveledUp: boolean;
    newLevel?: number;
    progress?: UserLessonProgressSummary;
}

export interface LessonSummaryResponse {
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    lessonType: LessonType;
    isAlreadyFinish: boolean;
    durationMinutes?: number;
    xpReward?: number;
}

export interface TopicLessonsResponse {
    topicTitle: string;
    lessons: LessonSummaryResponse[];
    examPassed: boolean;
    examAttempts: number;
    lastAccuracy: number;
    topicName: string;
    userProgress?: UserLessonProgressSummary;

}

