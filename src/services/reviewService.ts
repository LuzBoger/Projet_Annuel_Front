import { TopicReviewRequest, TopicReviewResponse, TopicReviewsResponse } from "@/types/review/review"
import apiClient from "./axios"

export const reviewService = {


    async addReview(topicId: string, review: TopicReviewRequest): Promise<TopicReviewResponse> {
        const response = await apiClient.post<TopicReviewResponse>(`/reviews/topic/${topicId}`, review);
        return response.data;
    },

    async updateReview(reviewId: string, review: TopicReviewRequest): Promise<TopicReviewResponse> {
        const response = await apiClient.put<TopicReviewResponse>(`/reviews/${reviewId}`, review);
        return response.data;
    },

    async deleteReview(reviewId: string): Promise<void> {
        await apiClient.delete(`/reviews/${reviewId}`);
    },

    async getTopicReviews(topicId: string): Promise<TopicReviewsResponse> {
        const response = await apiClient.get<TopicReviewsResponse>(`/reviews/topic/${topicId}`);
        return response.data;
    },

    async getAllReviews(): Promise<TopicReviewResponse[]> {
        const response = await apiClient.get<TopicReviewResponse[]>(`/reviews`);
        return response.data;
    },

    async getPendingReviews(): Promise<TopicReviewResponse[]> {
        const response = await apiClient.get<TopicReviewResponse[]>(`/reviews/pending`);
        return response.data;
    },

    async approveReview(reviewId: string): Promise<TopicReviewResponse> {
        const response = await apiClient.put<TopicReviewResponse>(`/reviews/${reviewId}/accept`);
        return response.data;
    },
    async rejectReview(reviewId: string): Promise<void> {
        await apiClient.put(`/reviews/${reviewId}/reject`);
    },

    async getUserReview(topicId: string): Promise<TopicReviewResponse> {
        const response = await apiClient.get<TopicReviewResponse>(`/reviews/topic/${topicId}/user`);
        return response.data;
    },
};