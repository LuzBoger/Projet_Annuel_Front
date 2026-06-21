import { UserMistakeRetryListResponse } from "@/types/mistakes/userMistakes";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Check, Cross } from "@/assets/icons";

interface MistakeDetailModalProps {
    mistake: UserMistakeRetryListResponse;
    onClose: () => void;
}


export function MistakeDetailModal({ mistake, onClose }: MistakeDetailModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[fade-in-up_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            {mistake.topicName && (
              <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
                {mistake.topicName}
              </p>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("mistake.detail.title")}
            </h3>
          </div>
          <Button
            variant="none"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
          >
            <Cross />
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 mb-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            {t("mistake.detail.question")}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mistake.answeredQuestion}
          </p>
          {mistake.options && mistake.options.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {mistake.options.map((option, i) => (
                <span key={i} className="text-sm px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                  {option}
                </span>
              ))}
            </div>
          )}
        </div>

        {mistake.userAnswer && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-4 mb-3 flex items-center gap-3">
            <span className="text-2xl"><Cross /></span>
            <div>
              <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-0.5">
                {t("mistake.detail.your_answer")}
              </p>
              <p className="text-red-700 dark:text-red-400 font-medium line-through">
                {mistake.userAnswer}
              </p>
            </div>
          </div>
        )}

        {mistake.correctAnswer && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl"><Check /></span>
            <div>
              <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider mb-0.5">
                {t("mistake.detail.correct_answer")}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                {mistake.correctAnswer}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>
            {t("mistake.detail.next_review")}: <strong>{mistake.nextReviewIndication}</strong>
          </span>
          <span>
            {t("mistake.detail.streak")}: <strong>{mistake.nbCorrectResponses}/4</strong>
          </span>
        </div>

        <Button onClick={onClose} className="w-full">
          {t("common.close")}
        </Button>
      </div>
    </div>
  );
}