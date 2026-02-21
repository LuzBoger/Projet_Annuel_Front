import { useTranslation } from "react-i18next";
import { resetPasswordSchema, type ResetPasswordFormData } from "../../validations/auth/resetPasswordSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/index.js";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";

interface ResetPasswordFormProps {
    onSubmit: (data: ResetPasswordFormData) => Promise<void>;
    isLoading: boolean;
}

export default function ResetPasswordForm({ onSubmit, isLoading }: ResetPasswordFormProps) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(resetPasswordSchema(t)),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                id="password"
                label={t('auth.reset_password.new_password')}
                type="password"
                placeholder="*********"
                disabled={isLoading}
                error={errors.password?.message}
                hint={t('auth.register.password_hint')}
                {...register('password')}
            />

            <FormField
                id="confirmPassword"
                label={t('auth.reset_password.confirm_password')}
                type="password"
                placeholder="*********"
                disabled={isLoading}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />

            <Button type="submit" fullWidth size="lg" disabled={isLoading} isLoading={isLoading}>
                {t('auth.reset_password.submit')}
            </Button>
        </form>
    );
};

