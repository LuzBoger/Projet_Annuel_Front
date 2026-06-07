import * as yup from 'yup';

export const contactSchema = (t: (key: string) => string) =>
    yup.object({
        name: yup.string().required(t('validation.contactName.required')).max(100, t('validation.contactName.max')),
        email: yup.string().required(t('validation.contactEmail.required')).email(t('validation.contactEmail.invalid')),
        subject: yup.string().required(t('validation.contactSubject.required')),
        message: yup.string().required(t('validation.contactMessage.required')).min(10, t('validation.contactMessage.min')),
    });

export type ContactFormData = yup.InferType<ReturnType<typeof contactSchema>>;
