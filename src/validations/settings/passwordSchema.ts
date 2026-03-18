import { PASSWORD_PATTERN } from '@/constants/global';
import * as yup from 'yup';

export const passwordSchema = (t: (key:string) => string) => yup.object({
    currentPassword: yup.string().required(t('validation.password.required')).min(12, t('validation.password.min')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
    newPassword: yup.string().required(t('validation.password.required')).min(12, t('validation.password.min')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], t('validation.confirmPassword.match')).required(t('validation.confirmPassword.required')),
})

export type PasswordFormData = yup.InferType<ReturnType<typeof passwordSchema>>;