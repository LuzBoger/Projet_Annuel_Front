import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CGU() {
  const { t } = useTranslation();

  return (
    <>
      <MetaData title={t('legal.cgu.title')} description={t('legal.cgu.description')} robots="noindex, nofollow"/>
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">← {t('common.home')}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('legal.cgu.title')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{t('legal.cgu.lastUpdate')}</p>
          <div className="space-y-5">

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />{t('legal.cgu.object.title')}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgu.object.p1')}{" "}
                <a href="https://www.skaldly.fr" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">
                  skaldly.fr
                </a>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.acceptance.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.acceptance.p1')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.account.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.account.intro')}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>{t('legal.cgu.account.item1')}</li>
                <li>{t('legal.cgu.account.item2')}</li>
                <li>{t('legal.cgu.account.item3')}</li>
                <li>{t('legal.cgu.account.item4')}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.usage.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.usage.intro')}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>{t('legal.cgu.usage.item1')}</li>
                <li>{t('legal.cgu.usage.item2')}</li>
                <li>{t('legal.cgu.usage.item3')}</li>
                <li>{t('legal.cgu.usage.item4')}</li>
                <li>{t('legal.cgu.usage.item5')}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.subscription.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgu.subscription.p1')}{" "}
                <Link to="/plans" className="text-brand-600 dark:text-brand-400 underline">{t('legal.cgu.subscription.plans_link')}</Link>.{" "}
                {t('legal.cgu.subscription.p2')}{" "}
                <Link to="/legal/cgv" className="text-brand-600 dark:text-brand-400 underline">{t('legal.cgu.subscription.cgv_link')}</Link>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.privacy.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgu.privacy.p1')}{" "}
                <Link to="/legal/politique-de-confidentialite" className="text-brand-600 dark:text-brand-400 underline">
                  {t('legal.cgu.privacy.privacy_link')}
                </Link>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.suspension.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.suspension.p1')}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgu.suspension.p2')}{" "}
                <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                  contact@skaldly.fr
                </a>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.modification.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.modification.p1')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgu.law.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgu.law.p1')}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
