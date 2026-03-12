import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import type { ErrorResponse } from "@/types/api/response";
import type { ForgotPasswordRequest } from "@/types/auth/forgotPassword";
import { authService } from "@/services/authService";
import type { AxiosError } from "axios";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const passwordExpired = location.state?.passwordExpired ?? false;
    const existsEmail = location.state?.email ?? '';

    const handleSubmit = async (data: ForgotPasswordRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.forgotPassword(data);
            setIsEmailSent(true);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            setError(axiosError.response?.data?.message || t('error.generic'));
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthenticationLayout 
            title={t('auth.forgot_password.title')}
            illustrationTitle={<>{t('auth.illustrations.forgot_password.title_start')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">{t('auth.illustrations.forgot_password.title_highlight')}</span></>}
            illustrationDescription={t('auth.illustrations.forgot_password.description')}
        >
            {passwordExpired && (
        <div className="mb-4 p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          <p>{t('error.auth.password_expired')}</p>
        </div>
      )}

      {isEmailSent ? (
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">{t('auth.forgot_password.email_sent')}</p>
          </div>
          <p className="text-sm text-gray-600">{t('auth.forgot_password.check_inbox')}</p>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 text-sm">
            {t('auth.forgot_password.back_to_login')}
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6 text-center">
            {t('auth.forgot_password.description')}
          </p>

          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
              <p>{error}</p>
            </div>
          )}

          <ForgotPasswordForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            defaultEmail={existsEmail}
          />

          <div className="mt-6 text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 text-sm">
              {t('auth.forgot_password.back_to_login')}
            </Link>
          </div>
        </>
      )}
    </AuthenticationLayout>
  );
    
}