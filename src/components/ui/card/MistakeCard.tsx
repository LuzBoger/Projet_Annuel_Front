import { UserMistakeRetryListResponse } from "@/types/mistakes/userMistakes";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import clsx from "clsx";
import { LESSON_TYPE, LESSON_TYPE_COLORS } from "@/constants/lesson";
import { Check, Cross } from "@/assets/icons";

interface MistakeCardProps {
    mistake: UserMistakeRetryListResponse;
    onClick: (mistake: UserMistakeRetryListResponse) => void;
}

export function MistakeCard({ mistake, onClick }: MistakeCardProps) {
  const { t } = useTranslation();

  return (
    <Button
      variant='none'
      onClick={() => onClick(mistake)}
      className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", LESSON_TYPE_COLORS[mistake.lessonType])}>{LESSON_TYPE[mistake.lessonType]}</span>
          <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full",
            mistake.learningType === "EXAM" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          )}>
            {mistake.learningType === "EXAM" ? t("source.exam") : t("source.lesson")}
          </span>
          {mistake.topicName && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{mistake.topicName}</span>
          )}
        </div>
        <span className="text-xs text-gray-400 shrink-0 group-hover:text-brand-500 transition-colors">
          {mistake.nextReviewIndication}
        </span>
      </div>

      <p className="font-semibold text-gray-900 dark:text-white text-lg mb-3 truncate">
        {mistake.answeredQuestion}
      </p>


      <div className="flex items-center gap-4 text-sm">
        {mistake.userAnswer && (
          <div className="flex items-center gap-1.5">
            <span className="text-red-400"><Cross /></span>
            <span className="text-red-600 dark:text-red-400 line-through">{mistake.userAnswer}</span>
          </div>
        )}
        {mistake.correctAnswer && (
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400"><Check /></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{mistake.correctAnswer}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={clsx("w-3 h-3 rounded-full transition-colors", i < mistake.nbCorrectResponses ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-600")}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          {t("queue.streak", { count: mistake.nbCorrectResponses })}
        </span>
      </div>
    </Button>
  );
}