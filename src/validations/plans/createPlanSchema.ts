import * as yup from 'yup';

export const createPlanSchema = (t: (key:string) => string) =>
yup.object({
    name: yup.string().required(t('validation.planName.required')).max(100, t('validation.planName.max')).min(3, t('validation.planName.min')),
    description: yup.string().max(500, t('validation.planDescription.max')).optional().defined(),
    price: yup.number().required(t('validation.planPrice.required')).min(0, t('validation.planPrice.min')),
    currency: yup.string().required(t('validation.planCurrency.required')).length(3, t('validation.planCurrency.length')),
    paymentInterval: yup.string().oneOf(['MONTHLY', 'YEARLY'], t('validation.planPaymentInterval.oneOf')).optional().defined(),
    stripePriceId: yup.string().optional().defined(),
})

export type CreatePlanFormData = yup.InferType<ReturnType<typeof createPlanSchema>>;