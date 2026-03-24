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

