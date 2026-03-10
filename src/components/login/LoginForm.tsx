import { useForm } from 'react-hook-form';
import type { LoginRequest } from "@/types/auth/login";
import { useTranslation } from "react-i18next";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "@/validations/auth/loginSchema";
import { FormField } from "@/components/ui/FormField";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/Button';

interface LoginFormProps {
    onSubmit: (data: LoginRequest) => Promise<void>;
    isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const {t} = useTranslation();

    const {register, handleSubmit, formState: { errors }} = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema(t)),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                id="email"
                label={t('auth.login.email')}
                type="email"
                placeholder="paul@exemple.com"
                disabled={isLoading}
                error={errors.email?.message}
                {...register('email')}
            />

            <FormField
                id="password"
                label={t('auth.login.password')}
                type="password"
                placeholder="********"
                disabled={isLoading}
                error={errors.password?.message}
                {...register('password')}
            />

            <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
                    {t('auth.login.forgot_password')}
                </Link>
            </div>

            <Button type="submit" fullWidth size='lg' disabled={isLoading} isLoading={isLoading}>
                {t('auth.login.submit')}
            </Button>
        </form>
    );
}