import apiClient from "@/services/axios";
import type { LessonRequest, LessonResponse } from "@/types/lesson/lesson";

export const lessonService = {

    async getLessonsByTopic(topicId: string): Promise<LessonResponse[]> {
        const response = await apiClient.get<LessonResponse[]>(`/lessons/topic/${topicId}`);
        return response.data;
    },

    async getLessonById(id: string): Promise<LessonResponse> {
        const response = await apiClient.get<LessonResponse>(`/lessons/${id}`);
        return response.data;
    },

    async createLesson(data: LessonRequest): Promise<LessonResponse> {
        const response = await apiClient.post<LessonResponse>('/lessons', data);
        return response.data;
    },

    async updateLesson(id: string, data: LessonRequest): Promise<LessonResponse> {
        const response = await apiClient.put<LessonResponse>(`/lessons/${id}`, data);
        return response.data;
    },

    async deleteLesson(id: string): Promise<void> {
        await apiClient.delete(`/lessons/${id}`);
    }
};
