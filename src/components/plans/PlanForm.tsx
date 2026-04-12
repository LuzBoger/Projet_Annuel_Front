import { useTranslation } from "react-i18next";
import { PlanResponse } from "@/types/plan/plan";
import { CreatePlanFormData, createPlanSchema } from "@/validations/plans/createPlanSchema";
import { UpdatePlanFormData, updatePlanSchema } from "@/validations/plans/updatePlanSchema";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { PaymentInterval } from "@/types/payment/payment";
import { Button } from "@/components/ui/Button";

interface PlanFormProps {
    plan?: PlanResponse | null;
    isOpen: boolean;
    onCancel(): void;
    onSubmit: (data: CreatePlanFormData |  UpdatePlanFormData) => void; 
    isLoading: boolean;
}


export function PlanForm({ plan, isOpen, onCancel, onSubmit, isLoading }: PlanFormProps) {
    const { t } = useTranslation();
    const isEditPlan = !!plan;

    const {register, handleSubmit, reset, setValue, control, formState: { errors}} = useForm<CreatePlanFormData | UpdatePlanFormData>({
        resolver: yupResolver(isEditPlan ? updatePlanSchema(t) : createPlanSchema(t)) as Resolver<CreatePlanFormData | UpdatePlanFormData> ,
        defaultValues: {
            currency: 'EUR',
            paymentInterval: 'MONTHLY',
            subscriptionType: 'FREE'
        }
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
            isActive: true,
        })
    } else {
        reset({
            name: '',
            description: '',
            price: 0,
            currency: 'EUR',
            paymentInterval: 'MONTHLY',
            subscriptionType: 'FREE',
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

    if(!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {isEditPlan ? t('plans.edit.title') : t('plans.create.title')}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <textarea
                            id="description"
                            rows={4}
                            className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                            {...register('description')}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                                        <div className="grid grid-cols-2 gap-4">
                        <FormField
                            id="price"
                            label={t('plans.form.price')}
                            type="number"
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

                    {isEditPlan && (
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                {...register('isActive' as keyof (CreatePlanFormData | UpdatePlanFormData))}
                            />
                            <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                                {t('plans.is_active')}
                            </label>
                        </div>
                    )}

                    <div className="flex gap-3 justify-end pt-4">
                        <Button variant="outline" type="button" onClick={onCancel} disabled={isLoading}>
                            {t('common.cancel')}
                        </Button>
                        <Button variant="primary" type="submit" disabled={isLoading} isLoading={isLoading}>
                            {isEditPlan ? t('common.update') : t('common.create')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
)
}
    
