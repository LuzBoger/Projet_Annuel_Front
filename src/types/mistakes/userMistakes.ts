import { LessonType } from "@/types/lesson/lesson";

export type LearningType = "LESSON" | "EXAM";

export interface MistakeQuestionResponse {
    userMistakeId: string;
    questionId: string;
    lessonType: LessonType;
    front?: string;
    frontLanguage?: string;
    backLanguage?: string;
    question?: string;
    options?: string[];
    item1?: string;
    items?: string[];
}

export interface UserDailyQuestion {
    hasQuestionToday: boolean;
    totalQuestions: number;
    totalAvailableNow: number;
    mistakeQuestions: MistakeQuestionResponse[];
}

export interface UserAnswerRequest {
    userMistakeId: string;
    translateAnswer?: string;
    selectedResponseIndex?: number;
    item2?: string;
    userOrderedResponseIndexes?: number[];
}

export interface UserAnswerResultRequest {
    userAnswers: UserAnswerRequest[];
}

export interface UserAnswerResponse {
    userMistakeId: string;
    isAnswerCorrect: boolean;
    nbCorrectResponses: number;
    isLessonMastered: boolean;
    nextReviewIndication: string;
}

export interface UserResultResponse {
    totalAnswers: number;
    totalCorrectAnswers: number;
    totalMasteredLessons: number;
    totalRemainingQuestions: number;
    answerResults: UserAnswerResponse[];
}

export interface UserMistakeRetryListResponse {
    userMistakeId: string;
    lessonType: LessonType;
    learningType: LearningType;
    topicName?: string;
    nextReviewIndication?: string;
    nbCorrectResponses: number;
    answeredQuestion?: string;
    userAnswer?: string;
    correctAnswer?: string;
    options?: string[];
    createdAt: string;
}

export interface UserMistakeListResponse{
    totalPendingMistakes: number;
    mistakes: UserMistakeRetryListResponse[];
}


export type MistakeFilterValue = typeof LessonType[keyof typeof LessonType] | "ALL";
