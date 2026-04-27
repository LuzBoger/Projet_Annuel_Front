import { useState } from "react";
import { Link, Navigate, useNavigate, type ErrorResponse } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import type { TwoFactorCodeFormData } from "@/validations/auth/twoFactorCodeSchema";
import type { AxiosError } from "axios";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { Verify2FAForm } from "@/components/verify-2fa/Verify2FAForm";

export default function Verify2FA() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { verify2FA, tempUserId, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!tempUserId) {
        return <Navigate to="/login" replace />;
    }


    const handleSubmit = async (data: TwoFactorCodeFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            await verify2FA(data.code);
            navigate("/");
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response?.status === 401) {
                setError(t('error.auth.invalid_2fa_code'));
            } else {
                setError(t('error.generic'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <AuthenticationLayout title={t('auth.verify_2fa.title')}>
      <p className="text-sm text-gray-600 text-center mb-6">
        {t('auth.verify_2fa.description')}
      </p>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
          <p>{error}</p>
        </div>
      )}

      <Verify2FAForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-6 text-center">
        <Link to="/login" className="text-brand-600 hover:text-brand-800 text-sm">
          {t('auth.back_home')}
        </Link>
      </div>
    </AuthenticationLayout>
  );
}
