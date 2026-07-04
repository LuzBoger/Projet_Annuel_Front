import { DeleteAccountFormData, deleteAccountSchema } from "@/validations/auth/deletePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface DeleteAccountFormProps {
    onConfirm: (password: string) => Promise<void>;
    onCancel: () => void;
}

export function DeleteFormData({ onConfirm, onCancel }: DeleteAccountFormProps) {
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DeleteAccountFormData>({
        resolver: yupResolver(deleteAccountSchema(t)),
    });

    const onSubmit = handleSubmit(async ({ password }) => {
        await onConfirm(password);
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('data.delete.modal_warning')}
            </p>

            <FormField
                id="confirm-password"
                label={t('data.delete.password_label')}
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                disabled={isSubmitting}
                {...register('password')}
            />

            <div className="flex gap-3 justify-end pt-2">
                <Button variant="pill-red" type="button" onClick={onCancel} disabled={isSubmitting}>
                    {t('common.cancel')}
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-red-600 hover:bg-red-700 w-40"
                >
                    {t('data.delete.confirm_btn')}
                </Button>
            </div>
        </form>
    );
}