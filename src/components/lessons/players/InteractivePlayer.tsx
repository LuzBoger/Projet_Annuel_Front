import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InteractiveQuestion, LessonMistake } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { ChevronRight, PlayIcon } from "@/assets/icons";
import { PlayerLayout } from "@/components/lessons/players/common/PlayerLayout";
import { PlayerHeader } from "@/components/lessons/players/common/PlayerHeader";
import { SegmentStatus } from "@/types/components/player";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { PlayerFooter } from "@/components/lessons/players/common/PlayerFooter";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { getImageUrl, getAudioUrl } from "@/lib/utils/media";
import clsx from "clsx";

interface InteractivePlayerProps {
  questions: InteractiveQuestion[];
  onFinish: (score: number, correctAnswers: number, totalAnswers: number, mistakes: LessonMistake[]) => void;
}

function levenshteinDistance(a: string, b: string): number {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) tmp.push([i]);
  for (j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

export function InteractivePlayer({ questions, onFinish }: InteractivePlayerProps) {
  const { t } = useTranslation();
  const { playCorrect, playIncorrect } = useSoundEffects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState<SegmentStatus[]>(
    new Array(questions.length).fill("pending" as SegmentStatus)
  );
  const mistakesRef = useRef<LessonMistake[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!questions || questions.length === 0) {
    return (
      <PlayerLayout>
        <div className="text-center p-8 text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-2xl shadow-sm w-full">
          {t("common.empty")}
        </div>
      </PlayerLayout>
    );
  }

  const currentQ = questions[currentIndex];

  const checkAnswer = (): boolean => {
    if (currentQ.systemType === "MULTIPLE_CHOICE") {
      return Number(selectedOption) === Number(currentQ.correctOptionIndex);
    } else {
      const cleanInput = textInput.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const cleanCorrect = (currentQ.correctWord || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return cleanInput === cleanCorrect || levenshteinDistance(cleanInput, cleanCorrect) <= 2;
    }
  };

  const isCorrect = checkAnswer();

  const handleSelectOption = (idx: number) => {
    if (!isValidated) {
      setSelectedOption(idx);
    }
  };

  const playAudio = () => {
    if (currentQ.audioPaths && currentQ.audioPaths.length > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(getAudioUrl(currentQ.audioPaths[0]));
      audioRef.current = audio;
      audio.play().catch((err) => console.error("Audio playback error", err));
    }
  };

  const handleValidate = () => {
    if (currentQ.systemType === "MULTIPLE_CHOICE" && selectedOption === null) return;
    if (currentQ.systemType === "OPEN_TEXT" && textInput.trim() === "") return;

    setIsValidated(true);
    const newResults = [...results];
    newResults[currentIndex] = isCorrect ? "correct" : "incorrect";
    setResults(newResults);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      playCorrect();
    } else {
      playIncorrect();
      if (currentQ.id && !mistakesRef.current.some((mistake) => mistake.id === currentQ.id)) {
        const userAnswer = currentQ.systemType === "MULTIPLE_CHOICE"
          ? (selectedOption !== null ? currentQ.options[selectedOption] : undefined)
          : textInput.trim();
        mistakesRef.current.push({ id: currentQ.id, userAnswer });
      }
    }
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (currentIndex < questions.length - 1) {
      setIsValidated(false);
      setSelectedOption(null);
      setTextInput("");
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finalScore = Math.round((correctCount / questions.length) * 100);
      onFinish(finalScore, correctCount, questions.length, mistakesRef.current);
    }
  };

  return (
    <PlayerLayout>
      <PlayerHeader current={currentIndex + 1} total={questions.length} statuses={results} />

      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-2xl mx-auto w-full">
          <PlayerCard>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Audio Section */}
            {currentQ.audioPaths && currentQ.audioPaths.length > 0 && (
              <div className="flex justify-center mb-6">
                <Button
                  onClick={playAudio}
                  variant="pill-brand"
                  className="gap-2 px-6 py-3 rounded-full shadow hover:scale-105 transition-transform"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>Écouter la prononciation</span>
                </Button>
              </div>
            )}

            {/* Images Grid */}
            {currentQ.imagePaths && currentQ.imagePaths.length > 0 && (
              <div
                className={clsx(
                  "grid gap-4 max-w-md mx-auto mb-8",
                  currentQ.imagePaths.length === 1 ? "grid-cols-1" : "grid-cols-2"
                )}
              >
                {currentQ.imagePaths.map((path, idx) => (
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

            {/* Interactive Layout Selection */}
            {currentQ.systemType === "MULTIPLE_CHOICE" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentQ.correctOptionIndex;

                  let optionStyle = "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/20 dark:hover:bg-brand-900/10";
                  if (isValidated) {
                    if (isCorrectOption) {
                      optionStyle = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                    } else if (isSelected) {
                      optionStyle = "bg-red-50 dark:bg-red-950/20 border-red-500 text-red-700 dark:text-red-400";
                    } else {
                      optionStyle = "bg-gray-50 dark:bg-gray-850/50 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-brand-50 dark:bg-brand-900/20 border-brand-500 text-brand-700 dark:text-brand-400 ring-2 ring-brand-500/20";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isValidated}
                      className={clsx(
                        "w-full px-5 py-4 text-center rounded-xl border text-sm font-semibold transition-all duration-200 shadow-sm flex items-center justify-center gap-2",
                        optionStyle
                      )}
                    >
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Tapez votre réponse ici..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isValidated}
                  className={clsx(
                    "w-full px-5 py-4 border rounded-xl text-center font-semibold text-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm",
                    isValidated
                      ? isCorrect
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-950/20 border-red-500 text-red-700 dark:text-red-400"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-brand-500"
                  )}
                />
              </div>
            )}
          </PlayerCard>
        </div>
      </div>

      <PlayerFooter
        isVisible={isValidated}
        isCorrect={isCorrect}
        feedback={
          <div className="space-y-0.5">
            <h4
              className={clsx(
                "font-bold text-lg",
                isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
              )}
            >
              {isCorrect ? "Correct !" : "Incorrect !"}
            </h4>
            {!isCorrect && (
              <p className="text-sm font-medium text-red-600 dark:text-red-300">
                La bonne réponse est :{" "}
                {currentQ.systemType === "MULTIPLE_CHOICE"
                  ? currentQ.options[Number(currentQ.correctOptionIndex)]
                  : currentQ.correctWord}
              </p>
            )}
          </div>
        }
      >
        {!isValidated ? (
          <Button
            onClick={handleValidate}
            disabled={
              currentQ.systemType === "MULTIPLE_CHOICE"
                ? selectedOption === null
                : textInput.trim() === ""
            }
            size="lg"
            className="px-12 rounded-xl font-bold shadow-md w-full sm:w-auto"
          >
            Valider
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            size="lg"
            className="px-12 !bg-gray-900 dark:!bg-gray-700 hover:!bg-gray-800 dark:hover:!bg-gray-600 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>{currentIndex < questions.length - 1 ? t("common.next") : "Terminer"}</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </PlayerFooter>
    </PlayerLayout>
  );
}
