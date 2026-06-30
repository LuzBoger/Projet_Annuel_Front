import { UserAnswerResultRequest, UserDailyQuestion, UserMistakeListResponse, UserMistakeRetryListResponse, UserResultResponse } from "@/types/mistakes/userMistakes";
import apiClient from "@/services/axios"

export const userMistakesService = {

    async getDailyQuestion(): Promise<UserDailyQuestion> {
        const response = await apiClient.get<UserDailyQuestion>("/review-mistakes/daily-question");
        return response.data;
    },

    async submitAnswers(data: UserAnswerResultRequest): Promise<UserResultResponse> {
        const response = await apiClient.post<UserResultResponse>("/review-mistakes/session/complete", data);
        return response.data;
    },

    async getPendingMistakes(): Promise<UserMistakeListResponse> {
        const response = await apiClient.get<UserMistakeListResponse>("/review-mistakes/pending-mistakes");
        return response.data;
    },

    async getMistakeDetails(userMistakeId: string): Promise<UserMistakeRetryListResponse> {
        const response = await apiClient.get<UserMistakeRetryListResponse>(`/review-mistakes/pending-mistakes/${userMistakeId}`);
        return response.data;
    }
}