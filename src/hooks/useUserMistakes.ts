import { useToast } from "@/hooks/useToast";
import { userMistakesService } from "@/services/userMistakesService";
import { UserAnswerResultRequest, UserDailyQuestion, UserMistakeListResponse, UserMistakeRetryListResponse, UserResultResponse } from "@/types/mistakes/userMistakes";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export function useUserMistakes() {
  const { addToast } = useToast();
  const { t } = useTranslation();

  const [dailyQuestion, setDailyQuestion] = useState<UserDailyQuestion | null>(null);
  const [sessionResult, setSessionResult] = useState<UserResultResponse | null>(null);
  const [mistakeList, setMistakeList] = useState<UserMistakeListResponse | null>(null);
  const [selectedMistake, setSelectedMistake] = useState<UserMistakeRetryListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDailyQuestion = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userMistakesService.getDailyQuestion();
      setDailyQuestion(data);
      return data;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError.response?.data?.message || t("mistake.error.fetch");
      setError(errorMessage);
      addToast({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [addToast, t]);

  const submitAnswers = useCallback(async (data: UserAnswerResultRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await userMistakesService.submitAnswers(data);
      setSessionResult(result);
      return result;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError.response?.data?.message || t("mistake.error.submit");
      setError(errorMessage);
      addToast({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [addToast, t]);

  const fetchPendingMistakes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userMistakesService.getPendingMistakes();
      setMistakeList(data);
      return data;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError.response?.data?.message || t("mistake.error.fetchQueue");
      setError(errorMessage);
      addToast({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [addToast, t]);

  const fetchMistakeDetail = useCallback(async (userMistakeId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userMistakesService.getMistakeDetails(userMistakeId);
      setSelectedMistake(data);
      return data;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError.response?.data?.message || t("mistake.error.fetchDetail");
      setError(errorMessage);
      addToast({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [addToast, t]);

  return {
    dailyQuestion,
    sessionResult,
    mistakeList,
    selectedMistake,
    loading,
    error,
    fetchDailyQuestion,
    submitAnswers,
    fetchPendingMistakes,
    fetchMistakeDetail,
    setSelectedMistake,
  };
}