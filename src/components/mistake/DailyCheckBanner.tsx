
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";

interface DailyCheckBannerProps {
  totalAvailableNow: number;
}

export function DailyCheckBanner({ totalAvailableNow }: DailyCheckBannerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

    if(totalAvailableNow === 0) {
        return null;
    }

  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-brand-500/20 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
          <Brain />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {t("mistake.banner.title")}
          </p>
          <p className="text-white/80 text-xs mt-0.5">
            {t("mistake.banner.subtitle", { count: totalAvailableNow })}
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate("/training/daily-check")}
        className="shrink-0 bg-white text-brand-700 hover:bg-white/90 font-semibold"
      >
        {t("mistake.banner.cta")}
      </Button>
    </div>
  );
}