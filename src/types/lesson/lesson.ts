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
}
