import { LessonType } from "@/types/lesson/lesson";
import { BadgeColor } from "@/types/components/badge";

export type LessonSessionStatus = 'COMPLETED' | 'FAILED';


export interface LessonSessionResponse {
    id: string;
    lessonId: string;
    lessonTitle: string;
    topicName: string;
    lessonType: LessonType;
    correctAnswers: number;
    wrongAnswers: number;
    totalQuestions: number;
    totalTime: number;
    status: LessonSessionStatus;
    completedAt: string;
}

export interface LessonSessionStatusStats {
    label: (t: (key: string) => string) => string;
    color: BadgeColor
}