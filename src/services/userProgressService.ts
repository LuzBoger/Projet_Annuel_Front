import { LanguageLevelResponse, LastLessonResponse, ProgressOverviewResponse } from "@/types/progress/progress";
import apiClient from "./axios";

export const userProgressService = {
    async getProgress() : Promise<ProgressOverviewResponse> {
        const response = await apiClient.get<ProgressOverviewResponse>('/user-progress');
        return response.data;
    },

    async getLanguageLevel() : Promise<LanguageLevelResponse> {
        const response = await apiClient.get<LanguageLevelResponse>('/user-progress/language-level');
        return response.data;
    },

    async getLastLesson() : Promise<LastLessonResponse | null> {
        const response = await apiClient.get<LastLessonResponse>('/user-progress/last-lesson');
        return response.status === 204 ? null : response.data;
    }  
}
