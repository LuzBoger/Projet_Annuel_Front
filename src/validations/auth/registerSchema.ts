import * as yup from 'yup';

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{12,}$/;

export const registerSchema = (t: (key:string) => string) =>
    yup.object({
        email: yup.string().required(t('validation.email.required')).email(t('validation.email.invalid')),
        password: yup.string().required(t('validation.password.required')).min(12, t('validation.password.min')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
        confirmPassword: yup.string().required(t('validation.confirmPassword.required')).oneOf([yup.ref('password')], t('validation.confirmPassword.match')).matches(PASSWORD_PATTERN, t('validation.password.pattern')),
        firstName: yup.string().required(t('validation.firstName.required')),
        lastName: yup.string().required(t('validation.lastName.required')),
        userName: yup.string().required(t('validation.userName.required')).min(3, t('validation.userName.min')).max(50, t('validation.userName.max')),    
    });

export type RegisterFormData = yup.InferType<ReturnType<typeof registerSchema>>;