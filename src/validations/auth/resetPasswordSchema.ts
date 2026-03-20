import { PASSWORD_PATTERN } from '@/constants/global';
import * as yup from 'yup';


export const resetPasswordSchema = (t: (key:string) => string) =>
  yup.object({
    password: yup.string().required(t('validation.password.required')).min(12, t('validation.password.min')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
    confirmPassword: yup.string().required(t('validation.confirmPassword.required')).oneOf([yup.ref('password')], t('validation.confirmPassword.match')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
  });

export type ResetPasswordFormData = yup.InferType<ReturnType<typeof resetPasswordSchema>>;