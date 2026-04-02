import { useTranslation } from "react-i18next";
import { FlashcardExamResponse } from "@/types/topic/topic";
import { useEffect, useRef } from "react";

interface ExamFlashcardQuestionProps {
    flashcard: FlashcardExamResponse;
    value: string;
    onChange: (val: string) => void;
}

export function ExamFlashcardQuestion({ flashcard, value, onChange }: ExamFlashcardQuestionProps) {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [flashcard.id]);

    return (
        <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 flex flex-col items-center">
            <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase">
                    {t('topics.translate_or_answer', 'Traduisez ou répondez')}
                </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center leading-tight">
                {flashcard.front}
            </h3>
            
            <div className="w-full max-w-lg mx-auto">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t('topics.type_answer_here', 'Tapez votre réponse ici...')}
                    className="w-full p-5 sm:p-6 text-lg sm:text-xl text-center border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 hover:bg-white"
                />
            </div>
        </div>
    );
}
