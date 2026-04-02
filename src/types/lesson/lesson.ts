export const LessonType = {
    FLASHCARD: "FLASHCARD",
    QCM: "QCM",
    MATCHING_PAIR: "MATCHING_PAIR",
    SORTING_EXERCISE: "SORTING_EXERCISE"
} as const;

export type LessonType = typeof LessonType[keyof typeof LessonType];

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
    xpReward: number;
    minLevelRequired: number;
    durationMinutes: number;
    passScorePercentage: number;
    isActive: boolean;
    lessonType: LessonType;
    flashcards?: FlashcardRequest[];
    questions?: QcmQuestionRequest[];
    matchingPairs?: MatchingPairRequest[];
    sortingExercise?: SortingExerciseRequest[];
}

export interface LessonResponse extends LessonRequest {
    id: string;
    topicName?: string;
    isAlreadyFinish?: boolean;
}

export interface UserLessonProgressSummary {
    userId: string;
    lessonId: string;
    startedAt: string;
    completedAt?: string;
    score?: number;
    passed?: boolean;
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
    progress?: any; // To be typed later if UserProgressResponse is known
}

export interface LessonSummaryResponse {
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    lessonType: LessonType;
    isAlreadyFinish: boolean;
    durationMinutes: number;
    xpReward: number;
    passScorePercentage: number;
}

export interface TopicLessonsResponse {
    topicTitle: string;
    lessons: LessonSummaryResponse[];
    examPassed: boolean;
    examAttempts: number;
    lastAccuracy: number;
}
