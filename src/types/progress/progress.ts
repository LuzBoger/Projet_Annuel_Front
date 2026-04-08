import { LessonType } from "../lesson/lesson";

export interface UserProgressResponse {
    id: string;
    accountId: string;
    topicId: string;
    topicName: string;
    languageCode: string;
    languageName: string;
    totalXP: number;
    level: number;
    currentLevelXP: number;
    nextLevelXP: number;
    levelProgressPercentage: number;
    completedLessons: number;
    completionPercentage: number;
    correctAnswers: number;
    totalAnswers: number;
    accuracy: number;
    studyStreak: number;
    lastStudiedAt: string;
    createdAt: string;
    updatedAt: string;

}

export interface ProgressOverviewResponse {
    totalXP: number;
    overallLevel: number;
    currentLevelXP: number;
    nextLevelXP: number;
    levelProgressPercentage: number;
    totalTopicsStarted: number;
    totalLessonsCompleted: number;
    overallAccuracy: number;
    currentStreak: number;
    progressByTopic: UserProgressResponse[];
    progressByLanguage: LanguageLevelResponse[];
}

export interface LanguageLevelResponse {
    languageId: string;
    languageCode: string;
    languageName: string;
    level: number;
    currentLevelXP: number;
    nextLevelXP: number;
    levelProgressPercentage: number;
}

export interface LastLessonResponse {
    lessonId: string;
    lessonName: string;
    lessonType: LessonType;
    xpReward: number;
    topicId: string;
    topicName: string;
    languageId: string;
    languageCode: string;
    languageName: string;
    completionCount: number;
    totalLessonsInTopic: number;
}
