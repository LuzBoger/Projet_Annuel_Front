import * as yup from 'yup';

export const cancelSubscriptionSchema = (t: (key:string) => string) =>  
    yup.object({
        isCancelAtPeriodEnd: yup.boolean().required(),
        cancellationReason: yup.string().max(500, t('validation.cancellationReason.max')).optional(),
    });

export type CancelSubscriptionFormData = yup.InferType<ReturnType<typeof cancelSubscriptionSchema>>;
