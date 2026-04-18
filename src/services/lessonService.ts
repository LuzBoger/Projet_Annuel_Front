import apiClient from "@/services/axios";
import type { LessonRequest, LessonResponse, UserLessonProgressSummary, CompleteLessonRequest, CompleteLessonResponse, TopicLessonsResponse } from "@/types/lesson/lesson";

export const lessonService = {

    async getLessonsByTopic(topicId: string): Promise<LessonResponse[]> {
        const response = await apiClient.get<LessonResponse[]>(`/lessons/topic/${topicId}`);
        return response.data;
    },

    async getAdminLessonsByTopic(topicId: string): Promise<LessonResponse[]> {
        const response = await apiClient.get<LessonResponse[]>(`/lessons/admin/topic/${topicId}`);
        return response.data;
    },

    async getTopicLessonsDetails(topicId: string): Promise<TopicLessonsResponse> {
        const response = await apiClient.get<TopicLessonsResponse>(`/lessons/topic/${topicId}/details`);
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
    },

    async toggleLessonStatus(id: string): Promise<LessonResponse> {
        const response = await apiClient.patch<LessonResponse>(`/lessons/${id}/toggle-status`);
        return response.data;
    },

    async startLesson(lessonId: string): Promise<UserLessonProgressSummary> {
        const response = await apiClient.post<UserLessonProgressSummary>(`/lessons/${lessonId}/start`);
        return response.data;
    },

    async completeLesson(lessonId: string, data: CompleteLessonRequest): Promise<CompleteLessonResponse> {
        const response = await apiClient.post<CompleteLessonResponse>(`/lessons/${lessonId}/complete`, data);
        return response.data;
    }
};
