import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectedLanguagesButton } from "@/components/ui/dropdown/SelectedLanguagesButton";
import { DropDownMenu } from "@/components/ui/dropdown/DropDownMenu";
import { LanguageFlag } from "@/components/languages/LanguageFlag";

interface LocaleLanguageSwitcherProps {
  align?: "left" | "right";
  position?: "top" | "bottom";
}

export function LocaleLanguageSwitcher({ align = "left", position = "bottom" }: LocaleLanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language.slice(0, 2).toLowerCase();

  const languagesList = ["fr", "en", "es", "de", "it"];

  const currentLangCode = languagesList.includes(currentLanguage) ? currentLanguage : "fr";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items = languagesList.map((lang) => ({
    key: lang,
    isActive: currentLanguage === lang,
    onClick: () => {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
      // Synchronize both language and locale localStorage keys
      localStorage.setItem('locale', lang);
      document.cookie = `myAppLocaleCookie=${lang};path=/;max-age=31536000;SameSite=Lax`;
      setIsOpen(false);
    },
    label: (
      <LanguageFlag languageCode={lang} className="w-5 h-4 rounded-sm object-cover" />
    ),
  }));

  return (
    <div className="relative" ref={switcherRef}>
      <SelectedLanguagesButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <LanguageFlag languageCode={currentLangCode} className="w-5 h-4 rounded-sm object-cover mr-1.5" />
      </SelectedLanguagesButton>
      {isOpen && (
        <DropDownMenu
          items={items}
          align={align}
          position={position}
          className="w-max min-w-[3.5rem]"
          itemClassName="justify-center px-2.5"
        />
      )}
    </div>
  );
}
