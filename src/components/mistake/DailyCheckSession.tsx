import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { QuestionRenderer } from "@/components/mistake/QuestionRenderer";
import { useDailyCheckSession } from "@/hooks/useDailyCheckSession";
import { Brain } from "@/assets/icons";
import type { UserAnswerRequest, UserDailyQuestion } from "@/types/mistakes/userMistakes";

interface DailyCheckSessionProps {
  dailyQuestion: UserDailyQuestion;
  onSubmit: (answers: UserAnswerRequest[]) => Promise<void>;
}

export function DailyCheckSession({ dailyQuestion, onSubmit }: DailyCheckSessionProps) {
  const { t } = useTranslation();
  const { currentIndex, isLast, allDone, answered, goNext, questionRendererProps, buildAnswers } = useDailyCheckSession(dailyQuestion.mistakeQuestions);
  const [submitting, setSubmitting] = useState(false);
  const questions = dailyQuestion.mistakeQuestions;

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit(buildAnswers());
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-2">
          <Brain /> {t("mistake.daily_check.label")}
        </p>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-600">
          {t("mistake.daily_check.title")}
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          {t("mistake.daily_check.subtitle", { total: dailyQuestion.totalQuestions })}
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span className="uppercase tracking-widest text-brand-500">{t("mistake.daily_check.progress")}</span>
          <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
            {Math.min(currentIndex + 1, questions.length)} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <div
            className="bg-brand-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {allDone ? (
          <div className="w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("mistake.daily_check.all_done")}
            </h2>
            <p className="text-gray-500 mb-8">{t("mistake.daily_check.submit_desc")}</p>
            <Button size="lg" className="w-full py-4 text-lg" onClick={handleSubmit} isLoading={submitting} disabled={submitting}>
              {t("mistake.daily_check.submit")}
            </Button>
          </div>
        ) : questionRendererProps ? (
          <>
            <QuestionRenderer {...questionRendererProps} />
            <Button
              variant="none"
              className="w-full py-4 text-lg mt-4 shadow-sm"
              onClick={goNext}
              disabled={!answered}
            >
              {isLast ? t("common.validate") : t("common.next")}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
