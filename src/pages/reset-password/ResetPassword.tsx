import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import type { ResetPasswordFormData } from "@/validations/auth/resetPasswordSchema";
import { authService } from "@/services/authService";
import type { AxiosError } from "axios";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";

export default function ResetPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        token: token!,
        newPassword: data.password
      });
      setIsSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const status = axiosError.response?.status;

      switch (status) {
        case 401:
          setError(t("auth.reset_password.token_expired"));
          break;
        case 400:
          setError(t("auth.reset_password.weak_password"));
          break;
        default:
          setError(axiosError.response?.data?.message || t("error.generic"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthenticationLayout title={t("auth.reset_password.title")}>
        <div className="text-center space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              {t("auth.reset_password.invalid_link")}
            </p>
          </div>
          <Link
            to="/forgot-password"
            className="text-brand-600 hover:text-brand-800 text-sm"
          >
            {t("auth.reset_password.request_new_link")}
          </Link>
        </div>
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout title={t("auth.reset_password.title")}>
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              {t("auth.reset_password.success")}
            </p>
          </div>
          <Link
            to="/login"
            className="text-brand-600 hover:text-brand-800 text-sm font-medium"
          >
            {t("auth.reset_password.go_to_login")}
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6 text-center">
            {t("auth.reset_password.description")}
          </p>

          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
              <p>{error}</p>
            </div>
          )}

          <ResetPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
        </>
      )}
    </AuthenticationLayout>
  );
}
