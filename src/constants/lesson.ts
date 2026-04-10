export const LESSON_TYPE: Record<string, string> = {
    FLASHCARD: "Flashcards",
    QCM: "Quiz",
    MATCHING_PAIR: "Paires",
    SORTING_EXERCISE: "Ordre",
};

export const PENALTY_PER_ERROR = 10;
export const ERROR_DISPLAY_DURATION_MS = 800;
export const LESSON_TYPE_COLORS: Record<string, string> = {
    FLASHCARD: "bg-purple-100 text-purple-700",
    QCM: "bg-orange-100 text-orange-700",
    MATCHING_PAIR: "bg-blue-100 text-blue-700",
    SORTING_EXERCISE: "bg-teal-100 text-teal-700",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
    A1: "bg-green-100 text-green-700 border-green-200",
    A2: "bg-emerald-100 text-emerald-700 border-emerald-200",
    B1: "bg-blue-100 text-blue-700 border-blue-200",
    B2: "bg-orange-100 text-orange-700 border-orange-200",
    C1: "bg-red-100 text-red-700 border-red-200",
    C2: "bg-purple-100 text-purple-700 border-purple-200",
};