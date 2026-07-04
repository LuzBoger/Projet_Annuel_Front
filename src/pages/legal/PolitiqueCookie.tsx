import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { TableColumn } from "@/types/components/tableColumn";
import { COOKIE_ROWS } from "@/constants/legal";
import { CookieRow } from "@/types/legal/legal";
import { COOKIE_CONSENT_KEY } from "@/constants/global";


export default function PolitiqueCookies() {
  const { t } = useTranslation();

  const cookieColumns: TableColumn[] = [
    { key: "name", label: t("legal.cookies.used.col_name") },
    { key: "purpose", label: t("legal.cookies.used.col_purpose") },
    { key: "duration", label: t("legal.cookies.used.col_duration") },
  ];


  return (
    <>
      <MetaData
        title={t("legal.cookies.title")}
        description={t("legal.cookies.description")}
        robots="noindex, nofollow"
      />
      <div className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6 inline-block">
            ← {t("common.home")}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("legal.cookies.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
            {t("legal.cookies.lastUpdate")}
          </p>

          <div className="space-y-5">

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.cookies.what.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("legal.cookies.what.p1")}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.cookies.used.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t("legal.cookies.used.intro")}</p>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t("legal.cookies.categories.essential.title")}
                </h3>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                  {t("legal.cookies.used.always_active")}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("legal.cookies.categories.essential.description")}</p>

              <Table<CookieRow>
                data={COOKIE_ROWS(t)}
                columns={cookieColumns}
                renderRow={(item) => (
                  <>
                    <td className="px-6 py-3 text-xs font-mono text-gray-700 dark:text-gray-300">{item.name}</td>
                    <td className="px-6 py-3 text-xs text-gray-700 dark:text-gray-300">{item.purpose}</td>
                    <td className="px-6 py-3 text-xs text-gray-700 dark:text-gray-300">{item.duration}</td>
                  </>
                )}
                keyExtractor={(item) => item.name}
                showControls={false}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.cookies.manage.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t("legal.cookies.manage.p1")}</p>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem(COOKIE_CONSENT_KEY);
                  window.location.reload();
                }}
              >
                {t("legal.cookies.manage.reset_btn")}
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-brand-500 inline-block shrink-0" />
                {t("legal.cookies.more.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("legal.cookies.more.p1")}{" "}
                <a
                  href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 underline"
                >
                  {t("legal.cookies.more.cnil_link")}
                </a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
