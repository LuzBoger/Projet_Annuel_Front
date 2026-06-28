import { userMistakesService } from "@/services/userMistakesService";
import { UserDailyQuestion, UserResultResponse } from "@/types/mistakes/userMistakes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/ui/Modal";
import { Brain, Check, Cross } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { QuestionRenderer } from "@/components/mistake/QuestionRenderer";
import { useDailyCheckSession } from "@/hooks/useDailyCheckSession";

interface DailyCheckModalProps {
  isOpen: boolean;
  dailyQuestion: UserDailyQuestion;
  onClose: () => void;
  onComplete: () => void;
}
export function DailyCheckModal({isOpen, dailyQuestion, onClose, onComplete,}: DailyCheckModalProps) {
  const { t } = useTranslation();
  const questions = dailyQuestion.mistakeQuestions;
  const { currentIndex, isLast, allDone: allAnswered, answered, nextIndex, questionRendererProps, buildAnswers } = useDailyCheckSession(questions);
  const [result, setResult] = useState<UserResultResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await userMistakesService.submitAnswers({ userAnswers: buildAnswers() });
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (result) onComplete();
    else onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" showCloseButton={!result}>

      {result ? (
        <div className="py-4 text-center">
          <div className="text-5xl mb-4"><Brain /></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {t("mistake.result.title")}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {t("mistake.result.score")} :{" "}
            <strong className="text-brand-600">
              {Math.round((result.totalCorrectAnswers / result.totalAnswers) * 100)}%
            </strong>
            {" · "}
            {t("mistake.result.resolved")} : <strong className="text-emerald-600">{result.totalMasteredLessons}</strong>
          </p>

          <div className="space-y-2 mb-6 text-left">
            {result.answerResults.map((res) => (
              <div
                key={res.userMistakeId}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  res.isAnswerCorrect ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700" : "bg-red-50 dark:bg-red-900/20 text-red-700"
                }`}
              >
                <span>{res.isAnswerCorrect ? <Check /> : <Cross />} {res.isLessonMastered ? t("mistake.result.mastered") : res.nextReviewIndication}</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < res.nbCorrectResponses ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-600"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {result.totalRemainingQuestions > 0 && (
            <p className="text-xs text-gray-400 mb-4">
              {t("mistake.result.remaining", { count: result.totalRemainingQuestions })}
            </p>
          )}

          <Button className="w-full" onClick={handleClose}>
            {t("common.close")}
          </Button>
        </div>
      ) : (
        <div className="py-2">
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
              <Brain /> {t("mistake.result.daily_check.label")}
            </p>
            <p className="text-sm text-gray-400">
              {t("mistake.result.daily_check.subtitle", { total: questions.length })}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{t("mistake.result.daily_check.progress")}</span>
              <span>{Math.min(currentIndex + 1, questions.length)} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentIndex / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {allAnswered ? (
            <div className="text-center py-6">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("mistake.result.daily_check.all_done")}
              </p>
              <p className="text-gray-400 text-sm mb-6">{t("mistake.result.daily_check.submit_desc")}</p>
              <Button className="w-full" onClick={handleSubmit} isLoading={submitting} disabled={submitting}>
                {t("mistake.result.daily_check.submit")}
              </Button>
            </div>
          ) : (
            <>
              {questionRendererProps && <QuestionRenderer {...questionRendererProps} />}
              <Button
                className="w-full mt-4"
                onClick={nextIndex}
                disabled={!answered}
              >
                {isLast ? t("common.finish") : t("common.next")}
              </Button>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}