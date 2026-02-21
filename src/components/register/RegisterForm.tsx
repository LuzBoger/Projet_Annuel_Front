import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterRequest } from "../../types/auth/register";
import { registerSchema, type RegisterFormData } from "../../validations/auth/registerSchema";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";

interface RegisterFormProps {
    onSubmit: (data: RegisterRequest) => Promise<void>;
    isLoading: boolean;
}

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    const {t} = useTranslation();

    const { register, handleSubmit, formState: { errors }} = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema(t)),
    });

    const onFormSubmit = (data: RegisterFormData) => {
        const { email, password, firstName, lastName, username } = data;
        return onSubmit({ email, password, firstName, lastName, username });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <FormField
                id="firstName"
                label={t('auth.register.firstName')}
                type="text"
                disabled={isLoading}
                error={errors.firstName?.message}
                {...register('firstName')}
            />

            <FormField
                id="lastName"
                label={t('auth.register.lastName')}
                type="text"
                disabled={isLoading}
                error={errors.lastName?.message}
                {...register('lastName')}
            />

            <FormField
                id='username'
                label={t('auth.register.username')}
                type="text"
                disabled={isLoading}
                error={errors.username?.message}
                {...register('username')}
            />

            <FormField
                id="email"
                label={t('auth.register.email')}
                type="email"
                placeholder="paul@exemple.com"
                disabled={isLoading}
                error={errors.email?.message}
                {...register('email')}
            />

            <FormField
                id="password"
                label={t('auth.register.password')}
                type="password"
                disabled={isLoading}
                error={errors.password?.message}
                {...register('password')}
            />

            <FormField
                id="confirmPassword"
                label={t('auth.register.confirmPassword')}
                type="password"
                disabled={isLoading}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />

            </div>

            <Button type="submit" fullWidth size='lg' disabled={isLoading} isLoading={isLoading}>
                {t('auth.register.submit')}
            </Button>
        </form>
)


}