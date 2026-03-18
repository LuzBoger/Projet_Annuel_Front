import { LockIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InfoAccountPrivate() {
  const {t} = useTranslation();
  
    return (
    <div className="flex flex-col items-center gap-2 px-5 py-6 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <LockIcon />
      </div>
      <p className="text-sm font-medium text-gray-900">{t("info.title")}</p>
      <p className="text-xs text-gray-400 leading-relaxed">
        {t("info.description")}
      </p>
    </div>
  );
}