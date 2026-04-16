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
import { Check, Cross } from "@/assets/icons";

interface LessonSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Partial<LessonFormData>;
}

export function LessonSimulatorModal({ isOpen, onClose, data }: LessonSimulatorModalProps) {
  const { t } = useTranslation();
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-[10px] font-black uppercase tracking-wider">
            {t(`admin.lessons.form.types.${data.lessonType}`)}
          </span>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {data.title}
          </span>
        </div>
      }
      size="full"
    >
      <div className="flex flex-col items-center justify-start max-h-[85vh] overflow-y-auto py-2 custom-scrollbar">
        {isFinished ? (
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('admin.lessons.preview.simulation_complete')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {t('admin.lessons.preview.score_preview')} <span className="font-bold text-brand-600 dark:text-brand-400">{finalScore}%</span>
            </p>
            <div className="space-y-3">
              <Button onClick={resetSimulation} variant="primary" className="w-full">
                {t('admin.lessons.preview.retry_simulation')}
              </Button>
              <Button onClick={handleClose} variant="secondary" className="w-full">
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
