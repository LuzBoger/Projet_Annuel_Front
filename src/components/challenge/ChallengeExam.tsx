import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChallengeFlashcard, ChallengeMatchingPair, ChallengeQcmQuestion, ChallengeSortingExercise, ExamItem, ChallengeInteractive, SubmitChallengeRequest } from "@/types/challenges/challenge";
import { ExamFlashcardQuestion } from "@/components/topics/ExamFlashcardQuestion";
import { ExamMatchingQuestion } from "@/components/topics/ExamMatchingQuestion";
import { ExamQcmQuestion } from "@/components/topics/ExamQcmQuestion";
import { ExamSortingQuestion } from "@/components/topics/ExamSortingQuestion";
import { ExamInteractiveQuestion } from "@/components/challenge/ExamInteractiveQuestion";
import { Button } from "@/components/ui/Button";
import { UserPairAnswer, Tile } from "@/types/components/examMatching";
import { shuffleArray } from "@/lib/utils/topic";
import { LessonType } from "@/types/lesson/lesson";
interface ChallengeExamProps {
    lessonType: LessonType;
    qcms: ChallengeQcmQuestion[];
    flashcards: ChallengeFlashcard[];
    matchingPairs: ChallengeMatchingPair[];
    sortingExercises: ChallengeSortingExercise[];
    interactives?: ChallengeInteractive[];
    onFinish: (answers: Omit<SubmitChallengeRequest, 'timePassed'>) => void;
}


export function ChallengeExam({ lessonType, qcms, flashcards, matchingPairs, sortingExercises, interactives = [], onFinish }: ChallengeExamProps) {
    const { t } = useTranslation();

    const items = useMemo<ExamItem[]>(() => {
        let list: ExamItem[] = [];
        if (lessonType === 'QCM') {
            list = qcms.map(qcm => ({ type: 'QCM', data: qcm }));
        } else if (lessonType === 'FLASHCARD') {   
            list = flashcards.map(flashCard => ({ type: 'FLASHCARD', data: flashCard }));
        } else if (lessonType === 'SORTING_EXERCISE') {
            list = sortingExercises.map(sortingExercise => ({ type: 'SORTING', data: sortingExercise, shuffledIndices: shuffleArray(sortingExercise.items.map((_, i) => i)) }));
        } else if (lessonType === 'MATCHING_PAIR' && matchingPairs.length > 0) {
            const tiles: Tile[] = matchingPairs.flatMap((pair, index) => [
                { id: `t1-${index}-${pair.id}`, text: pair.item1, originalPairId: pair.id },
                { id: `t2-${index}-${pair.id}`, text: pair.item2, originalPairId: pair.id },
            ]);
            list = [{ type: 'MATCHING', data: matchingPairs, shuffledTiles: shuffleArray(tiles) }];
        } else if (lessonType === 'INTERACTIVE') {
            list = interactives.map(interactive => ({ type: 'INTERACTIVE', data: interactive }));
        }
        return shuffleArray(list);
    }, [lessonType, qcms, flashcards, matchingPairs, sortingExercises, interactives]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [qcmAnswers, setQcmAnswers] = useState<Record<string, number>>({});
    const [flashcardAnswers, setFlashcardAnswers] = useState<Record<string, string>>({});
    const [sortingAnswers, setSortingAnswers] = useState<Record<string, number[]>>({});
    const [matchingAnswers, setMatchingAnswers] = useState<UserPairAnswer[]>([]);

    const isNextDisabled = () => {
        const current = items[currentIndex];
        if (!current) {
            return false;
        }
        if (current.type === 'QCM'){
            return qcmAnswers[current.data.id] === undefined;
        } 
        if (current.type === 'FLASHCARD'){
            return !flashcardAnswers[current.data.id]?.trim();
        }
        if (current.type === 'SORTING'){
            return (sortingAnswers[current.data.id]?.length ?? 0) < current.data.items.length;
        }
        if (current.type === 'MATCHING') {
            return matchingAnswers.length < current.shuffledTiles.length / 2;
        }
        if (current.type === 'INTERACTIVE') {
            if (current.data.systemType === 'MULTIPLE_CHOICE') {
                return qcmAnswers[current.data.id] === undefined;
            } else {
                return !flashcardAnswers[current.data.id]?.trim();
            }
        }
        return false;
    };

    if (currentIndex >= items.length) {
        return (
            <div className="p-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('topics.exam_completed_title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('topics.exam_completed_desc')}</p>
                <Button 
                    size="lg" 
                    className="w-full py-4 text-lg" 
                    onClick={() => {
                        const payload: Omit<SubmitChallengeRequest, 'timePassed'> = {};
                        if (lessonType === 'QCM') {
                            payload.qcmAnswers = Object.entries(qcmAnswers).map(([id, idx]) => ({ id, selectedOptionIndex: idx }));
                        } else if (lessonType === 'FLASHCARD') {
                            payload.flashcardAnswers = Object.entries(flashcardAnswers).map(([id, text]) => ({ id, userResponse: text }));
                        } else if (lessonType === 'MATCHING_PAIR') {
                            payload.matchingPairAnswers = matchingAnswers.map(ans => ({ id: ans.id, item1: ans.item1, item2: ans.item2 }));
                        } else if (lessonType === 'SORTING_EXERCISE') {
                            payload.sortingExerciseAnswers = Object.entries(sortingAnswers).map(([id, order]) => ({ id, userOrder: order }));
                        } else if (lessonType === 'INTERACTIVE') {
                            payload.interactiveAnswers = interactives.map(item => {
                                const isQcm = item.systemType === 'MULTIPLE_CHOICE';
                                return {
                                    id: item.id,
                                    selectedOptionIndex: isQcm ? (qcmAnswers[item.id] ?? null) : null,
                                    userResponse: !isQcm ? (flashcardAnswers[item.id] ?? null) : null
                                };
                            });
                        }
                        onFinish(payload);
                    }}
                >
                    {t('topics.exam_submit')}
                </Button>
            </div>
        );
    }

    const current = items[currentIndex];

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                    <span className="uppercase tracking-widest text-brand-500">{t('topics.exam_progress')}</span>
                    <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                        {currentIndex + 1} / {items.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-brand-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentIndex / items.length) * 100}%` }} />
                </div>
            </div>

            {current.type === 'QCM' && (
                <ExamQcmQuestion
                    question={current.data}
                    selectedValue={qcmAnswers[current.data.id] ?? null}
                    onSelect={(val) => setQcmAnswers(prev => ({ ...prev, [current.data.id]: val }))}
                />
            )}
            {current.type === 'FLASHCARD' && (
                <ExamFlashcardQuestion
                    flashcard={current.data}
                    value={flashcardAnswers[current.data.id] ?? ''}
                    onChange={(val) => setFlashcardAnswers(prev => ({ ...prev, [current.data.id]: val }))}
                />
            )}
            {current.type === 'SORTING' && (
                <ExamSortingQuestion
                    exercise={current.data}
                    shuffledIndices={current.shuffledIndices}
                    userOrder={sortingAnswers[current.data.id] ?? []}
                    onChange={(val) => setSortingAnswers(prev => ({ ...prev, [current.data.id]: val }))}
                />
            )}
            {current.type === 'MATCHING' && (
                <ExamMatchingQuestion
                    shuffledTiles={current.shuffledTiles}
                    userPairs={matchingAnswers}
                    onChange={setMatchingAnswers}
                />
            )}
            {current.type === 'INTERACTIVE' && (
                <ExamInteractiveQuestion
                    question={current.data}
                    selectedValue={qcmAnswers[current.data.id] ?? null}
                    onSelect={(val) => setQcmAnswers(prev => ({ ...prev, [current.data.id]: val }))}
                    textValue={flashcardAnswers[current.data.id] ?? ''}
                    onTextChange={(val) => setFlashcardAnswers(prev => ({ ...prev, [current.data.id]: val }))}
                />
            )}

            <Button
                className="w-full py-4 text-lg shadow-sm"
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={isNextDisabled()}
            >
                {currentIndex < items.length - 1 ? t('common.next') : t('common.finish')}
            </Button>
        </div>
    );
}
