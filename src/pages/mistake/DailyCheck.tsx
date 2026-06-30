import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MetaData } from "@/components/seo/MetaData";
import { useUserMistakes } from "@/hooks/useUserMistakes";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { DailyCheckResult } from "@/components/mistake/DailyCheckResult";
import { DailyCheckEmpty } from "@/components/mistake/DailyCheckEmpty";
import { DailyCheckSession } from "@/components/mistake/DailyCheckSession";
import type { UserAnswerRequest } from "@/types/mistakes/userMistakes";

export default function DailyCheck() {
  const { t } = useTranslation();
  const { playSuccess } = useSoundEffects();
  const { dailyQuestion, sessionResult, loading, fetchDailyQuestion, submitAnswers } = useUserMistakes();

  useEffect(() => {
    fetchDailyQuestion();
  }, [fetchDailyQuestion]);

  const handleSubmit = async (answers: UserAnswerRequest[]) => {
    const result = await submitAnswers({ userAnswers: answers });
    if (result?.totalCorrectAnswers === result?.totalAnswers){
      playSuccess();
    }
  };

  if (sessionResult){
    return <DailyCheckResult result={sessionResult} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600" />
      </div>
    );
  }

  if (!dailyQuestion?.hasQuestionToday){
    return <DailyCheckEmpty />;
  }

  return (
    <>
      <MetaData title={t("mistake.daily_check.title")} robots="noindex, nofollow" />
      <DailyCheckSession dailyQuestion={dailyQuestion} onSubmit={handleSubmit} />
    </>
  );
}
