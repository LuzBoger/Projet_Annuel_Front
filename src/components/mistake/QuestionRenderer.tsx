import { MistakeQuestionResponse } from "@/types/mistakes/userMistakes";
import { useTranslation } from "react-i18next";
import { ExamFlashcardQuestion } from "@/components/topics/ExamFlashcardQuestion";
import { ExamQcmQuestion } from "@/components/topics/ExamQcmQuestion";
import { Input } from "@/components/ui/Input";
import { ExamSortingQuestion } from "@/components/topics/ExamSortingQuestion";
import { getImageUrl, getAudioUrl } from "@/lib/utils/media";
import { PlayIcon } from "@/assets/icons";
import { clsx } from "clsx";

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

    if (question.lessonType === "INTERACTIVE") {
        return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-4">
                    {question.systemType === "MULTIPLE_CHOICE" ? "Question à choix multiples" : "Traduction / Saisie libre"}
                </p>
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {question.questionText}
                </div>

                {question.audioPaths && question.audioPaths.length > 0 && (
                    <div className="flex justify-center mb-6">
                        <button
                            type="button"
                            onClick={() => {
                                const audio = new Audio(getAudioUrl(question.audioPaths![0]));
                                audio.play().catch(e => console.error("Audio playback error:", e));
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-500/10 rounded-full shadow-sm"
                        >
                            <PlayIcon className="w-4 h-4" />
                            <span>Prononciation</span>
                        </button>
                    </div>
                )}

                {question.imagePaths && question.imagePaths.length > 0 && (
                    <div className={clsx("grid gap-2 max-w-xs mx-auto mb-6", question.imagePaths.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                        {question.imagePaths.map((path, idx) => (
                            <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-150 dark:border-gray-800 bg-gray-50/50">
                                <img src={getImageUrl(path)} alt="Visual aid" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                {question.systemType === "MULTIPLE_CHOICE" && question.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                        {question.options.map((option, idx) => {
                            const isSelected = qcmAnswer === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => onQcmSelect(idx)}
                                    className={clsx(
                                        "w-full px-4 py-3 text-center rounded-xl border text-sm font-semibold transition-all shadow-sm",
                                        isSelected
                                            ? "bg-brand-50 dark:bg-brand-900/20 border-brand-500 text-brand-700 dark:text-brand-400 ring-2 ring-brand-500/20"
                                            : "bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-brand-500"
                                    )}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <Input
                        type="text"
                        value={flashCardAnswer}
                        onChange={(e) => onFlashcardChange(e.target.value)}
                        placeholder="Tapez votre réponse ici..."
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-lg text-center bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                    />
                )}
            </div>
        );
    }

    return null;
}
