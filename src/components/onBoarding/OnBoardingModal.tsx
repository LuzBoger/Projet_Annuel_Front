import { useOnBoarding } from "@/hooks/useOnBoarding";
import { languageService } from "@/services/languageService";
import { LanguageResponse } from "@/types/language/language";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { LanguageOptionCard } from "@/components/ui/card/LanguageOptionCard";
import { Modal } from "@/components/ui/Modal";

interface OnBoardingModalProps {
  readonly onClose: () => void;
}

export function OnBoardingModal({ onClose }: OnBoardingModalProps) {
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState<LanguageResponse[]>([]);

  const { step, nativeLanguageId, setNativeLanguageId, learningLanguageId, setLearningLanguageId, nextStep, previousStep, confirm, isLoading} = useOnBoarding(onClose);

  const setToTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToTop.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    languageService.getAllActiveLanguages().then(setLanguages);
  }, [t]);

  const handleConfirm = async () => {
    const nativeLangObj = languages.find((lang) => lang.id === nativeLanguageId);
    if (nativeLangObj) {
      i18n.changeLanguage(nativeLangObj.code);
      localStorage.setItem("language", nativeLangObj.code);
      // Synchronize both language and locale localStorage keys
      localStorage.setItem("locale", nativeLangObj.code);
    }
    await confirm();
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      showCloseButton={false}
      title={step === "native" ? t("onBoarding.selectNativeLanguage") : t("onBoarding.selectLearningLanguage")}
      size="md"
    >
      <div ref={setToTop} />
      <div className="flex items-center justify-between mb-8 -mt-2">
        {step === "learning" ? (
          <Button onClick={previousStep} variant="ghost" size="sm" className="rounded-lg">
            ← {t("common.back")}
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
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

      <div className="space-y-6">
        <Button
          onClick={step === "native" ? nextStep : handleConfirm}
          disabled={
            step === "native" ? !nativeLanguageId : !learningLanguageId || isLoading
          }
          isLoading={isLoading}
          fullWidth
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-2xl py-4 font-bold shadow-lg shadow-brand-500/20 transition-all active:scale-[0.98] disabled:opacity-40"
        >
          {step === "native" ? t("common.next") : t("common.continue")}
        </Button>

        <div className="flex justify-center gap-2.5">
          <div
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              step === "native" 
                ? "bg-brand-600 dark:bg-brand-400 w-12" 
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              step === "learning" 
                ? "bg-brand-600 dark:bg-brand-400 w-12" 
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
        </div>
      </div>
    </Modal>
  );
}
