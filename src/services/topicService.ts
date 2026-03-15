import apiClient from "@/services/axios";
import type { TopicResponse, CreateTopicRequest, UpdateTopicRequest } from "@/types/topic/topic";

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

    async getTopicsByLanguage(languageId: string): Promise<TopicResponse[]> {
        const response = await apiClient.get<TopicResponse[]>(`/topics/language/${languageId}`);
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
    }
};
