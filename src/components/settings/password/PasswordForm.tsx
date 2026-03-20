import { profileService } from "@/services/profileService";
import { UpdatePasswordRequest } from "@/types/profile/profile";
import { PasswordFormData, passwordSchema } from "@/validations/settings/passwordSchema";
import { yupResolver } from "@hookform/resolvers/yup/src/index.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { EyeButton } from "@/components/ui/EyeButton";




export function PasswordForm() {

    const {t} = useTranslation();
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm<PasswordFormData>({
        resolver: yupResolver(passwordSchema(t)),
    });

    const onSubmit = async(data: UpdatePasswordRequest) => {

        try {
            setError(null);
            await profileService.changePassword(data);
            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
        if (isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 400) {
            setError(t('profile.password.error.mismatch'));
            } else if (status === 401) {
            setError(t('profile.password.error.invalidCurrent'));
            } else {
            setError(t('profile.password.error.generic'));
            }
        } else {
            setError(t('profile.password.error.generic'));
        }
    }
  };

  const toggleShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {t('profile.password.successMessage')}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative">
        <FormField
          id="currentPassword"
          label={t('profile.password.current')}
          type={showPasswords.current ? 'text' : 'password'}
          disabled={isSubmitting}
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <EyeButton isVisible={showPasswords.current} onToggle={() => toggleShowPassword('current')} />
      </div>

      <div className="relative">
        <FormField
          id="newPassword"
          label={t('profile.password.new')}
          type={showPasswords.new ? 'text' : 'password'}
          disabled={isSubmitting}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <EyeButton isVisible={showPasswords.new} onToggle={() => toggleShowPassword('new')} />
      </div>

      <div className="relative">
        <FormField
          id="confirmPassword"
          label={t('profile.password.confirm')}
          type={showPasswords.confirm ? 'text' : 'password'}
          disabled={isSubmitting}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <EyeButton isVisible={showPasswords.confirm} onToggle={() => toggleShowPassword('confirm')} />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        variant="primary"
        size="lg"
        fullWidth
      >
        {t('profile.password.change')}
      </Button>
    </form>
  );

}