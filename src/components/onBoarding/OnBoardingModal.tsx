import { useOnBoarding } from "@/hooks/useOnBoarding";
import { languageService } from "@/services/languageService";
import { LanguageResponse } from "@/types/language/language";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { LanguageOptionCard } from "@/components/ui/card/LanguageOptionCard";

interface OnBoardingModalProps {
  readonly onClose: () => void;
}

export function OnBoardingModal({ onClose }: OnBoardingModalProps) {
  const { t } = useTranslation();
  const [languages, setLanguages] = useState<LanguageResponse[]>([]);

  const {
    step,
    nativeLanguageId,
    setNativeLanguageId,
    learningLanguageId,
    setLearningLanguageId,
    nextStep,
    previousStep,
    confirm,
    skip,
    isLoading,
  } = useOnBoarding(onClose);

  useEffect(() => {
    languageService.getAllActiveLanguages().then(setLanguages);
  }, [t]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F4]/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-6">
          {step === "learning" ? (
            <Button onClick={previousStep} variant="ghost" size="sm">← {t("common.back")}</Button>
          ) : (
            <div />
          )}

          <Button onClick={skip} variant="ghost" size="sm" className="text-[#8B8279] dark:text-gray-400 hover:text-[#1A1A1A] border-none">
            {t("common.skip")}
          </Button>
        </div>

        <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-6">
          {step === "native" ? t("onBoarding.selectNativeLanguage") : t("onBoarding.selectLearningLanguage")}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {languages.map((lang) => {
            const isSelected =
              step === "native" ? nativeLanguageId === lang.id : learningLanguageId === lang.id;

            return (
              <LanguageOptionCard
                key={lang.id}
                id={lang.id}
                code={lang.code}
                name={lang.name}
                isSelected={isSelected}
                isDisabled={step === "learning" && lang.id === nativeLanguageId}
                onSelect={() => {
                  if (step === "native") {
                    setNativeLanguageId(lang.id);
                  } else {
                    setLearningLanguageId(lang.id);
                  }
                }}
              />
            );
          })}
        </div>

        <Button
          onClick={step === "native" ? nextStep : confirm}
          disabled={
            step === "native" ? !nativeLanguageId : !learningLanguageId || isLoading
          }
          isLoading={isLoading}
          fullWidth
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-3 disabled:opacity-40"
        >
          {step === "native" ? t("common.next") : t("common.continue")}
        </Button>

        <div className="flex justify-center mt-4 gap-2">
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              step === "native" 
                ? "bg-brand-600 dark:bg-brand-400" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              step === "learning" 
                ? "bg-brand-600 dark:bg-brand-400" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        </div>

      </div>
    </div>
  );
}
