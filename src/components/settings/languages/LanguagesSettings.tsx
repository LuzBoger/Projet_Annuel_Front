import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";
import { getUILanguages } from "@/constants/languages";
import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";

export function LanguagesSettings() {
    const {t} = useTranslation();
    const currentLanguage = i18n.language;

    const languages = getUILanguages(t);
    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }
    return (
        <>
        <MetaData title={t('settings.language.page_title')} robots="noindex, nofollow" />
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('settings.language.title')}</h2>
            <div className="flex gap-4">
                {languages.map(({ code, label, flag }) => (
                    <Button
                        key={code}
                        variant={currentLanguage === code ? "primary" : "ghost"}
                        size="lg"
                        onClick={() => handleChangeLanguage(code)}
                    >
                        <span className="mr-2 text-base">{flag}</span>
                        {label}
                    </Button>
                ))}
            </div>
        </div>
        </>
    );


}