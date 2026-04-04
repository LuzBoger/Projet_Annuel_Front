import { useOnBoarding } from "@/hooks/useOnBoarding";
import { languageService } from "@/services/languageService";
import { LanguageResponse } from "@/types/language/language";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { LanguageOptionCard } from "../ui/card/LanguageOptionCard";

interface OnBBoardingModalProps {
    readonly onClose: () => void;
}

export function OnBoardingModal({ onClose }: OnBBoardingModalProps) {
    const {t} = useTranslation();
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const { selectLanguageId: selectedLanguageId, setSelectLanguageId: setSelectedLanguageId, confirm, skip, isLoading } = useOnBoarding(onClose);

    useEffect(() => {
        languageService.getAllActiveLanguages().then(setLanguages);
    }, [t])
  
    return (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F4]/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={skip}
            variant="ghost"
            size="sm"
            className="text-[#8B8279] hover:text-[#1A1A1A] border-none"
          >
            {t('common.skip')}
          </Button>
        </div>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">
          {t('onBoarding.selectLanguage')}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {languages.map((lang) => (
            <LanguageOptionCard
              key={lang.id}
              id={lang.id}
              code={lang.code}
              name={lang.name}
              isSelected={selectedLanguageId === lang.id}
              onSelect={() => setSelectedLanguageId(lang.id)}
            />
          ))}
        </div>

        <Button
          onClick={confirm}
          disabled={!selectedLanguageId || isLoading}
          isLoading={isLoading}
          fullWidth
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl py-3 disabled:opacity-40"
        >
          {t('common.continue')}
        </Button>
      </div>
    </div>
  );
}