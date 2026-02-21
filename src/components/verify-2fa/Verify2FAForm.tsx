import { useTranslation } from "react-i18next";
import { twoFactorCodeSchema, type TwoFactorCodeFormData } from "../../validations/auth/twoFactorCodeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { CodeInput } from "../ui/CodeInput";

interface Verify2FAFormProps {
    onSubmit: (data: TwoFactorCodeFormData) => Promise<void>;
    isLoading: boolean;
}

export function Verify2FAForm({ onSubmit, isLoading }: Verify2FAFormProps) {
    const {t} = useTranslation();
  
    const {handleSubmit, control, formState: { errors }} = useForm<TwoFactorCodeFormData>({
        resolver: yupResolver(twoFactorCodeSchema(t)),
        defaultValues: { code: "" }
    });

    return(
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <Button type="submit" fullWidth size="lg" disabled={isLoading} isLoading={isLoading}>
        {t('auth.verify_2fa.submit')}
      </Button>
    </form>
  );
}
  
