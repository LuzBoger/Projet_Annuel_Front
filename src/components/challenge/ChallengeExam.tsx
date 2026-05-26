import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChallengeFlashcard, ChallengeMatchingPair, ChallengeQcmQuestion, ChallengeSortingExercise, ExamItem } from "@/types/challenges/challenge";
import { ExamFlashcardQuestion } from "@/components/topics/ExamFlashcardQuestion";
import { ExamMatchingQuestion } from "@/components/topics/ExamMatchingQuestion";
import { ExamQcmQuestion } from "@/components/topics/ExamQcmQuestion";
import { ExamSortingQuestion } from "@/components/topics/ExamSortingQuestion";
import { Button } from "@/components/ui/Button";
import { UserPairAnswer, Tile } from "@/types/components/examMatching";
import { shuffleArray } from "@/lib/utils/topic";
import { LessonType } from "@/types/lesson/lesson";
import { calculateScore } from "@/lib/utils/challenge";

interface ChallengeExamProps {
    lessonType: LessonType;
    qcms: ChallengeQcmQuestion[];
    flashcards: ChallengeFlashcard[];
    matchingPairs: ChallengeMatchingPair[];
    sortingExercises: ChallengeSortingExercise[];
    onFinish: (score: number) => void;
}


export function ChallengeExam({ lessonType, qcms, flashcards, matchingPairs, sortingExercises, onFinish }: ChallengeExamProps) {
    const { t } = useTranslation();

    const items = useMemo<ExamItem[]>(() => {
        if (lessonType === 'QCM') {
            return qcms.map(qcm => ({ type: 'QCM', data: qcm }));
        }

        if (lessonType === 'FLASHCARD') {   
            return flashcards.map(flashCard => ({ type: 'FLASHCARD', data: flashCard }));
        }
        if (lessonType === 'SORTING_EXERCISE') {
            return sortingExercises.map(sortingExercise => ({ type: 'SORTING', data: sortingExercise, shuffledIndices: shuffleArray(sortingExercise.items.map((_, i) => i)) }));
        }
        if (lessonType === 'MATCHING_PAIR' && matchingPairs.length > 0) {
            const tiles: Tile[] = matchingPairs.flatMap((pair, index) => [
                { id: `t1-${index}-${pair.id}`, text: pair.item1, originalPairId: pair.id },
                { id: `t2-${index}-${pair.id}`, text: pair.item2, originalPairId: pair.id },
            ]);
            return [{ type: 'MATCHING', data: matchingPairs, shuffledTiles: shuffleArray(tiles) }];
        }
        return [];
    }, [lessonType, qcms, flashcards, matchingPairs, sortingExercises]);

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
        return false;
    };

    if (currentIndex >= items.length) {
        return (
            <div className="p-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('topics.exam_completed_title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('topics.exam_completed_desc')}</p>
                <Button size="lg" className="w-full py-4 text-lg" onClick={() => onFinish(calculateScore(items, qcmAnswers, flashcardAnswers, sortingAnswers, matchingAnswers))}>
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
