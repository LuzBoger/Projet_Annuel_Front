import { LessonSessionResponse } from "@/types/lessonSession/lessonSession";
import apiClient from "@/services/axios";

export const lessonSessionService = {
    async getAllUserLessonSessions(): Promise<LessonSessionResponse[]> {
        const response = await apiClient.get<LessonSessionResponse[]>('/lesson-sessions');
        return response.data;
    },
    async getUserLessonSessions(userId: string): Promise<LessonSessionResponse[]> {
        const response = await apiClient.get<LessonSessionResponse[]>(`/lesson-sessions/user/${userId}`);
        return response.data;
    }
};