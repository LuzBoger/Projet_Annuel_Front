import { useTranslation } from "react-i18next";
import { twoFactorCodeSchema, type TwoFactorCodeFormData } from "@/validations/auth/twoFactorCodeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CodeInput } from "@/components/ui/CodeInput";

interface Disabled2FAProps {
    onDisable: (data: TwoFactorCodeFormData) => Promise<void>;
    isLoading: boolean;
}

export function Disabled2FA({ onDisable, isLoading }: Disabled2FAProps) {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm<TwoFactorCodeFormData>({
        resolver: yupResolver(twoFactorCodeSchema(t)),
        defaultValues: { code: "" }
    });

if(!showForm){
      return (
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-green-700 font-medium">{t('settings.2fa.enabled_status')}</span>
        </div>
        <Button
          variant="danger"
          onClick={() => setShowForm(true)}
        >
          {t('settings.2fa.disable_button')}
        </Button>
      </div>
    );
}
 return (
    <form onSubmit={handleSubmit(onDisable)} className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{t('settings.2fa.enter_code_disable')}</p>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <CodeInput
            value={field.value ? field.value.split('') : new Array(6).fill('')}
            onChange={(digits) => field.onChange(digits.join(''))}
            disabled={isLoading}
            error={!!errors.code}
          />
        )}
      />
      {errors.code && (
        <p className="text-sm text-red-600 text-center">{errors.code.message}</p>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" fullWidth onClick={() => setShowForm(false)} disabled={isLoading}>
          {t('settings.2fa.cancel')}
        </Button>
        <Button type="submit" variant="danger" fullWidth disabled={isLoading} isLoading={isLoading}>
          {t('settings.2fa.confirm_disable')}
        </Button>
      </div>
    </form>
  );












}
