import { MistakeQuestionResponse } from "@/types/mistakes/userMistakes";

export function getShuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function isUserAnswered(question: MistakeQuestionResponse, flashcard: Record<string, string>, qcm: Record<string, number>, matching: Record<string, string>, sorting: Record<string, number[]>): boolean {
  if (question.lessonType === "FLASHCARD"){
    return !!flashcard[question.questionId]?.trim();
  }
  if (question.lessonType === "QCM"){
    return qcm[question.questionId] !== undefined;
  }
  if (question.lessonType === "MATCHING_PAIR"){
    return !!matching[question.questionId]?.trim();
  }
  if (question.lessonType === "SORTING_EXERCISE"){
    return (sorting[question.questionId]?.length ?? 0) === (question.items?.length ?? 0);
  }
  return false;
}