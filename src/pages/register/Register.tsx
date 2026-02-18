import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import type { RegisterRequest } from '../../types/auth/register';
import { useTranslation } from 'react-i18next';
import { AuthenticationLayout } from './../../components/layouts/AuthenticationLayout';
import { RegisterForm } from '../../components/register/RegisterForm';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: RegisterRequest) => {
        try {
            setIsLoading(true);
            await registerUser(data);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

     return (
    <AuthenticationLayout title={t('auth.register.title')}>
      <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {t('auth.register.has_account')}{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            {t('auth.register.login')}
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
          {t('auth.back_home')}
        </Link>
      </div>
    </AuthenticationLayout>
  );
}

