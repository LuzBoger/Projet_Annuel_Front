import * as yup from 'yup';

export const forgotPasswordSchema = (t: (key:string) => string) =>
  yup.object({
    email: yup.string().required(t('validation.email.required')).email(t('validation.email.invalid')),
  });

export type ForgotPasswordFormData = yup.InferType<ReturnType<typeof forgotPasswordSchema>>;
