import { useTranslation } from "react-i18next";
import { AdminLoginRequest } from "@/types/auth/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminLoginSchema } from "@/validations/auth/adminLoginSchema";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface AdminLoginFormProps {
    onSubmit: (data:AdminLoginRequest) => Promise<void>;
    isLoading: boolean;
}

export function AdminLoginForm({ onSubmit, isLoading }: AdminLoginFormProps) {
    const {t} = useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginRequest>({
        resolver: yupResolver(adminLoginSchema(t))
    });

  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                id="email"
                label={t('auth.login.email')}
                type="email"
                placeholder={t('auth.login.email_placeholder')}
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
            
            <FormField
                id="secretKey"
                label={t('auth.login.secretKey')}
                type="password"
                placeholder="********"
                disabled={isLoading}
                error={errors.secretKey?.message}
                {...register('secretKey')}
            />


            <Button type="submit" fullWidth size='lg' disabled={isLoading} isLoading={isLoading}>
                {t('auth.login.submit')}
            </Button>
        </form>
    );
}