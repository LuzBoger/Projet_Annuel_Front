import { useState } from "react";
import { profileService } from "@/services/profileService";
export function useOnBoarding(onClose: () => void) {
    const [selectLanguageId, setSelectLanguageId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const confirm  = async () => {
        setIsLoading(true);
        await profileService.completeOnboarding({ languageId: selectLanguageId });
        setIsLoading(false);
        onClose();
    }
    const skip = async () => {
        await profileService.completeOnboarding({ languageId: null });
        onClose();
    }
    return {selectLanguageId,setSelectLanguageId,isLoading,confirm,skip};

}