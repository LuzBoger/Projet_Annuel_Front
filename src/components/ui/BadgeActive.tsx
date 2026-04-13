import { useTranslation } from "react-i18next";

export default function BadgeActive() {
    const {t} = useTranslation();

    return (
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-50/60 dark:bg-brand-500/20 border border-brand-200 dark:border-brand-500/40 text-brand-600 dark:text-brand-400 text-[11px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-md">
      {t("common.active")}
    </span>
  );
}
