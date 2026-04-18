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

import { Modal } from "@/components/ui/Modal";

export function DeletePlanModal({ plan, onCancel, onDelete, isOpen, isLoading }: DeletePlanModalProps) {
    const { t } = useTranslation();

    if (!plan) return null;
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={t('plans.delete.title')}
            size="sm"
        >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t('plans.delete.description', { name: plan.name })}
            </p>
            <div className="flex gap-3 justify-end">
                <Button variant="pill-red" onClick={onCancel} disabled={isLoading}>
                    {t('common.cancel')}
                </Button>
                <Button variant="danger" isLoading={isLoading} disabled={isLoading} onClick={() => onDelete(plan.id)} className="rounded-xl">
                    {t('common.delete')}
                </Button>
            </div>
        </Modal>
    );
}
