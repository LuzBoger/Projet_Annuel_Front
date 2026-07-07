import { DeleteAccountFormData, deleteAccountSchema } from "@/validations/auth/deletePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { CodeInput } from "@/components/ui/CodeInput";
import { formatTotalTime } from "@/lib/utils/date";

interface DeleteFormDataProps {
    onConfirm: (code: string) => Promise<void>;
    onCancel: () => void;
    remaining: number;
    onResend: () => Promise<void>;
}

export function DeleteFormData({ onConfirm, onCancel, remaining, onResend }: DeleteFormDataProps) {
    const { t } = useTranslation();

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<DeleteAccountFormData>({
        resolver: yupResolver(deleteAccountSchema(t)),
        defaultValues: { code: '' },
    });

    const onSubmit = handleSubmit(async ({ code }) => {
        await onConfirm(code);
    });

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('data.delete.code_sent_info')}
            </p>

            <Controller
                name="code"
                control={control}
                render={({ field }) => (
                    <CodeInput
                        length={6}
                        value={field.value ? field.value.split('') : Array(6).fill('')}
                        onChange={(digits) => field.onChange(digits.join(''))}
                        disabled={isSubmitting}
                        error={!!errors.code}
                        autoFocus
                    />
                )}
            />

            {errors.code && ( <p className="text-xs text-red-500 text-center">{errors.code.message}</p>)}

            <div className="text-center text-xs">
                {remaining > 0 ? (
                    <p className="text-gray-400">
                        {t('data.delete.resend_wait', { time: formatTotalTime(remaining) })}
                    </p>
                ) : (
                    <Button
                        type="button"
                        onClick={onResend}
                        disabled={isSubmitting}
                        className="text-red-500 hover:underline"
                    >
                        {t('data.delete.resend_btn')}
                    </Button>
                )}
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
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
