import { PasswordForm } from "@/components/settings/password/PasswordForm";
import { useTranslation } from "react-i18next";

export function PasswordSettings() {
    const {t} = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('settings.password.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('settings.password.description')}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <PasswordForm />
      </div>
    </div>
  );
};