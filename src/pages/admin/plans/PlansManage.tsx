import { useTranslation } from "react-i18next";
import { usePlan } from "../../../hooks/usePlan";
import { useEffect, useState } from "react";
import {  PlanResponse } from "../../../types/plan/plan";
import { CreatePlanFormData } from "../../../validations/plans/createPlanSchema";
import { UpdatePlanFormData } from "../../../validations/plans/updatePlanSchema";
import { TableColumn } from "../../../types/components/tableColumn";
import { Button } from "../../../components/ui/Button";
import { Table } from "../../../components/ui/Table";
import { PlanForm } from "../../../components/plans/PlanForm";
import { DeletePlanModal } from "../../../components/plans/DeletePlanModal";
import { getFormatForCurrency } from "../../../lib/utils/currency";

export default function PlansManage() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const { plans, loading, error, createPlan, updatePlan, deletePlan, fetchPlans, } = usePlan();
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null);

    const colums :TableColumn[] = [
        {key: 'name', label: t('plans.table.name')},
        {key: 'description', label: t('plans.table.description')},
        {key: 'price', label: t('plans.table.price')},
        {key: 'interval', label: t('plans.table.interval')},
        {key: 'actions', label: t('plans.table.actions')},
    ];

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    const handleCreatePlan = () => {
        setSelectedPlan(null);
        setShowForm(true);  
    }

    const handleEditPlan = (plan: PlanResponse) => {
        setSelectedPlan(plan);
        setShowForm(true);
    }

    const handleDeletePlan = (plan: PlanResponse) => {
        setSelectedPlan(plan);
        setShowDeleteModal(true);
    }

    const onSubmitPlanForm  = async (data: CreatePlanFormData | UpdatePlanFormData) => {
        if(selectedPlan) {
            await updatePlan(selectedPlan.id, data as UpdatePlanFormData);
        } else {
            await createPlan(data as CreatePlanFormData);
        }
        setShowForm(false);
        setSelectedPlan(null);
        fetchPlans();
    }

    const onCancelPlanForm = () => {
        setShowForm(false);
        setSelectedPlan(null);
    }

    const confirmDeletePlan = async () => {
        if(selectedPlan) {
            await deletePlan(selectedPlan.id);
            setShowDeleteModal(false);
            setSelectedPlan(null);
            fetchPlans();
        }
    }

    return (
            <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-indigo-900">
                    {t('plans.page_title')}
                </h1>
                <Button variant="primary" onClick={handleCreatePlan}>
                    {t('common.create')}
                </Button>
            </div>

            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{error}</p>
                </div>
            )}

            <Table
                data={plans}
                columns={colums}
                keyExtractor={(plan) => plan.id}
                renderRow={(plan) => (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${getFormatForCurrency(locale, plan.currency, plan.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t(`payment.intervals.${plan.paymentInterval.toLowerCase()}`)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="secondary" onClick={() => handleEditPlan(plan)}>
                                {t('common.edit')}
                            </Button>
                            <Button variant="danger" onClick={() => handleDeletePlan(plan)}>
                                {t('common.delete')}
                            </Button>
                        </td>
                    </>
                )}
            />

            <PlanForm
                isOpen={showForm}
                isLoading={loading}
                plan={selectedPlan}
                onCancel={onCancelPlanForm}
                onSubmit={onSubmitPlanForm}
            />

            <DeletePlanModal
                isOpen={showDeleteModal}
                isLoading={loading}
                plan={selectedPlan}
                onCancel={() => setShowDeleteModal(false)}
                onDelete={confirmDeletePlan}
            />
        </div>
    )








}