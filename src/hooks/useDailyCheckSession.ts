import { useState, useMemo } from "react";
import { getShuffleIndices, isUserAnswered } from "@/lib/utils/mistake";
import type { MistakeQuestionResponse, UserAnswerRequest } from "@/types/mistakes/userMistakes";

export function useDailyCheckSession(questions: MistakeQuestionResponse[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardAnswers, setFlashcardAnswers] = useState<Record<string, string>>({});
  const [qcmAnswers, setQcmAnswers] = useState<Record<string, number>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [sortingAnswers, setSortingAnswers] = useState<Record<string, number[]>>({});

  const shuffledIndices = useMemo(() =>
    Object.fromEntries(
      questions.filter((question) => question.lessonType === "SORTING_EXERCISE" && question.items).map((question) => [question.questionId, getShuffleIndices(question.items!.length)])
    ),
  [questions]);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const allDone = currentIndex >= questions.length;
  const answered = currentQuestion ? isUserAnswered(currentQuestion, flashcardAnswers, qcmAnswers, matchingAnswers, sortingAnswers) : false;

  const buildAnswers = (): UserAnswerRequest[] =>
    questions.map((question) => {
      if (question.lessonType === "FLASHCARD"){
        return { userMistakeId: question.userMistakeId, translateAnswer: flashcardAnswers[question.questionId] || "" };
      } 
      if (question.lessonType === "QCM"){
        return { userMistakeId: question.userMistakeId, selectedResponseIndex: qcmAnswers[question.questionId] };
      }
      if (question.lessonType === "MATCHING_PAIR"){
        return { userMistakeId: question.userMistakeId, item2: matchingAnswers[question.questionId] || "" };
      }
      return { userMistakeId: question.userMistakeId, userOrderedResponseIndexes: sortingAnswers[question.questionId] || [] };
    });

  const nextIndex = () => setCurrentIndex((p) => p + 1);

  const questionRendererProps = currentQuestion ? {
    question: currentQuestion,
    flashCardAnswer: flashcardAnswers[currentQuestion.questionId] || "",
    qcmAnswer: qcmAnswers[currentQuestion.questionId] ?? null,
    matchingAnswer: matchingAnswers[currentQuestion.questionId] || "",
    sortingAnswer: sortingAnswers[currentQuestion.questionId] || [],
    sortingIndices: shuffledIndices[currentQuestion.questionId] || [],
    onFlashcardChange: (value: string) => setFlashcardAnswers((p) => ({ ...p, [currentQuestion.questionId]: value })),
    onQcmSelect: (value: number) => setQcmAnswers((p) => ({ ...p, [currentQuestion.questionId]: value })),
    onMatchingChange: (value: string) => setMatchingAnswers((p) => ({ ...p, [currentQuestion.questionId]: value })),
    onSortingChange: (value: number[]) => setSortingAnswers((p) => ({ ...p, [currentQuestion.questionId]: value })),
  } : null;

  return {
    currentIndex,
    currentQuestion,
    isLast,
    allDone,
    answered,
    shuffledIndices,
    buildAnswers,
    nextIndex,
    questionRendererProps,
  };
}
