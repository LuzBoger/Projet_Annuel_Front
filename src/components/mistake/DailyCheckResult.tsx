import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Brain, Check, Cross } from "@/assets/icons";
import type { UserResultResponse } from "@/types/mistakes/userMistakes";

interface DailyCheckResultProps {
  result: UserResultResponse;
}

export function DailyCheckResult({ result }: DailyCheckResultProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const rate = result.totalAnswers > 0 ? Math.round((result.totalCorrectAnswers / result.totalAnswers) * 100) : 0;

  return (
    <div className="min-h-screen bg-brand-50/50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-brand-500/10 p-8 text-center animate-[fade-in-up_0.5s_ease-out]">
        <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner ring-8 ring-brand-50">
          <Brain />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-600 mb-2">
          {t("mistake.result.title")}
        </h2>

        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-brand-50 dark:bg-brand-900/30 rounded-2xl p-5 border border-brand-100/50">
            <p className="text-brand-800 text-[10px] font-semibold uppercase tracking-widest mb-1">
              {t("mistake.result.score")}
            </p>
            <p className="text-3xl font-bold text-brand-600">{rate}%</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5 border border-emerald-100/50">
            <p className="text-emerald-800 text-[10px] font-semibold uppercase tracking-widest mb-1">
              {t("mistake.result.resolved")}
            </p>
            <p className="text-3xl font-bold text-emerald-600">{result.totalMasteredLessons}</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          {t("mistake.result.remaining", { count: result.totalRemainingQuestions })}
        </p>

        <div className="space-y-2 mb-8 text-left">
          {result.answerResults.map((detail) => (
            <div
              key={detail.userMistakeId}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                detail.isAnswerCorrect ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
              }`}
            >
              <span>
                {detail.isAnswerCorrect ? <Check /> : <Cross />}{" "}
                {detail.isLessonMastered ? t("mistake.result.mastered") : detail.nextReviewIndication}
              </span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i < detail.nbCorrectResponses ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-600"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate("/dashboard")} className="w-full py-4 text-lg">
            {t("mistake.result.dashboard")}
          </Button>
          <Button variant="ghost" onClick={() => navigate("/training/list")} className="w-full">
            {t("mistake.result.list")}
          </Button>
        </div>
      </div>
    </div>
  );
}
