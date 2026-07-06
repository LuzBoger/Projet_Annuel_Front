import { Challenge, ChallengeUser, CreateChallengeRequest, SubmitChallengeRequest, AIChallengeGenerateRequest, AIChallengeContentResponse } from "@/types/challenges/challenge";
import apiClient from "@/services/axios";

export const challengeService = {

    async createChallenge(data: CreateChallengeRequest) : Promise<Challenge> {
        const response = await apiClient.post<Challenge>('/challenges', data);
        return response.data;
    },

    async joinChallenge(challengeId: string) : Promise<Challenge> {
        const response = await apiClient.post<Challenge>(`/challenges/${challengeId}/join`);
        return response.data;
    },

    async submitChallengeResult(challengeId: string, data: SubmitChallengeRequest) : Promise<Challenge> {
        const response = await apiClient.post<Challenge>(`/challenges/${challengeId}/submit-result`, data);
        return response.data;
    },

    async getChallenge(challengeId: string) : Promise<Challenge> {
        const response = await apiClient.get<Challenge>(`/challenges/${challengeId}`);
        return response.data;
    },

    async getUserChallenges() : Promise<Challenge[]> {
        const response = await apiClient.get<Challenge[]>('/challenges/my-challenges');
        return response.data;
    },
    
    async getPublicChallenges() : Promise<Challenge[]> {
        const response = await apiClient.get<Challenge[]>('/challenges/all-public-challenges');
        return response.data;
    },

    async acceptChallenge(challengeId: string) : Promise<Challenge> {
        const response = await apiClient.put<Challenge>(`/challenges/${challengeId}/accept`);
        return response.data;
    },

    async declineChallenge(challengeId: string) : Promise<Challenge> {
        const response = await apiClient.put<Challenge>(`/challenges/${challengeId}/decline`);
        return response.data;
    },

    async cancelChallenge(challengeId: string) : Promise<Challenge> {
        const response = await apiClient.put<Challenge>(`/challenges/${challengeId}/cancel`);
        return response.data;
    },

    async getOthersParticipants(languageId: string) : Promise<ChallengeUser[]> {
        const response = await apiClient.get<ChallengeUser[]>(`/challenges/other-participants?languageId=${languageId}`);
        return response.data;
    },

    async startChallenge(challengeId: string) : Promise<void> {
        await apiClient.post(`/challenges/${challengeId}/start`);
    },

    async generateChallengeContent(data: AIChallengeGenerateRequest): Promise<AIChallengeContentResponse> {
        const response = await apiClient.post<AIChallengeContentResponse>('/challenges/generate-content', data);
        return response.data;
    }
}