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
    id?: string;
    front: string;
    back: string;
    frontLanguage: string;
    backLanguage: string;
}

export interface QcmQuestionRequest {
    id?: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}

export interface MatchingPairRequest {
    id?: string;
    item1: string;
    item2: string;
}

export interface SortingExerciseRequest {
    id?: string;
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

export interface LessonMistake {
    id: string;
    userAnswer?: string;
}

export interface CompleteLessonRequest {
    score?: number;
    timeSpentSeconds: number;
    correctAnswers?: number;
    totalAnswers?: number;
    mistakeFlashCardIds?: string[];
    mistakeQcmList?: LessonMistake[];
    mistakeMatchingList?: LessonMistake[];
    mistakeSortingList?: LessonMistake[];
}

export interface UserProgressResponse {
    completedLessons: number;
    completionPercentage: number;
}

export interface CompleteLessonResponse {
    success: boolean;
    message?: string;
    xpEarned: number;
    totalXP: number;
    currentLevel: number;
    leveledUp: boolean;
    newLevel?: number;
    progress?: UserProgressResponse;
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

export interface AILessonGenerateRequest {
    lessonType: LessonType;
    topicId: string;
    description: string;
    itemCount?: number;
}

export interface AILessonModifyRequest {
    lessonId: string;
    prompt: string;
    itemCount?: number;
    lesson: LessonRequest;
}

export type HelpType = "STRUCTURE_AND_RULE" | "ASSOCIATION_AND_MNEMONIC" | "TRAP_WARNING" | "USAGE_CONTEXT";

export interface AIMemorizationHelpRequest {
    lessonId: string;
    exerciseId?: string;
    exerciseType: LessonType;
    helpType: HelpType;
}

export interface AIMemorizationHelpResponse {
    title: string;
    explanation: string;
    visualAnchor: string | null;
    examples: string[] | null;
    warning: string | null;
}


