export type ProficiencyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export interface TopicResponse {
    id: string;
    languageId: string;
    name: string;
    description?: string;
    difficulty: ProficiencyLevel;
    orderIndex: number;
    isActive: boolean;
}

export interface CreateTopicRequest {
    languageId: string;
    name: string;
    description?: string;
    difficulty: ProficiencyLevel;
    orderIndex: number;
    isActive: boolean;
}

export type UpdateTopicRequest = CreateTopicRequest;

import { LessonResponse } from "@/types/lesson/lesson";

export interface TopicWithProgressResponse extends TopicResponse {
    completedLessons: number;
    totalLessons: number;
    progressPercent: number;
    lessons: LessonResponse[];
}

export interface FlashcardAnswerRequest {
    id: string;
    userResponse: string;
}

export interface QcmAnswerRequest {
    id: string;
    selectedOptionIndex: number;
}

export interface MatchingPairAnswerRequest {
    id: string;
    item1: string;
    item2: string;
}

export interface SortingExerciseAnswerRequest {
    id: string;
    userOrder: number[];
}

export interface ExamResultRequest {
    flashcardAnswers: FlashcardAnswerRequest[];
    qcmAnswers: QcmAnswerRequest[];
    matchingPairAnswers: MatchingPairAnswerRequest[];
    sortingExerciseAnswers: SortingExerciseAnswerRequest[];
}

export interface QcmQuestionExamResponse {
    id: string;
    question: string;
    options: string[];
}
export interface FlashcardExamResponse {
    id: string;
    front: string;
}
export interface MatchingPairResponse {
    id: string;
    item1: string;
    item2: string;
}

export interface SortingExerciseExamResponse {
    id: string;
    items: string[];
}

export interface ExamResponse {
    topicId: string;
    topicName: string;
    qcmQuestions: QcmQuestionExamResponse[];
    flashcards: FlashcardExamResponse[];
    matchingPairs: MatchingPairResponse[];
    sortingExercises: SortingExerciseExamResponse[];
}

export interface CompleteExamResponse {
    success: boolean;
    message?: string;
    xpEarned: number;
    totalXP: number;
    currentLevel?: number;
    leveledUp?: boolean;
    newLevel?: number;
    totalAnswers?: number;
    correctAnswers?: number;
    accuracy?: number;
}
