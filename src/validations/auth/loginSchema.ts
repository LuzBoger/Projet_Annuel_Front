import * as yup from 'yup';

export const loginSchema = (t: (key:string) => string) =>
  yup.object({
  email: yup.string().required(t('validation.email.required')).email(t('validation.email.invalid')),
  password: yup.string().required(t('validation.password.required')),
});

export type LoginFormData = yup.InferType<ReturnType<typeof loginSchema>>;
