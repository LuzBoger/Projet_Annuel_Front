import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest } from '@/types/auth/login';
import { RoleEnum } from '@/types/enum/roles';
import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';
import { LoginForm } from '@/components/login/LoginForm';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types/api/response';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  const handleSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setIsAccountLocked(false);
    try {
      const result = await login(data);
      if (result.required2FA) {
        navigate('/verify-2fa');
      } else {
        navigate(user?.role === RoleEnum.ADMIN ? '/admin' : '/dashboard');
      }
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const status = axiosError.response?.status;

      if (status === 423) {
        setIsAccountLocked(true);
        setError(t('error.auth.account_locked'));
      } else if (status === 401) {
        setError(t('error.auth.invalid_credentials'));
      } else {
        setError(t('error.generic'));
      }
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <AuthenticationLayout 
            title={t('auth.login.title')}
            illustrationTitle={<>{t('auth.illustrations.login.title_start')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">{t('auth.illustrations.login.title_highlight')}</span></>}
            illustrationDescription={t('auth.illustrations.login.description')}
        >
            {error && (
              <div className={`mb-4 rounded-md p-4 ${isAccountLocked ? 'bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <p className={`text-sm ${isAccountLocked ? 'text-red-800 dark:text-red-300 font-medium' : 'text-red-600 dark:text-red-400'}`}>
                  {error}
                </p>
              </div>
            )}
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

            <div className='mt-6 text-center'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {t('auth.login.no_account')}{' '}
                    <Link to="/register" className='text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300'>
                        {t('auth.login.create_account')}
                    </Link>
                </p>
            </div>

            <div className='mt-4 text-center'>
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm">
                    {t('auth.back_home')}
                </Link>
            </div>
        </AuthenticationLayout>
    )
}
