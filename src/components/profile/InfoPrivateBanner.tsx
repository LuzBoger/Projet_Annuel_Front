import { LockIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function InfoPrivateBanner() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
    <div className="w-full bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-700 px-5 py-3 flex items-center gap-3.5">

      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 flex items-center justify-center">
        <LockIcon />
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-green-900 dark:text-green-200 mb-0.5">{t("profile.info.title")}</p>
        <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
          {t("profile.info.description")}
        </p>
      </div>

      <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
        {t("common.update")}
      </Button>

    </div>
  );
}