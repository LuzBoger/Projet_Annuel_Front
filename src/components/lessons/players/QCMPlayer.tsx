import { useState } from "react";
import { useTranslation } from "react-i18next";
import { QcmQuestionRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { Check, Cross, ChevronRight } from "@/assets/icons";

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
            <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm">
                {t('common.empty')}
            </div>
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
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto pb-8">
            <div className="w-full mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-indigo-500 font-bold">
                        {t('lessons.progress')}
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        {currentIndex + 1} / {questions.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                        className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 transition-all">
                <h3 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-8 text-center leading-tight">
                    {currentQ.question}
                </h3>
                
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
            </div>

            {isValidated && (
                <div className={`w-full p-5 rounded-2xl mb-6 border-2 flex items-start gap-4 animate-[fade-in-up_0.3s_ease-out] ${isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'}`}>
                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>
                        {isCorrect ? <Check className="w-5 h-5" /> : <Cross className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">
                            {isCorrect ? t('lessons.qcm.correct') : t('lessons.qcm.incorrect')}
                        </h4>
                        {currentQ.explanation && (
                            <p className="opacity-90 font-medium text-sm leading-relaxed mt-1">{currentQ.explanation}</p>
                        )}
                    </div>
                </div>
            )}

            <div className="w-full">
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
                        {currentIndex < questions.length - 1 && <ChevronRight className="w-5 h-5" />}
                    </Button>
                )}
            </div>
        </div>
    );
}
