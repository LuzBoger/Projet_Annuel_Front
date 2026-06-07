import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table } from "@/components/ui/Table";
import { TableColumn } from "@/types/components/tableColumn";
import { PurposeRow } from "@/types/legal/legal";
import { PURPOSE_ROWS } from "@/constants/legal";


export default function PolitiqueConfidentialite() {
  const { t } = useTranslation();

  const purposeColumns: TableColumn[] = [
    { key: "purpose", label: t("legal.privacy.purposes.col_purpose") },
    { key: "legalBasis", label: t("legal.privacy.purposes.col_basis") },
  ];
  
  return (
    <>
      <MetaData
        title={t("legal.privacy.title")}
        description={t("legal.privacy.description")}
        robots="noindex, nofollow"
      />
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">
            ← {t("common.home")}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("legal.privacy.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
            {t("legal.privacy.lastUpdate")}
          </p>

          <div className="space-y-5">

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.controller.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("legal.privacy.controller.p1")}{" "}
                <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                  contact@skaldly.fr
                </a>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.data.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.privacy.data.intro")}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>{t("legal.privacy.data.identity")} :</strong> {t("legal.privacy.data.identity_val")}</li>
                <li><strong>{t("legal.privacy.data.profile")} :</strong> {t("legal.privacy.data.profile_val")}</li>
                <li><strong>{t("legal.privacy.data.social")} :</strong> {t("legal.privacy.data.social_val")}</li>
                <li><strong>{t("legal.privacy.data.learning")} :</strong> {t("legal.privacy.data.learning_val")}</li>
                <li><strong>{t("legal.privacy.data.payment")} :</strong> {t("legal.privacy.data.payment_val")}</li>
                <li><strong>{t("legal.privacy.data.contact")} :</strong> {t("legal.privacy.data.contact_val")}</li>
                <li><strong>{t("legal.privacy.data.technical")} :</strong> {t("legal.privacy.data.technical_val")}</li>
                <li><strong>{t("legal.privacy.data.security")} :</strong> {t("legal.privacy.data.security_val")}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.purposes.title")}
              </h2>
              <Table<PurposeRow>
                data={PURPOSE_ROWS(t)}
                columns={purposeColumns}
                renderRow={(item) => (
                  <>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">{item.purpose}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">{item.legalBasis}</td>
                  </>
                )}
                keyExtractor={(item) => item.purpose}
                showControls={false}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.retention.title")}
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>{t("legal.privacy.retention.active")} :</strong> {t("legal.privacy.retention.active_val")}</li>
                <li><strong>{t("legal.privacy.retention.deleted")} :</strong> {t("legal.privacy.retention.deleted_val")}</li>
                <li><strong>{t("legal.privacy.retention.billing")} :</strong> {t("legal.privacy.retention.billing_val")}</li>
                <li><strong>{t("legal.privacy.retention.contact")} :</strong> {t("legal.privacy.retention.contact_val")}</li>
                <li><strong>{t("legal.privacy.retention.tokens")} :</strong> {t("legal.privacy.retention.tokens_val")}</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.recipients.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.privacy.recipients.intro")}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>Stripe</strong> — {t("legal.privacy.recipients.stripe")}</li>
                <li><strong>IONOS SE</strong> — {t("legal.privacy.recipients.ionos")}</li>
                <li><strong>Google Gmail (Google LLC)</strong> — {t("legal.privacy.recipients.google")}</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.privacy.recipients.closing")}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.privacy.rights.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.privacy.rights.intro")}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li><strong>{t("legal.privacy.rights.access")}</strong> {t("legal.privacy.rights.access_val")}</li>
                <li><strong>{t("legal.privacy.rights.rectification")}</strong> {t("legal.privacy.rights.rectification_val")}</li>
                <li><strong>{t("legal.privacy.rights.erasure")}</strong> {t("legal.privacy.rights.erasure_val")}</li>
                <li><strong>{t("legal.privacy.rights.portability")}</strong> {t("legal.privacy.rights.portability_val")}</li>
                <li><strong>{t("legal.privacy.rights.opposition")}</strong> {t("legal.privacy.rights.opposition_val")}</li>
                <li><strong>{t("legal.privacy.rights.limitation")}</strong> {t("legal.privacy.rights.limitation_val")}</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("legal.privacy.rights.exercise")}{" "}
                {t("legal.privacy.rights.email_or")}{" "}
                <a href="mailto:contact@skaldly.fr" className="text-brand-600 dark:text-brand-400 hover:underline">
                  contact@skaldly.fr
                </a>{" "}
                {t("legal.privacy.rights.delay")}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("legal.privacy.rights.cnil")}{" "}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline">
                  CNIL
                </a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
