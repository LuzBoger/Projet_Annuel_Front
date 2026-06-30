import { LessonType } from "@/types/lesson/lesson";
import { MistakeFilterValue } from "@/types/mistakes/userMistakes";

export const LESSON_TYPE: Record<string, string> = {
    FLASHCARD: "Flashcards",
    QCM: "Quiz",
    MATCHING_PAIR: "Paires",
    SORTING_EXERCISE: "Ordre",
    INTERACTIVE: "Interactif",
};

export const PENALTY_PER_ERROR = 10;
export const ERROR_DISPLAY_DURATION_MS = 800;
export const LESSON_TYPE_COLORS: Record<string, string> = {
    FLASHCARD: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/30",
    QCM: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800/30",
    MATCHING_PAIR: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-800/30",
    SORTING_EXERCISE: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/30",
    INTERACTIVE: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-800/30",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
    A1: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/30",
    A2: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30",
    B1: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/30",
    B2: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800/30",
    C1: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/30",
    C2: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800/30",
};

export const FILTERS: Array<{ value: MistakeFilterValue; label: string; labelKey: string }> = [
  { value: "ALL", label: "Tout", labelKey: "mistake.filters.ALL" },
  { value: LessonType.FLASHCARD, label: "Flashcard", labelKey: "mistake.filters.FLASHCARD" },
  { value: LessonType.QCM, label: "QCM", labelKey: "mistake.filters.QCM" },
  { value: LessonType.MATCHING_PAIR, label: "Association", labelKey: "mistake.filters.MATCHING_PAIR" },
  { value: LessonType.SORTING_EXERCISE, label: "Tri", labelKey: "mistake.filters.SORTING_EXERCISE" },
  { value: LessonType.INTERACTIVE, label: "Interactif", labelKey: "mistake.filters.INTERACTIVE" },
];

