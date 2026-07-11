import { LessonType } from "@/types/lesson/lesson";

export const CHALLENGE_TYPES = ['DUEL', 'PUBLIC'];

export const DUEL_LESSON_TYPES: LessonType[] = ['QCM', 'FLASHCARD', 'INTERACTIVE'];
export const PUBLIC_LESSON_TYPES: LessonType[] = ['QCM', 'FLASHCARD', 'MATCHING_PAIR', 'SORTING_EXERCISE'];
export const PAGE_SIZE = 5;
export const PARTICIPANTS_PAGE_SIZE = 8;

export const AI_CHALLENGE_MIN_ITEMS_DEFAULT = 3;
export const AI_CHALLENGE_MAX_ITEMS_DEFAULT = 10;
export const AI_CHALLENGE_MIN_ITEMS_EXTENDED = 5;
export const AI_CHALLENGE_MAX_ITEMS_EXTENDED = 20;
