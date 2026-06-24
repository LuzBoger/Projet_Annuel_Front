import { useState, useCallback } from "react";
import { aiService } from "@/services/aiService";
import { AIMemorizationHelpRequest, AIMemorizationHelpResponse } from "@/types/lesson/lesson";

export function useMemorizationHelp() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getMemorizationHelp = useCallback(async (
        helpRequestData: AIMemorizationHelpRequest
    ): Promise<AIMemorizationHelpResponse | null> => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await aiService.getMemorizationHelp(helpRequestData);
            return result;
        } catch (error: unknown) {
            console.error("Failed to fetch memorization help from AI:", error);
            
            const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
            const statusCode = axiosError.response?.status;
            
            if (statusCode === 403 || statusCode === 429) {
                setErrorMessage("QUOTA_EXCEEDED");
            } else {
                setErrorMessage(axiosError.response?.data?.message || "ERROR_GENERIC");
            }
            
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getMemorizationHelp,
        isLoading,
        errorMessage,
        setErrorMessage
    };
}
