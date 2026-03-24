import { EVENT_ACTIVE_LANGUAGE_CHANGED } from "@/constants/event";
import { useToast } from "@/hooks/useToast";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { profileService } from "@/services/profileService";
import { LanguageResponse } from "@/types/language/language";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageFlag } from "./LanguageFlag";
import { SelectedLanguagesButton } from "../ui/dropdown/SelectedLanguagesButton";
import { DropDownMenu } from "../ui/dropdown/DropDownMenu";

interface LanguageSwitcherButtonProps {
    learningLanguage: UserLanguageResponse[];
    activeLanguage: LanguageResponse | null | undefined;
}

export function LanguageSwitcherButton({ learningLanguage, activeLanguage }: LanguageSwitcherButtonProps) {
    const {t} = useTranslation();
    const {addToast} = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageResponse | null | undefined>(activeLanguage);
    const languageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentLanguage(activeLanguage);
    }, [activeLanguage]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    const handleLanguageSelect = async (lang: UserLanguageResponse) => {
        setIsOpen(false);

        try {
            const selectNewLanguage = await profileService.addActiveLanguage(lang.languageId);
            setCurrentLanguage(selectNewLanguage.activeLanguage ?? null);
            globalEvents.emit(EVENT_ACTIVE_LANGUAGE_CHANGED, selectNewLanguage.activeLanguage);
        } catch {
                addToast({ type: 'error', message: t('error.language.change')});
        }
    }

    const items = learningLanguage.map(lang => ({
        key: lang.languageId,
        isActive: currentLanguage?.id === lang.languageId,
        onClick: () => handleLanguageSelect(lang),
        label: (
            <>
                <LanguageFlag languageCode={lang.languageCode} className="w-5 h-4 rounded-sm object-cover" />
                <span>{lang.languageName}</span>
            </>
        ),
    }));
            
    if(learningLanguage.length === 0) {
        return null;
    }

    return (
        <div className="relative" ref={languageRef}>
            <SelectedLanguagesButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {currentLanguage ? (
                    <>
                        <LanguageFlag languageCode={currentLanguage.code} className="w-5 h-4 rounded-sm object-cover" />
                        <span>{currentLanguage.name}</span>
                    </>
                ) : (
                    <span className="text-gray-400">{t("common.selectLanguage")}</span>
                )}
            </SelectedLanguagesButton>
            {isOpen && <DropDownMenu items={items} />}
        </div>
    )





}