import { ChallengeInteractive } from "@/types/challenges/challenge";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { Button } from "@/components/ui/Button";
import { PlayIcon } from "@/assets/icons";
import { getImageUrl, getAudioUrl } from "@/lib/utils/media";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface ExamInteractiveQuestionProps {
  question: ChallengeInteractive;
  selectedValue: number | null;
  onSelect: (index: number) => void;
  textValue: string;
  onTextChange: (val: string) => void;
}

export function ExamInteractiveQuestion({ question, selectedValue, onSelect, textValue, onTextChange }: ExamInteractiveQuestionProps) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (question.audioPaths && question.audioPaths.length > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(getAudioUrl(question.audioPaths[0]));
      audioRef.current = audio;
      audio.play().catch((err) => console.error("Audio playback error", err));
    }
  };

  return (
    <PlayerCard instruction={question.questionText}>
      {question.audioPaths && question.audioPaths.length > 0 && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={playAudio}
            variant="none"
            type="button"
            className="gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow hover:scale-105 transition-transform flex items-center justify-center font-semibold"
          >
            <PlayIcon className="w-5 h-5 text-white" />
            <span>Écouter la prononciation</span>
          </Button>
        </div>
      )}

      {question.imagePaths && question.imagePaths.length > 0 && (
        <div
          className={clsx(
            "grid gap-4 mx-auto mb-6",
            question.imagePaths.length === 1 ? "grid-cols-1 max-w-[200px]" : "grid-cols-2 max-w-md"
          )}
        >
          {question.imagePaths.map((path, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 shadow-sm"
            >
              <img
                src={getImageUrl(path)}
                alt="Visual aid"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {question.systemType === "MULTIPLE_CHOICE" ? (
        <div className="space-y-4 max-w-lg mx-auto w-full">
          {question.options?.map((option, idx) => {
            const isSelected = selectedValue === idx;

            return (
              <Button
                key={idx}
                onClick={() => onSelect(idx)}
                variant="none"
                type="button"
                className={clsx(
                  "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center group",
                  isSelected
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-200 shadow-sm"
                    : "border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                )}
              >
                <span className={clsx(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-center mr-4 text-sm font-medium flex-shrink-0 transition-all",
                  isSelected
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 group-hover:border-brand-200 dark:group-hover:border-brand-700 group-hover:text-brand-400 dark:group-hover:text-brand-300 group-hover:bg-brand-50/30 dark:group-hover:bg-brand-900/20"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </Button>
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto">
          <input
            type="text"
            value={textValue}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={t("topics.type_answer_here") || "Tapez votre réponse ici..."}
            className="w-full p-5 sm:p-6 text-lg sm:text-xl text-center border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-800 placeholder:text-gray-300 dark:text-gray-200"
          />
        </div>
      )}
    </PlayerCard>
  );
}
