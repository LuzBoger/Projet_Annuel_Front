import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Check } from "@/assets/icons";

export function DailyCheckEmpty() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-10 text-center">
        <div className="text-6xl mb-6"><Check /></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t("mistake.empty.title")}
        </h2>
        <p className="text-gray-500 mb-8">{t("mistake.empty.subtitle")}</p>
        <Button onClick={() => navigate("/dashboard")} className="w-full">
          {t("common.continue")}
        </Button>
      </div>
    </div>
  );
}
