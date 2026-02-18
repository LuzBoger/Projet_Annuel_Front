import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types/auth/login';
import { AuthenticationLayout } from '../../components/layouts/AuthenticationLayout';
import { LoginForm } from '../../components/login/LoginForm';
import { useState } from 'react';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const result = await login(data);
      if (result.required2FA) {
        navigate('/verify-2fa');
      } else {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <AuthenticationLayout title={t('auth.login.title')} >
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

            <div className='mt-6 text-center'>
                <p className='text-sm text-gray-600'>
                    {t('auth.login.no_account')}{' '}
                    <Link to="/register" className='text-indigo-600 hover:text-indigo-800'>
                        {t('auth.login.create_account')}
                    </Link>
                </p>
            </div>

            <div className='mt-4 text-center'>
                <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                    {t('auth.back_home')}
                </Link>
            </div>
        </AuthenticationLayout>
    )
}
