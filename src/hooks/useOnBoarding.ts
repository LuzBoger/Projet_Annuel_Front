import { useState } from "react";
import { profileService } from "@/services/profileService";
import { StepOnBoarding } from "@/types/language/language";
import { useTranslation } from "react-i18next";
export function useOnBoarding(onClose: () => void) {
    const [step, setStep] = useState<StepOnBoarding>("native");
    const [nativeLanguageId, setNativeLanguageId] = useState<string | null>(null);
    const [learningLanguageId, setLearningLanguageId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, setErr] = useState<string | null>(null);

    const {t} = useTranslation();
    const nextStep = () => {
        if (step === "native" && nativeLanguageId) {
            setStep("learning");
        }
    }

    const previousStep = () => {
        if (step === "learning") {
            setStep("native");
        }
    }
    
    const confirm  = async () => {
        if(!nativeLanguageId || !learningLanguageId){
            return;
        }

        try {
            setIsLoading(true);
            await profileService.completeOnboarding({ nativeLanguageId, learningLanguageId });
            onClose();
        }catch {
            setErr(t('error.onboarding'));
        }finally {
            setIsLoading(false);
        }
    }
    const skip = async () => {
        try {

                await profileService.completeOnboarding({ nativeLanguageId: null, learningLanguageId: null });
                onClose();
        }catch {
            setErr(t('error.onboarding'));
        }finally {
            setIsLoading(false);
        }
    }
    return {step, nativeLanguageId, setNativeLanguageId, learningLanguageId, setLearningLanguageId, isLoading, nextStep, previousStep, confirm, skip};

}
