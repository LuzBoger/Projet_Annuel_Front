import { useTranslation } from "react-i18next";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AdminLoginRequest } from "@/types/auth/login";
import { AxiosError } from "axios";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { AdminLoginForm } from "@/components/login/AdminLoginForm";

export default function AdminLogin() {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {adminLogin} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (data: AdminLoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await adminLogin(data);
            navigate('/');
        } catch (err) {
              const axiosError = err as AxiosError<ErrorResponse>;
              const status = axiosError.response?.status;
            if (status === 401) {
                setError(t('error.auth.invalid_credentials'));
              } else {
                setError(t('error.generic'));
              }
            } finally {
              setIsLoading(false);
            }
    };

     return (
            <AuthenticationLayout title={t('auth.login.title')} >
              {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{error}</p>
                </div>
            )}
                <AdminLoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            </AuthenticationLayout>
        )
}