import * as yup from 'yup';

export const createPlanSchema = (t: (key:string) => string) =>
yup.object({
    name: yup.string().required(t('validation.planName.required')).max(100, t('validation.planName.max')).min(3, t('validation.planName.min')),
    description: yup.string().max(500, t('validation.planDescription.max')).optional(),
    price: yup.number().required(t('validation.planPrice.required')).min(0, t('validation.planPrice.min')),
    currency: yup.string().required(t('validation.planCurrency.required')).length(3, t('validation.planCurrency.length')),
    paymentInterval: yup.string().oneOf(['MONTHLY', 'YEARLY'], t('validation.planPaymentInterval.oneOf')).optional().nullable(),
    subscriptionType: yup.string().oneOf(['FREE', 'PREMIUM'], t('validation.subscriptionType.oneOf')).required(t('validation.subscriptionType.required')),
    stripePriceId: yup.string().optional().nullable(),
    isActive: yup.boolean().optional(),
})

export type CreatePlanFormData = yup.InferType<ReturnType<typeof createPlanSchema>>;
