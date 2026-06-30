import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CGV() {
  const { t } = useTranslation();

  return (
    <>
      <MetaData title={t('legal.cgv.title')} description={t('legal.cgv.description')} robots="noindex, nofollow"/>
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">← {t('common.home')}</Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('legal.cgv.title')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{t('legal.cgv.lastUpdate')}</p>
          <div className="space-y-5">

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.object.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgv.object.p1')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.products.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgv.products.p1')}{" "}
                <Link to="/plans" className="text-brand-600 dark:text-brand-400 underline">
                  {t('legal.cgv.products.plans_link')}
                </Link>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.pricing.title')}
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>{t('legal.cgv.pricing.item1')}</li>
                <li>{t('legal.cgv.pricing.item2')}</li>
                <li>{t('legal.cgv.pricing.item3')}</li>
                <li>{t('legal.cgv.pricing.item4')}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.withdrawal.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgv.withdrawal.p1_before')}{" "}
                <strong>{t('legal.cgv.withdrawal.days')}</strong>{" "}
                {t('legal.cgv.withdrawal.p1_after')}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgv.withdrawal.p2')}{" "}
                <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                  contact@skaldly.fr
                </a>
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                {t('legal.cgv.withdrawal.note')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.termination.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgv.termination.p1')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.liability.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgv.liability.p1')}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t('legal.cgv.law.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('legal.cgv.law.p1')}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('legal.cgv.law.p2')}{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline">
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
