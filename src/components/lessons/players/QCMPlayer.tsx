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

    if (!questions || questions.length === 0) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm w-full">
                    {t('common.empty')}
                </div>
            </PlayerLayout>
        );
    }

    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctOptionIndex;

    const handleSelect = (index: number) => {
        if (!isValidated) setSelectedOption(index);
    };

    const handleValidate = () => {
        if (selectedOption === null) return;
        setIsValidated(true);
        if (selectedOption === currentQ.correctOptionIndex) {
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

    return (
        <PlayerLayout>
            <PlayerHeader current={currentIndex + 1} total={questions.length} />

            <PlayerCard instruction={currentQ.question}>
                <div className="space-y-4">
                    {currentQ.options.map((option, idx) => {
                        let buttonClass = "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center group ";
                        
                        if (!isValidated) {
                            buttonClass += selectedOption === idx 
                                ? "border-indigo-500 bg-indigo-50 text-indigo-800" 
                                : "border-gray-100 hover:border-gray-200 bg-white text-gray-700";
                        } else {
                            if (idx === currentQ.correctOptionIndex) {
                                buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-800"; 
                            } else if (idx === selectedOption) {
                                buttonClass += "border-red-400 bg-red-50 text-red-800"; 
                            } else {
                                buttonClass += "border-gray-100 bg-gray-50 text-gray-400 opacity-60"; 
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
                                    (!isValidated && selectedOption === idx) ? "bg-indigo-500 border-indigo-500 text-white" :
                                    (isValidated && idx === currentQ.correctOptionIndex) ? "bg-emerald-500 border-emerald-500 text-white" :
                                    (isValidated && idx === selectedOption) ? "bg-red-400 border-red-400 text-white" :
                                    "bg-white border-gray-200 text-gray-400 group-hover:border-gray-300 group-hover:text-gray-500"
                                }`}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="flex-1">{option}</span>
                            </button>
                        );
                    })}
                </div>
            </PlayerCard>

            <PlayerFeedback 
                isVisible={isValidated}
                isCorrect={isCorrect}
                title={isCorrect ? t('lessons.qcm.correct') : t('lessons.qcm.incorrect')}
                description={currentQ.explanation}
            />

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
                        className="py-6 !bg-gray-900 hover:!bg-gray-800 text-white rounded-2xl font-medium text-lg shadow-sm flex items-center justify-center gap-2"
                    >
                        <span>{currentIndex < questions.length - 1 ? t('lessons.qcm.next') : t('lessons.finish')}</span>
                        {currentIndex < questions.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                    </Button>
                )}
            </PlayerFooter>
        </PlayerLayout>
    );
}
