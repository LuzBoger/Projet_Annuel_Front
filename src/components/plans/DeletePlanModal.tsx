import { useTranslation } from "react-i18next";
import { PlanResponse } from "@/types/plan/plan";
import { Button } from "@/components/ui/Button";

interface DeletePlanModalProps {
    plan: PlanResponse | null;
    onCancel: () => void;
    onDelete: (planId: string) => void;
    isOpen: boolean;
    isLoading: boolean;
}

export function DeletePlanModal({ plan, onCancel, onDelete, isOpen, isLoading }: DeletePlanModalProps) {
    const { t } = useTranslation();

    if (!isOpen || !plan) {
        return null;
    }

    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('plans.delete.title')}</h3>
                <p className="text-sm text-gray-600 mb-4">{t('plans.delete.description', { name: plan.name })}</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onCancel} disabled={isLoading}>
                        {t('common.cancel')}
                    </Button>
                    <Button variant="danger" isLoading={isLoading} disabled={isLoading} onClick={() => onDelete(plan.id)}>
                        {t('common.delete')}
                    </Button>
                </div>
            </div>
        </div>
    );
}