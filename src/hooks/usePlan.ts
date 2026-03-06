import { useCallback, useState } from "react";
import { CreatePlanRequest, PlanResponse, UpdatePlanRequest } from "../types/plan/plan";
import { planService } from "../services/planService";
import { PaymentInterval } from "../types/payment/payment";
import { useTranslation } from "react-i18next";

export function usePlan() {
    const { t } = useTranslation();
    const [plans, setPlans] = useState<PlanResponse[]>([]);
    const [plan, setPlan] = useState<PlanResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlans = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await planService.getAllPlans();
            setPlans(response);
        } catch {
            setError(t('error.fetchPlans'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchPlanById = async (planId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await planService.getPlanById(planId);
            setPlan(response);
        } catch {
            setError(t('error.fetchPlanById'));
        } finally {
            setLoading(false);
        }
    };

    const fetchPlansByInterval = async (interval: PaymentInterval) => {
        setLoading(true);
        setError(null);
        try {
            const response = await planService.getPlanByInterval(interval);
            setPlans(response);
        } catch {
            setError(t('error.fetchPlansByInterval'));
        } finally {
            setLoading(false);
        }
    };

    const createPlan = async (data: CreatePlanRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await planService.createPlan(data);
            setPlans(prev => [...prev, response]);
        } catch {
            setError(t('error.createPlan'));
        } finally {
            setLoading(false);
        }
    };

    const updatePlan = async (planId: string, data: UpdatePlanRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await planService.updatePlan(planId, data);
            setPlans(prev => prev.map(p => p.id === planId ? response : p));
        } catch {
            setError(t('error.updatePlan'));
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (planId: string) => {
        setLoading(true);
        setError(null);
        try {
            await planService.deletePlan(planId);
            setPlans(prev => prev.filter(p => p.id !== planId));
        } catch {
            setError(t('error.deletePlan'));
        } finally {
            setLoading(false);
        }
    };

    return { plans, plan, loading, error, fetchPlans, fetchPlanById, fetchPlansByInterval, createPlan, updatePlan, deletePlan };
}