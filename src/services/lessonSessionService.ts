import { LessonSessionResponse } from "@/types/lessonSession/lessonSession";
import apiClient from "@/services/axios";

export const lessonSessionService = {
    async getAllUserLessonSessions(): Promise<LessonSessionResponse[]> {
        const response = await apiClient.get<LessonSessionResponse[]>('/lesson-sessions');
        return response.data;
    }
};