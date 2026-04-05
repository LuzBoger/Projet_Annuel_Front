import apiClient from "@/services/axios";
import type { TopicResponse, CreateTopicRequest, UpdateTopicRequest, ExamResponse, ExamResultRequest, CompleteExamResponse } from "@/types/topic/topic";


export const topicService = {

    async getAllTopics(): Promise<TopicResponse[]> {
        const response = await apiClient.get<TopicResponse[]>('/topics');
        return response.data;
    },

    async getAllTopicsByActive(): Promise<TopicResponse[]> {
        const response = await apiClient.get<TopicResponse[]>('/topics/active');
        return response.data;
    },

    async searchTopics(name?: string, difficulty?: string, isActive?: boolean): Promise<TopicResponse[]> {
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (difficulty) params.append('difficulty', difficulty);
        if (isActive !== undefined) params.append('isActive', isActive.toString());
        
        const response = await apiClient.get<TopicResponse[]>('/topics/search', { params });
        return response.data;
    },

    async searchActiveTopics(languageId: string, name?: string, difficulty?: string): Promise<TopicResponse[]> {
        const params = new URLSearchParams();
        params.append('languageId', languageId);
        if (name) params.append('name', name);
        if (difficulty) params.append('difficulty', difficulty);
        
        const response = await apiClient.get<TopicResponse[]>('/topics/search/active', { params });
        return response.data;
    },

    async getTopicsByLanguage(languageId: string): Promise<TopicWithProgressResponse[]> {
        const response = await apiClient.get<TopicWithProgressResponse[]>(`/topics/language/${languageId}`);
        return response.data;
    },

    async getTopicById(id: string): Promise<TopicResponse> {
        const response = await apiClient.get<TopicResponse>(`/topics/${id}`);
        return response.data;
    },

    async createTopic(data: CreateTopicRequest): Promise<TopicResponse> {
        const response = await apiClient.post<TopicResponse>('/topics', data);
        return response.data;
    },

    async updateTopic(topicId: string, data: UpdateTopicRequest): Promise<TopicResponse> {
        const response = await apiClient.put<TopicResponse>(`/topics/${topicId}`, data);
        return response.data;
    },

    async deleteTopic(topicId: string): Promise<void> {
        await apiClient.delete(`/topics/${topicId}`);
    },

    async getTopicExam(topicId: string): Promise<ExamResponse> {
        const response = await apiClient.get<ExamResponse>(`/topics/${topicId}/exam`);
        return response.data;
    },

    async submitTopicExam(topicId: string, data: ExamResultRequest): Promise<CompleteExamResponse> {
        const response = await apiClient.post<CompleteExamResponse>(`/topics/${topicId}/exam/submit`, data);
        return response.data;
    }
};
