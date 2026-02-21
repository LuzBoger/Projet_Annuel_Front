import { useTranslation } from "react-i18next";
import { twoFactorCodeSchema, type TwoFactorCodeFormData } from "../../../validations/auth/twoFactorCodeSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../ui/Button";
import { CodeInput } from "../../ui/CodeInput";
import { QRCodeSVG } from "qrcode.react";

interface Enable2FAProps {
    qrCodeUri: string;
    secret: string;
    onVerify: (data: TwoFactorCodeFormData) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}

export function Enable2FA({ qrCodeUri, secret, onVerify, onCancel, isLoading }: Enable2FAProps) {
    const { t } = useTranslation();
    const { handleSubmit, control, formState: { errors } } = useForm<TwoFactorCodeFormData>({
        resolver: yupResolver(twoFactorCodeSchema(t)),
        defaultValues: { code: "" }
    }); 

     return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 text-center">{t('settings.2fa.scan_qr')}</p>

      <div className="flex justify-center">
        <QRCodeSVG value={qrCodeUri} size={192} />
      </div>

      <div className="bg-gray-50 rounded-md p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">{t('settings.2fa.manual_key')}</p>
        <code className="text-sm font-mono font-bold text-gray-800 select-all">
          {secret}
        </code>
      </div>

      <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
        <p className="text-sm text-gray-600 text-center">{t('settings.2fa.enter_code')}</p>
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
          <Button type="button" variant="outline" fullWidth onClick={onCancel} disabled={isLoading}>
            {t('settings.2fa.cancel')}
          </Button>
          <Button type="submit" fullWidth size="lg" disabled={isLoading} isLoading={isLoading}>
            {t('settings.2fa.verify_button')}
          </Button>
        </div>
      </form>
    </div>
    );
}