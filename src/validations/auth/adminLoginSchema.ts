import * as yup from 'yup';

export const adminLoginSchema = (t: (key: string) => string) => yup.object().shape({
    email: yup.string().required(t('validation.email.required')).email(t('validation.email.invalid')),

    password: yup.string().required(t('validation.password.required')).min(8, t('validation.password.min')),

    secretKey: yup.string().required(t('validation.secretKey.required')).min(10, t('validation.secretKey.min')),
});

export type AdminLoginFormData = yup.InferType<ReturnType<typeof adminLoginSchema>>;