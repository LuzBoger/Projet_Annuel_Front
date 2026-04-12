import { useState } from 'react';
import { ErrorResponse, Link, useNavigate } from 'react-router-dom'
import type { RegisterRequest } from '@/types/auth/register';
import { useTranslation } from 'react-i18next';
import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';
import { RegisterForm } from '@/components/register/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';

export default function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: RegisterRequest) => {
        try {
            setIsLoading(true);
            await registerUser(data);
            navigate('/login');
        } 
         catch (err) {
              const axiosError = err as AxiosError<ErrorResponse>;
              const status = axiosError.response?.status;
              if (status === 409) {
                setError(t('error.auth.email_already_registered'));
              }
         }finally {
            setIsLoading(false);
        }
    };

    return (
    <AuthenticationLayout 
      title={t('auth.register.title')}
      illustrationTitle={<>{t('auth.illustrations.register.title_start')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{t('auth.illustrations.register.title_highlight')}</span></>}
      illustrationDescription={t('auth.illustrations.register.description')}
    >
      <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-6 text-center">
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        <p className="text-gray-600 dark:text-gray-400">
          {t('auth.register.has_account')}{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold">
            {t('auth.register.login')}
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm">
          {t('auth.back_home')}
        </Link>
      </div>
    </AuthenticationLayout>
  );
}

