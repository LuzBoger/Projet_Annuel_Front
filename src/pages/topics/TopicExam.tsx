import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { topicService } from "@/services/topicService";
import { ExamResultRequest, QcmQuestionExamResponse, FlashcardExamResponse, ExamResponse, CompleteExamResponse, SortingExerciseExamResponse, MatchingPairResponse } from "@/types/topic/topic";
import { ChevronLeft } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { ExamQcmQuestion } from "@/components/topics/ExamQcmQuestion";
import { ExamFlashcardQuestion } from "@/components/topics/ExamFlashcardQuestion";
import { ExamMatchingQuestion } from "@/components/topics/ExamMatchingQuestion";
import { ExamSortingQuestion } from "@/components/topics/ExamSortingQuestion";
import { UserPairAnswer, Tile } from "@/types/components/examMatching";
import { shuffleArray } from "@/lib/utils/topic";

type ExamItem =
    | { type: 'QCM', data: QcmQuestionExamResponse }
    | { type: 'FLASHCARD', data: FlashcardExamResponse }
    | { type: 'MATCHING', data: MatchingPairResponse[], shuffledTiles: Tile[] }
    | { type: 'SORTING', data: SortingExerciseExamResponse, shuffledIndices: number[] };



export default function TopicExam() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [exam, setExam] = useState<ExamResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [examResult, setExamResult] = useState<CompleteExamResponse | null>(null);

    const [mixedQuestions, setMixedQuestions] = useState<ExamItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [qcmAnswers, setQcmAnswers] = useState<Record<string, number>>({});
    const [flashcardAnswers, setFlashcardAnswers] = useState<Record<string, string>>({});
    const [sortingAnswers, setSortingAnswers] = useState<Record<string, number[]>>({});
    const [matchingAnswers, setMatchingAnswers] = useState<UserPairAnswer[]>([]);

    useEffect(() => {
        if (!topicId) return;

        const fetchExam = async () => {
            try {
                setLoading(true);
                const data = await topicService.getTopicExam(topicId);

                const qcms: ExamItem[] = (data.qcmQuestions || []).map((q) => ({ type: 'QCM', data: q }));
                const flashcards: ExamItem[] = (data.flashcards || []).map((f) => ({ type: 'FLASHCARD', data: f }));

                const sortings: ExamItem[] = (data.sortingExercises || []).map((s) => ({
                    type: 'SORTING',
                    data: s,
                    shuffledIndices: shuffleArray(s.items.map((_, i) => i))
                }));

                // Rassembler toutes les paires en une seule question 'MATCHING'
                let matchings: ExamItem[] = [];
                if (data.matchingPairs && data.matchingPairs.length > 0) {
                    const tiles: Tile[] = [];
                    data.matchingPairs.forEach((pair, index) => {
                        tiles.push({ id: `t1-${index}-${pair.id}`, text: pair.item1, originalPairId: pair.id });
                        tiles.push({ id: `t2-${index}-${pair.id}`, text: pair.item2, originalPairId: pair.id });
                    });

                    matchings = [{
                        type: 'MATCHING',
                        data: data.matchingPairs,
                        shuffledTiles: shuffleArray(tiles)
                    }];
                }

                const mixed = shuffleArray([...qcms, ...flashcards, ...sortings, ...matchings]);

                setMixedQuestions(mixed);
                setExam(data);
            } catch {
                setError(t('topics.exam_load_error'));
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [topicId, t]);

    const submitExam = async () => {
        if (!topicId) return;

        try {
            setSubmitting(true);

            const resultPayload: ExamResultRequest = {
                flashcardAnswers: Object.entries(flashcardAnswers).map(([id, userResponse]) => ({ id, userResponse })),
                qcmAnswers: Object.entries(qcmAnswers).map(([id, selectedOptionIndex]) => ({ id, selectedOptionIndex })),
                matchingPairAnswers: matchingAnswers.map(ans => ({ id: ans.id, item1: ans.item1, item2: ans.item2 })),
                sortingExerciseAnswers: Object.entries(sortingAnswers).map(([id, userOrder]) => ({ id, userOrder }))
            };

            const response = await topicService.submitTopicExam(topicId, resultPayload);
            setExamResult(response);
        } catch {
            setError(t('topics.exam_submit_error'));
        } finally {
            setSubmitting(false);
        }
    };

    if (examResult) {
        return (
            <div className="min-h-screen bg-indigo-50/50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 p-8 sm:p-10 text-center animate-[fade-in-up_0.5s_ease-out]">
                    <div className={`w-24 h-24 ${examResult.success ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' : 'bg-gradient-to-br from-gray-300 to-gray-500'} text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ${examResult.success ? 'ring-yellow-50' : 'ring-gray-50'}`}>
                        {examResult.success ? (
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ) : (
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>

                    <h2 className={`text-3xl sm:text-4xl font-medium tracking-tight mb-2 ${examResult.success ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-800' : 'text-gray-800'}`}>
                        {examResult.success ? t('topics.exam_passed') : t('topics.exam_failed')}
                    </h2>
                    <p className="text-gray-500 font-medium mb-8 bg-gray-50 py-2 px-4 rounded-xl inline-block border border-gray-100">
                        {exam?.topicName || t('common.topic')}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                            <p className="text-indigo-800 text-[10px] font-large uppercase tracking-widest mb-1">{t('lessons.xp_earned')}</p>
                            <p className="text-3xl font-medium text-indigo-600">+{examResult.xpEarned}</p>
                        </div>

                        <div className={`rounded-2xl p-5 border relative overflow-hidden ${examResult.success ? 'bg-emerald-50 border-emerald-100/50' : 'bg-red-50 border-red-100/50'}`}>
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                            <p className={`text-[10px] font-medium uppercase tracking-widest mb-1 ${examResult.success ? 'text-emerald-800' : 'text-red-800'}`}>{t('lessons.status')}</p>
                            <p className={`text-2xl font-medium ${examResult.success ? 'text-emerald-600' : 'text-red-500'}`}>{examResult.success ? t('lessons.success') : t('lessons.failed')}</p>
                        </div>
                    </div>

                    {examResult.totalAnswers !== undefined && examResult.totalAnswers > 0 && (
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center justify-center mb-8">
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">{t('topics.accuracy')}</p>
                            <div className="flex items-baseline space-x-2">
                                <span className={`text-4xl font-extrabold ${examResult.accuracy && examResult.accuracy >= 0.8 ? 'text-emerald-500' : examResult.accuracy && examResult.accuracy >= 0.5 ? 'text-amber-500' : 'text-red-500'}`}>
                                    {Math.round((examResult.accuracy || 0) * 100)}%
                                </span>
                                <span className="text-sm font-medium text-gray-400">
                                    ({examResult.correctAnswers} / {examResult.totalAnswers})
                                </span>
                            </div>
                        </div>
                    )}

                    {examResult.message && !examResult.success && (
                        <div className="bg-red-50 text-red-800 text-sm font-medium p-4 rounded-2xl mb-8 border border-red-100">
                            {examResult.message}
                        </div>
                    )}

                    {examResult.leveledUp && (
                        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold p-4 rounded-2xl mb-8 shadow-lg animate-bounce">
                            🎉 {t('lessons.level_up', { level: examResult.newLevel })}
                        </div>
                    )}

                    <Button
                        onClick={() => navigate(`/topics/${topicId}`)}
                        className="w-full py-4 text-lg"
                    >
                        {t('common.continue')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                size="sm"
                className="mb-8 font-bold flex items-center text-gray-500 hover:text-gray-900"
            >
                <ChevronLeft className="w-5 h-5 mr-1" />
                {t('common.back')}
            </Button>

            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600 tracking-tight">
                    {t('topics.exam_title')}
                </h1>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('topics.exam_desc')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-100 text-center">
                    <p className="text-red-800 font-medium">{error}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full">
                    {mixedQuestions.length === 0 ? (
                        <div className="p-12 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto w-full text-center">
                            <p className="text-gray-500 mb-8 font-medium">
                                {t('topics.no_questions')}
                            </p>
                            <Button size="lg" onClick={submitExam} disabled={submitting} isLoading={submitting}>
                                {t('topics.exam_submit')}
                            </Button>
                        </div>
                    ) : currentIndex >= mixedQuestions.length ? (
                        <div className="p-12 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto w-full text-center animate-[fade-in-up_0.5s_ease-out]">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {t('topics.exam_completed_title')}
                            </h2>
                            <p className="text-gray-500 mb-8">
                                {t('topics.exam_completed_desc')}
                            </p>
                            <Button size="lg" onClick={submitExam} disabled={submitting} isLoading={submitting} className="w-full text-lg py-4">
                                {t('topics.exam_submit')}
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
                            <div className="w-full mb-8">
                                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-indigo-500">
                                        {t('topics.exam_progress')}
                                    </span>
                                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                        {currentIndex + 1} / {mixedQuestions.length}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                                    <div
                                        className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${((currentIndex) / mixedQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {(() => {
                                const currentItem = mixedQuestions[currentIndex];

                                if (currentItem.type === 'QCM') {
                                    return (
                                        <ExamQcmQuestion
                                            question={currentItem.data}
                                            selectedValue={qcmAnswers[currentItem.data.id] ?? null}
                                            onSelect={(val) => setQcmAnswers(prev => ({ ...prev, [currentItem.data.id]: val }))}
                                        />
                                    );
                                }

                                if (currentItem.type === 'FLASHCARD') {
                                    return (
                                        <ExamFlashcardQuestion
                                            flashcard={currentItem.data}
                                            value={flashcardAnswers[currentItem.data.id] || ''}
                                            onChange={(val) => setFlashcardAnswers(prev => ({ ...prev, [currentItem.data.id]: val }))}
                                        />
                                    );
                                }

                                if (currentItem.type === 'SORTING') {
                                    return (
                                        <ExamSortingQuestion
                                            exercise={currentItem.data}
                                            shuffledIndices={currentItem.shuffledIndices}
                                            userOrder={sortingAnswers[currentItem.data.id] || []}
                                            onChange={(val) => setSortingAnswers(prev => ({ ...prev, [currentItem.data.id]: val }))}
                                        />
                                    );
                                }

                                if (currentItem.type === 'MATCHING') {
                                    return (
                                        <ExamMatchingQuestion
                                            shuffledTiles={currentItem.shuffledTiles}
                                            userPairs={matchingAnswers}
                                            onChange={(val) => setMatchingAnswers(val)}
                                        />
                                    );
                                }

                                return null;
                            })()}

                            <Button
                                className="w-full py-4 text-lg mt-4 shadow-sm"
                                onClick={() => setCurrentIndex(prev => prev + 1)}
                                disabled={(() => {
                                    const currentItem = mixedQuestions[currentIndex];
                                    if (currentItem.type === 'QCM') return qcmAnswers[currentItem.data.id] === undefined;
                                    if (currentItem.type === 'FLASHCARD') return !flashcardAnswers[currentItem.data.id]?.trim();
                                    if (currentItem.type === 'SORTING') return (!sortingAnswers[currentItem.data.id] || sortingAnswers[currentItem.data.id].length < currentItem.data.items.length);
                                    if (currentItem.type === 'MATCHING') return matchingAnswers.length < currentItem.shuffledTiles.length / 2;
                                    return false;
                                })()}
                            >
                                {currentIndex < mixedQuestions.length - 1 ? t('common.next') : t('common.validate')}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
