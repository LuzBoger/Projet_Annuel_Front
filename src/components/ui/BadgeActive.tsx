import { useTranslation } from "react-i18next";

export default function BadgeActive() {
    const {t} = useTranslation();

    return (
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow">
      {t("common.active")}
    </span>
  );
}
