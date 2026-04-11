import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import type { Enable2FAResponse } from "@/types/auth/twoFactor";
import type { ErrorResponse } from "@/types/api/response";
import type { AxiosError } from "axios";
import type { TwoFactorCodeFormData } from "@/validations/auth/twoFactorCodeSchema";
import { Button } from "@/components/ui/Button";
import { Enable2FA } from "@/components/settings/twofactor/Enable2FA";
import { Disabled2FA } from "@/components/settings/twofactor/Disabled2FA";
import { MetaData } from "@/components/seo/MetaData";

export default function TwoFactorSettings() {
    const { t } = useTranslation();
    const { user, enable2FA, verify2FASetup, disable2FA } = useAuth();
    const [setupData, setSetupData] = useState<Enable2FAResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleEnable = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await enable2FA({});
            setSetupData(response);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            setError(axiosError.response?.data?.message || t('error.generic'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifySetup = async (data: TwoFactorCodeFormData) => {
        if(!setupData){
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await verify2FASetup({ twoFactorAuthId: setupData.twoFactorAuthId, code: data.code});
            setSetupData(null);
            setSuccess(t('settings.2fa.enable_success'));
        }catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response?.status === 401) {
                setError(t('error.auth.invalid_2fa_code'));
            } else {
                setError(axiosError.response?.data?.message || t('error.generic'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisable = async (data: TwoFactorCodeFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await disable2FA(data.code);
            setSuccess(t('settings.2fa.disable_success'));
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response?.status === 401) {
                setError(t('error.auth.invalid_2fa_code'));
            } else {
                setError(axiosError.response?.data?.message || t('error.generic'));
            }
        } finally {
            setIsLoading(false);
    }
  };

  
  return (
    <>
      <MetaData title={t('settings.2fa.page_title')}  robots="noindex, nofollow"  />
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">
        {t('settings.2fa.title')}
      </h2>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
          <p>{success}</p>
        </div>
      )}

      {user?.has2FAEnabled ? (
        <Disabled2FA onDisable={handleDisable} isLoading={isLoading} />
      ) : setupData ? (
        <Enable2FA
          qrCodeUri={setupData.qrCodeUri}
          secret={setupData.secret}
          onVerify={handleVerifySetup}
          onCancel={() => setSetupData(null)}
          isLoading={isLoading}
        />
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('settings.2fa.not_enabled')}</p>
          <Button variant="primary" size="lg" onClick={handleEnable} disabled={isLoading} isLoading={isLoading}>
            {t('settings.2fa.enable_button')}
          </Button>
        </div>
      )}
    </div>
    </>
  );
}