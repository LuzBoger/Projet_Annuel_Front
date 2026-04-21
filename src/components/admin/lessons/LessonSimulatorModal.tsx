import { useTranslation } from "react-i18next";
import { LessonType } from "@/types/lesson/lesson";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { Modal } from "@/components/ui/Modal";
import { FlashcardPlayer } from "@/components/lessons/players/FlashcardPlayer";
import { QCMPlayer } from "@/components/lessons/players/QCMPlayer";
import { MatchingPlayer } from "@/components/lessons/players/MatchingPlayer";
import { SortingPlayer } from "@/components/lessons/players/SortingPlayer";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, IconFlashcard } from "@/assets/icons";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useEffect } from "react";

interface LessonSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Partial<LessonFormData>;
}

export function LessonSimulatorModal({ isOpen, onClose, data }: LessonSimulatorModalProps) {
  const { t } = useTranslation();
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const { playSuccess } = useSoundEffects();

  useEffect(() => {
    if (isFinished && finalScore >= 80) { // On considère 80% comme un succès pour le simulateur
      playSuccess();
    }
  }, [isFinished, finalScore, playSuccess]);

  const resetSimulation = () => {
    setIsFinished(false);
    setFinalScore(0);
  };

  const handleClose = () => {
    resetSimulation();
    onClose();
  };

  const renderSimulator = () => {
    switch (data.lessonType) {
      case LessonType.FLASHCARD:
        return (
          <FlashcardPlayer
            flashcards={data.flashcards || []}
            onFinish={(score) => {
              setFinalScore(score);
              setIsFinished(true);
            }}
          />
        );
      case LessonType.QCM:
        return (
          <QCMPlayer
            questions={data.questions || []}
            onFinish={(score) => {
              setFinalScore(score);
              setIsFinished(true);
            }}
          />
        );
      case LessonType.MATCHING_PAIR:
        return (
          <MatchingPlayer
            pairs={data.matchingPairs || []}
            onFinish={(score) => {
              setFinalScore(score);
              setIsFinished(true);
            }}
          />
        );
      case LessonType.SORTING_EXERCISE:
        return (
          <SortingPlayer
            exercises={data.sortingItems ? [{
              items: data.sortingItems.map(item => item.value || ''),
              correctOrder: data.sortingItems.map((_, i) => i)
            }] : []}
            onFinish={(score) => {
              setFinalScore(score);
              setIsFinished(true);
            }}
          />
        );
      default:
        return (
          <div className="text-white text-center">
            {t('admin.lessons.preview.unsupported_type')}
          </div>
        );
    }
  };

  const getLessonIcon = () => {
    if (data.lessonType === LessonType.FLASHCARD) {
      return <IconFlashcard className="w-3.5 h-3.5" />;
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-3">
          <BadgeTag color="blue" className="text-[10px] font-black uppercase tracking-wider gap-2">
            {getLessonIcon()}
            {t(`admin.lessons.form.types.${data.lessonType}`)}
          </BadgeTag>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {data.title}
          </span>
        </div>
      }
      size="full"
    >
      <div className="flex flex-col items-center justify-start max-h-[85vh] overflow-y-auto py-2 custom-scrollbar">
        {isFinished ? (
          <div className="flex flex-col items-center justify-center text-center py-12 px-6 animate-in fade-in zoom-in duration-500 max-w-lg mx-auto">
            <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 shadow-inner border border-emerald-100 dark:border-emerald-500/20 backdrop-blur-sm">
              <Check className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
              {t('admin.lessons.preview.simulation_complete')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
              {t('admin.lessons.preview.score_preview')} <span className="font-black text-brand-600 dark:text-brand-400">{finalScore}%</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button onClick={resetSimulation} variant="pill-brand" className="px-8 py-3 flex-1 flex items-center justify-center">
                {t('admin.lessons.preview.retry_simulation')}
              </Button>
              <Button onClick={handleClose} variant="pill-gray" className="px-8 py-3 flex-1 flex items-center justify-center">
                {t('common.close')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto flex flex-col px-4">
            {renderSimulator()}
          </div>
        )}
      </div>
    </Modal>
  );
}
