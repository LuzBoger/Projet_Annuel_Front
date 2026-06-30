import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function MentionsLegales() {
  const { t } = useTranslation();

  return (
    <>
      <MetaData title={t("legal.mentionsLegales.title")} description={t("legal.mentionsLegales.description")} robots="noindex, nofollow"/>
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">← {t("common.home")}</Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("legal.mentionsLegales.title")}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{t("legal.mentionsLegales.lastUpdate")}</p>
          <div className="space-y-5">

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.mentionsLegales.editor.title")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("legal.mentionsLegales.editor.intro")}</p>
              <dl>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.companyName")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">Skaldly</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.siret")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">988 091 575 00387</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.legalForm")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">SASU (Société par Actions Simplifiée Unipersonnelle)</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.address")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">142 Rue de Rivoli, 75001 Paris</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.capital")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">10 000 €</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.email")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">
                    <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                      contact@skaldly.fr
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.phone")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">+33 6 10 15 18 89</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.editor.directors")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">Moussi Sid-Ahmed, Arthur Brouard, Sofianne Chadilir</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.mentionsLegales.host.title")}
              </h2>
              <dl>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.host.name")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">IONOS SE</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.host.address")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">7 Place de la Gare, 57200 Sarreguemines, France</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.host.site")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">
                    <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">
                      ionos.fr
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2">
                  <dt className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide sm:w-44 shrink-0">{t("legal.mentionsLegales.host.infrastructure")}</dt>
                  <dd className="text-sm text-gray-800 dark:text-gray-200">3 serveurs VPS</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.mentionsLegales.ip.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.mentionsLegales.ip.p1")}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">{t("legal.mentionsLegales.ip.p2")}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.mentionsLegales.liability.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.mentionsLegales.liability.p1")}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.mentionsLegales.law.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.mentionsLegales.law.p1")}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
