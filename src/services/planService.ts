import { PaymentInterval } from "@/types/payment/payment";
import { CreatePlanRequest, PlanResponse, UpdatePlanRequest } from "@/types/plan/plan";
import apiClient from "@/services/axios";

export const planService = {

    async getAllPlans(): Promise<PlanResponse[]> {
        const response = await apiClient.get<PlanResponse[]>('/plans');
        return response.data;
    },

    async getAllPlansAdmin(): Promise<PlanResponse[]> {
        const response = await apiClient.get<PlanResponse[]>('/plans/admin');
        return response.data;
    },
    
    async createPlan(data: CreatePlanRequest) : Promise<PlanResponse> {
        const response = await apiClient.post<PlanResponse>('/plans/create', data);
        return response.data;
    },

    async updatePlan(planId: string, data: UpdatePlanRequest): Promise<PlanResponse> {
        const response = await apiClient.put<PlanResponse>(`/plans/update/${planId}`, data);
        return response.data;
    },

    async togglePlanStatus(planId: string): Promise<PlanResponse> {
        const response = await apiClient.patch<PlanResponse>(`/plans/${planId}/toggle-status`);
        return response.data;
    },

    async deletePlan(planId: string) :Promise<void> {
        await apiClient.delete(`/plans/delete/${planId}`);
    },

    async getPlanById(planId: string): Promise<PlanResponse> {
        const response = await apiClient.get<PlanResponse>(`/plans/${planId}`);
        return response.data;
    },

    async getPlanByInterval(interval: PaymentInterval) : Promise<PlanResponse[]> {
        const response = await apiClient.get<PlanResponse[]>(`/plans/interval/${interval}`);
        return response.data;
    }
}
