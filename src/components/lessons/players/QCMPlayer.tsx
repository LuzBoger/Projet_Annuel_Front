import { useState } from "react";
import { useTranslation } from "react-i18next";
import { QcmQuestionRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/assets/icons";
import { PlayerLayout } from "@/components/lessons/players/common/PlayerLayout";
import { PlayerHeader } from "@/components/lessons/players/common/PlayerHeader";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { PlayerFeedback } from "@/components/lessons/players/common/PlayerFeedback";
import { PlayerFooter } from "@/components/lessons/players/common/PlayerFooter";

interface QCMPlayerProps {
    questions: QcmQuestionRequest[];
    onFinish: (score: number) => void;
}

export function QCMPlayer({ questions, onFinish }: QCMPlayerProps) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isValidated, setIsValidated] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [results, setResults] = useState<('correct' | 'incorrect' | 'pending')[]>(
        new Array(questions.length).fill('pending')
    );

    if (!questions || questions.length === 0) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-2xl shadow-sm w-full">
                    {t('common.empty')}
                </div>
            </PlayerLayout>
        );
    }

    const currentQ = questions[currentIndex];
    const isCorrect = Number(selectedOption) === Number(currentQ.correctOptionIndex);

    const handleSelect = (index: number) => {
        if (!isValidated) setSelectedOption(index);
    };

    const handleValidate = () => {
        if (selectedOption === null) return;
        
        const isAnswerCorrect = Number(selectedOption) === Number(currentQ.correctOptionIndex);
        setIsValidated(true);
        
        const newResults = [...results];
        newResults[currentIndex] = isAnswerCorrect ? 'correct' : 'incorrect';
        setResults(newResults);

        if (isAnswerCorrect) {
            setCorrectCount(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setIsValidated(false);
            setSelectedOption(null);
            setCurrentIndex(prev => prev + 1);
        } else {
            const finalScore = Math.round((correctCount / questions.length) * 100);
            onFinish(finalScore);
        }
    };

    // Prepare statuses for the header
    return (
        <PlayerLayout maxWidth="max-w-2xl">
            <PlayerHeader 
                current={currentIndex + 1} 
                total={questions.length} 
                statuses={results as any}
            />

            <div className="w-full flex-1 py-2 sm:py-4">
                <div className="space-y-6">
                    <PlayerCard instruction={currentQ.question}>
                        <div className="space-y-4">
                            {currentQ.options.map((option, idx) => {
                                let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center group relative ";
                                
                                if (!isValidated) {
                                    buttonClass += selectedOption === idx 
                                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-800 dark:text-white"
                                        : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300";
                                } else {
                                    if (idx === Number(currentQ.correctOptionIndex)) {
                                        buttonClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-white";
                                    } else if (idx === selectedOption) {
                                        buttonClass += "border-red-400 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-white";
                                    } else {
                                        buttonClass += "border-gray-100 dark:border-gray-700 opacity-50 bg-white dark:bg-gray-800 text-gray-400";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        disabled={isValidated}
                                        className={buttonClass}
                                    >
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-center mr-4 text-sm font-medium flex-shrink-0 transition-colors ${
                                            (!isValidated && selectedOption === idx) ? "bg-brand-500 border-brand-500 text-white" :
                                            (isValidated && idx === Number(currentQ.correctOptionIndex)) ? "bg-emerald-500 border-emerald-500 text-white" :
                                            (isValidated && idx === selectedOption) ? "bg-red-400 border-red-400 text-white" :
                                            "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 group-hover:border-gray-300 group-hover:text-gray-500"
                                        }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="font-medium">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </PlayerCard>

                    {isValidated && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <PlayerFeedback 
                                isVisible={isValidated}
                                isCorrect={isCorrect}
                                title={isCorrect ? t('lessons.qcm.correct') : t('lessons.qcm.incorrect')}
                                description={
                                    <div className="space-y-2">
                                        {!isCorrect && (
                                            <p className="font-bold text-red-600 dark:text-red-400">
                                                {t('lessons.qcm.correct')}: {currentQ.options[Number(currentQ.correctOptionIndex)]}
                                            </p>
                                        )}
                                        {currentQ.explanation && (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {currentQ.explanation}
                                            </p>
                                        )}
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            <PlayerFooter>
                {!isValidated ? (
                    <Button 
                        onClick={handleValidate}
                        disabled={selectedOption === null}
                        fullWidth
                        size="lg"
                        className="py-6 rounded-2xl font-medium text-lg shadow-sm"
                    >
                        {t('lessons.qcm.validate')}
                    </Button>
                ) : (
                    <Button 
                        onClick={handleNext}
                        fullWidth
                        size="lg"
                        className="py-6 !bg-gray-900 dark:!bg-gray-700 hover:!bg-gray-800 dark:hover:!bg-gray-600 text-white rounded-2xl font-medium text-lg shadow-sm flex items-center justify-center gap-2"
                    >
                        <span>{currentIndex < questions.length - 1 ? t('lessons.qcm.next') : t('lessons.finish')}</span>
                        {currentIndex < questions.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                    </Button>
                )}
            </PlayerFooter>
        </PlayerLayout>
    );
}
