import { useTranslation } from "react-i18next";
import { PlanFormValues, PlanResponse } from "@/types/plan/plan";
import { CreatePlanFormData, createPlanSchema } from "@/validations/plans/createPlanSchema";
import { UpdatePlanFormData, updatePlanSchema } from "@/validations/plans/updatePlanSchema";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { PaymentInterval } from "@/types/payment/payment";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AddInput } from "@/components/ui/AddInput";

interface PlanFormProps {
    plan?: PlanResponse | null;
    isOpen: boolean;
    onCancel(): void;
    onSubmit: (data: CreatePlanFormData | UpdatePlanFormData) => void;
    isLoading: boolean;
    apiError: string | null;
}

export function PlanForm({ plan, isOpen, onCancel, onSubmit, isLoading, apiError }: PlanFormProps) {
    const { t } = useTranslation();
    const isEditPlan = !!plan;

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<PlanFormValues>({
        resolver: yupResolver(isEditPlan ? updatePlanSchema(t) : createPlanSchema(t)) as Resolver<PlanFormValues>,
        defaultValues: {
            currency: 'EUR',
            paymentInterval: 'MONTHLY',
            subscriptionType: 'FREE',
        },
    })

  useEffect(() => {
    if(plan) {
        reset({
            name: plan.name,
            description: plan.description || undefined,
            price: plan.price,
            currency: plan.currency,
            paymentInterval: plan.paymentInterval,
            subscriptionType: plan.subscriptionType,
            isActive: plan.isActive,
            aiQuota: plan.aiQuota ?? 5,
            features: plan.features?.map(feature => ({ label: feature.label, orderIndex: feature.orderIndex })) ?? [],
        })
    } else {
        reset({
            name: '',
            description: '',
            price: 0,
            currency: 'EUR',
            paymentInterval: 'MONTHLY',
            subscriptionType: 'FREE',
            aiQuota: 5,
            features: [],
        })
    }
    }, [plan, reset])

    const subscriptionType = useWatch({ control, name: 'subscriptionType' });
    const currency = useWatch({ control, name: 'currency' });
    const paymentInterval = useWatch({ control, name: 'paymentInterval' });
    const isFree = subscriptionType === 'FREE';

    const subscriptionTypeOptions = [
        { value: 'FREE', label: t('subscription.type.free') },
        { value: 'PREMIUM', label: t('subscription.type.premium') },
    ]

    const paymentIntervalOptions = [
        { value: 'MONTHLY', label: t('subscription.interval.monthly') },
        { value: 'YEARLY', label: t('subscription.interval.yearly') },
    ]

    const currencyOption = [
        { value: 'EUR', label: 'EUR (€)' },
    ]

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={isEditPlan ? t('plans.edit.title') : t('plans.create.title')}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data as CreatePlanFormData | UpdatePlanFormData))} className="space-y-4">
                {apiError && (
                    <div className="p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-sm">
                        {apiError}
                    </div>
                )}
                <FormField
                    id="name"
                    label={t('plans.form.name')}
                    type="text"
                    disabled={isLoading}
                    error={errors.name?.message}
                    {...register('name')}
                />
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('plans.form.description')}</label>
                    <TextArea
                        id="description"
                        rows={4}
                        disabled={isLoading}
                        error={errors.description?.message}
                        {...register('description')}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        id="price"
                        label={t('plans.form.price')}
                        type="number"
                        step="0.01"
                        disabled={isLoading}
                        error={errors.price?.message}
                        {...register('price')}
                    />
                    <Select
                        id="currency"
                        label={t('plans.form.currency')}
                        value={currency ?? 'EUR'}
                        options={currencyOption}
                        disabled={isLoading}
                        error={errors.currency?.message}
                        onChange={(value) => setValue('currency', value)}
                    />
                </div>

                <Select
                    id="subscriptionType"
                    label={t('plans.form.subscription_type')}
                    value={subscriptionType ?? 'FREE'}
                    options={subscriptionTypeOptions}
                    disabled={isLoading}
                    error={errors.subscriptionType?.message}
                    onChange={(value) => setValue('subscriptionType', value as 'FREE' | 'PREMIUM')}
                />

                {!isFree && (
                    <Select
                        id="paymentInterval"
                        label={t('plans.form.payment_interval')}
                        value={paymentInterval ?? 'MONTHLY'}
                        options={paymentIntervalOptions}
                        disabled={isLoading}
                        error={errors.paymentInterval?.message}
                        onChange={(value) => setValue('paymentInterval', value as PaymentInterval)}
                    />
                )}

                {!isFree && (
                    <FormField
                        id="stripePriceId"
                        label={t('plans.form.stripe_price_id')}
                        type="text"
                        disabled={isLoading}
                        error={errors.stripePriceId?.message}
                        {...register('stripePriceId')}
                    />
                )}

                <FormField
                    id="aiQuota"
                    label={t('plans.form.ai_quota')}
                    type="number"
                    step="1"
                    min="1"
                    disabled={isLoading}
                    error={(errors as Record<string, { message?: string }>).aiQuota?.message}
                    {...register('aiQuota' as keyof (CreatePlanFormData | UpdatePlanFormData))}
                />
                <p className="text-xs text-gray-400 -mt-2">{t('plans.form.ai_quota_hint')}</p>

                <AddInput
                    control={control}
                    register={register}
                    name="features"
                    label={t('plans.form.features')}
                    placeholder={t('plans.form.feature_placeholder')}
                    addLabel={t('plans.form.add_feature')}
                    removeLabel={t('common.remove')}
                    isLoading={isLoading}
                />

                {isEditPlan && (
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                            {...register('isActive' as keyof (CreatePlanFormData | UpdatePlanFormData))}
                        />
                        <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                            {t('plans.is_active')}
                        </label>
                    </div>
                )}

                <div className="flex gap-3 justify-end pt-4">
                    <Button variant="pill-red" type="button" onClick={onCancel} disabled={isLoading}>
                        {t('common.cancel')}
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading} isLoading={isLoading} className="w-40">
                        {isEditPlan ? t('common.update') : t('common.create')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
