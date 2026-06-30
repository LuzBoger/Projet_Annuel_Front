import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Check } from "@/assets/icons";

export function DailyCheckEmpty() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 p-10 text-center shadow-xl flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
          <div className="relative p-5 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 rounded-full ring-8 ring-emerald-500/5 dark:ring-emerald-500/10 flex items-center justify-center">
            <Check className="w-12 h-12 stroke-[2.5]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t("mistake.empty.title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
          {t("mistake.empty.subtitle")}
        </p>
        <Button onClick={() => navigate("/dashboard")} className="w-full">
          {t("common.continue")}
        </Button>
      </div>
    </div>
  );
}
