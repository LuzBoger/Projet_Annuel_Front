import { useTranslation } from "react-i18next";
import { usePlan } from "@/hooks/usePlan";
import { useEffect, useState } from "react";
import {  PlanResponse } from "@/types/plan/plan";
import { CreatePlanFormData } from "@/validations/plans/createPlanSchema";
import { UpdatePlanFormData } from "@/validations/plans/updatePlanSchema";
import { TableColumn } from "@/types/components/tableColumn";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { PlanForm } from "@/components/plans/PlanForm";
import { DeletePlanModal } from "@/components/plans/DeletePlanModal";
import { getFormatForCurrency } from "@/lib/utils/currency";
import { TableActions } from "@/components/ui/TableActions";
import { MetaData } from "@/components/seo/MetaData";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { Switch } from "@/components/ui/Switch";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function PlansManage() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const { plans, loading, error, createPlan, updatePlan, deletePlan, fetchPlans, togglePlanStatus } = usePlan();
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null);
    const [planToToggle, setPlanToToggle] = useState<PlanResponse | null>(null);

    const colums :TableColumn[] = [
        {key: 'name', label: t('plans.table.name')},
        {key: 'type', label: t('plans.table.type')},
        {key: 'price', label: t('plans.table.price')},
        {key: 'interval', label: t('plans.table.interval')},
        {key: 'status', label: t('plans.table.status')},
        {key: 'actions', label: t('plans.table.actions')},
    ];

    useEffect(() => {
        fetchPlans(true);
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
        fetchPlans(true);
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
            fetchPlans(true);
        }
    }

    const handleStatusToggle = (plan: PlanResponse) => {
        setPlanToToggle(plan);
        setShowStatusModal(true);
    };

    const confirmStatusToggle = async () => {
        if (planToToggle) {
            await togglePlanStatus(planToToggle.id);
            setShowStatusModal(false);
            setPlanToToggle(null);
            fetchPlans(true);
        }
    };

    const cancelStatusToggle = () => {
        setShowStatusModal(false);
        setPlanToToggle(null);
    };

    return (
        <>
            <MetaData title={t('plans.page_title')} robots="noindex, nofollow"  />
            <div className="w-full space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-brand-900 dark:text-white">
                    {t('plans.page_title')}
                </h1>
                <Button variant="primary" onClick={handleCreatePlan} className="w-40">
                    {t('common.create')}
                </Button>
            </div>

            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-sm">
                    <p>{error}</p>
                </div>
            )}

            <Table
                data={plans}
                columns={colums}
                keyExtractor={(plan) => plan.id}
                renderRow={(plan) => (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{plan.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <BadgeTag color={plan.subscriptionType === 'PREMIUM' ? 'brand' : 'gray'}>
                                {plan.subscriptionType}
                            </BadgeTag>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{getFormatForCurrency(locale, plan.currency, plan.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{plan.paymentInterval ? (t(`payment.intervals.${plan.paymentInterval.toLowerCase()}`)) : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Switch 
                                checked={plan.isActive} 
                                onChange={() => handleStatusToggle(plan)}
                                disabled={loading}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <TableActions 
                                onEdit={() => handleEditPlan(plan)}
                                onDelete={plan.subscriptionType !== "FREE" ? () => handleDeletePlan(plan) : undefined} 
                            />
                        </td>
                    </>
                )}
            />

            <PlanForm
                isOpen={showForm}
                isLoading={loading}
                apiError={error}
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

            <ConfirmModal
                isOpen={showStatusModal}
                title={t('admin.plans.status_title')}
                description={t('admin.plans.status_desc')}
                onConfirm={confirmStatusToggle}
                onCancel={cancelStatusToggle}
                isConfirming={loading}
            />
        </div>
        </>
    )








}
