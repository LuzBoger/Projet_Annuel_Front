import { yupResolver } from "@hookform/resolvers/yup";
import type { ForgotPasswordRequest } from "@/types/auth/forgotPassword";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/validations/auth/forgotPasswordSchema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface ForgotPasswordFormProps {
    onSubmit: (data: ForgotPasswordRequest) => Promise<void>;
    isLoading: boolean;
    defaultEmail?: string;
}

export default function ForgotPasswordForm({ onSubmit, isLoading, defaultEmail = '' }: ForgotPasswordFormProps) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(forgotPasswordSchema(t)),
        defaultValues: {
            email: defaultEmail,
        }
    });

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                id="email"
                label={t('auth.forgot_password.email')}
                type="email"
                disabled={isLoading}
                error={errors.email?.message}
                {...register('email')}
            />
            <Button type="submit" fullWidth size="lg" disabled={isLoading} isLoading={isLoading}>
                {t('auth.forgot_password.submit')}
            </Button>
        </form>
    )







}