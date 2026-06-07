import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MetaData } from "@/components/seo/MetaData";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <MetaData
        title={t('contact.title')}
        description={t('contact.subtitle')}
        robots="index, follow"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">
            ← {t('common.home')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('contact.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('contact.subtitle')}
              </p>

              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('contact.info.title')}
                </h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('contact.info.emailLabel')}</p>
                    <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                      {t('contact.info.emailValue')}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('contact.info.rgpdLabel')}</p>
                    <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                      {t('contact.info.rgpdValue')}
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {t('contact.info.responseTime')}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('contact.info.usefulLinks')}
                </h2>
                <nav className="space-y-2 text-sm">
                  <Link to="/legal/politique-de-confidentialite" className="block text-brand-600 dark:text-brand-400 hover:underline">
                    {t('footer.privacy')}
                  </Link>
                  <Link to="/legal/politique-de-cookies" className="block text-brand-600 dark:text-brand-400 hover:underline">
                    {t('footer.cookies')}
                  </Link>
                  <Link to="/legal/cgu" className="block text-brand-600 dark:text-brand-400 hover:underline">
                    {t('footer.cgu')}
                  </Link>
                </nav>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
