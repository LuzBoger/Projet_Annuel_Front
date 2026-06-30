import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Brain, ChevronRight } from "lucide-react";

interface DailyCheckBannerProps {
  totalAvailableNow: number;
}

export function DailyCheckBanner({ totalAvailableNow }: DailyCheckBannerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (totalAvailableNow === 0) {
    return null;
  }

  return (
    <div
      onClick={() => navigate("/training/daily-check")}
      className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-5 flex items-center justify-between shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 cursor-pointer overflow-hidden mb-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-950/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/40 border border-brand-100/50 dark:border-brand-500/10 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 text-2xl shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Brain className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-0.5">
            {t("mistake.daily_check.label")}
          </span>
          <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
            {t("mistake.banner.title")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 truncate">
            {t("mistake.banner.subtitle", { count: totalAvailableNow })}
          </p>
        </div>
      </div>

      <div className="relative z-10 shrink-0 flex items-center text-sm font-bold text-brand-600 dark:text-brand-400 transition-all duration-300">
        <span className="group-hover:mr-1 transition-all">
          {t("mistake.banner.cta")}
        </span>
        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  );
}