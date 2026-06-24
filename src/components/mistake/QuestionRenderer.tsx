import { MistakeQuestionResponse } from "@/types/mistakes/userMistakes";
import { useTranslation } from "react-i18next";
import { ExamFlashcardQuestion } from "@/components/topics/ExamFlashcardQuestion";
import { ExamQcmQuestion } from "@/components/topics/ExamQcmQuestion";
import { Input } from "@/components/ui/Input";
import { ExamSortingQuestion } from "@/components/topics/ExamSortingQuestion";

interface QuestionRendererProps {
    question: MistakeQuestionResponse;
    flashCardAnswer: string;
    qcmAnswer: number | null;
    matchingAnswer: string;
    sortingAnswer: number[];
    sortingIndices: number[];
    onFlashcardChange: (value: string) => void;
    onQcmSelect: (value: number) => void;
    onMatchingChange: (value: string) => void;
    onSortingChange: (value: number[]) => void;
}


export function QuestionRenderer({question, flashCardAnswer, qcmAnswer, matchingAnswer, sortingAnswer, sortingIndices, onFlashcardChange, onQcmSelect, onMatchingChange, onSortingChange}: QuestionRendererProps) {
    const {t} = useTranslation();
    
    if (question.lessonType === 'FLASHCARD' && question.front) {
        return (
            <ExamFlashcardQuestion flashcard={{ id: question.questionId, front: question.front }} value={flashCardAnswer} onChange={onFlashcardChange} />
        );
    }

    if (question.lessonType === 'QCM' && question.question && question.options) {
        return (
            <ExamQcmQuestion question={{ id: question.questionId, question: question.question, options: question.options }} selectedValue={qcmAnswer} onSelect={onQcmSelect} />
        );
    }

    if (question.lessonType === 'MATCHING_PAIR' && question.item1) {
        return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center">
                <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-6">
                {t("matching.instruction")}
                </p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{question.item1}</div>
                <Input
                type="text"
                value={matchingAnswer}
                onChange={(e) => onMatchingChange(e.target.value)}
                placeholder={t("matching.placeholder")}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-lg text-center bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
            </div>
        );
    }

    if (question.lessonType === 'SORTING_EXERCISE' && question.items) {
        return (
        <ExamSortingQuestion exercise={{ id: question.questionId, items: question.items }} shuffledIndices={sortingIndices} userOrder={sortingAnswer} onChange={onSortingChange} />
        );
    }

    return null;
}
