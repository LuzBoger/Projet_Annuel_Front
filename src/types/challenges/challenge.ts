import { LessonType } from "@/types/lesson/lesson";
import { Tile } from "@/types/components/examMatching";

export type ChallengeType  = 'DUEL' | 'PUBLIC';
export type ChallengeStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'DECLINED' | 'CANCELLED';
export type ExamItem = 
    | { type: 'QCM'; data: ChallengeQcmQuestion } 
    | { type: 'FLASHCARD'; data: ChallengeFlashcard }
    | { type: 'MATCHING'; data: ChallengeMatchingPair[]; shuffledTiles: Tile[] } 
    | { type: 'SORTING'; data: ChallengeSortingExercise; shuffledIndices: number[] }
    | { type: 'INTERACTIVE'; data: ChallengeInteractive };

export interface ChallengeInteractive {
  id: string;
  questionText?: string;
  imagePaths?: string[];
  audioPaths?: string[];
  systemType: "MULTIPLE_CHOICE" | "OPEN_TEXT";
  options?: string[];
  correctOptionIndex?: number | null;
  correctWord?: string | null;
}
export type UnitTime = 'hours' | 'minutes' | 'seconds';

export type ChallengeTabType = 'all' | 'friends';

    export interface ChallengeUser {
    id: string;
    username: string;
    photoUrl: string | null;
}

export interface ChallengeQcmQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string | null;
}

export interface ChallengeFlashcard {
  id: string;
  front: string;
  back: string;
  frontLanguage: string | null;
  backLanguage: string | null;
  timeLimitSeconds: number;
}

export interface ChallengeMatchingPair {
  id: string;
  item1: string;
  item2: string;
}

export interface ChallengeSortingExercise {
  id: string;
  items: string[];
  correctOrder: number[];
}
export interface ChallengeParticipant {
    accountId: string;
    username: string;
    photoUrl: string | null;
    score: number | null;
    timePassed: number | null;
    xpGained: number;
    finalRank: number | null;
    completedAt: string | null;
    hasCompleted: boolean;
    hasStarted?: boolean;
}


export interface Challenge {
    id: string;
    title: string;
    challengeType: ChallengeType;
    lessonType: LessonType;
    challengeStatus: ChallengeStatus;
    languageId: string;
    sourceLanguageId: string | null;
    sourceLanguageCode: string | null;
    sourceLanguageName: string | null;
    challenger: ChallengeUser;
    challenged: ChallengeUser | null;
    qcm: ChallengeQcmQuestion[];
    flashcards: ChallengeFlashcard[];
    matchingPairs: ChallengeMatchingPair[];
    sortingExercises: ChallengeSortingExercise[];
    interactives: ChallengeInteractive[];
    participants: ChallengeParticipant[];
    expiresAt: string;
    createdAt: string;
}

export interface CreateChallengeRequest {
    title: string;
    challengeType: ChallengeType;
    lessonId?: string;
    lessonType?: LessonType;
    languageId?: string;
    sourceLanguageId?: string;
    challengedId?: string;
    questionCount?: number;
    qcm?: Omit<ChallengeQcmQuestion, 'id'>[];
    flashcards?: Omit<ChallengeFlashcard, 'id'>[];
    matchingPairs?: Omit<ChallengeMatchingPair, 'id'>[];
    sortingExercises?: Omit<ChallengeSortingExercise, 'id'>[];
    interactives?: ChallengeInteractive[];
}

export interface SubmitChallengeRequest {
    score: number;
    timePassed: number;
}

export interface ChallengeProgress {
  challengeId: string;
  accountId: string;
  username: string;
  id: string | null;
  front: string | null;
  back: string | null;
  frontLanguage: string | null;
  backLanguage: string | null;
  timeLimitSeconds: number | null;
  photoUrl: string | null;
  score: number | null;
  questionAnswered: number | null;
  totalQuestions: number | null;
  timePassed: number | null;
  finalRank: number | null;
  xpGained: number | null;
}

export interface ChallengeNotification {
  challengeId: string;
  username: string;
  photoUrl: string | null;
  lessonTitle: string;
  lessonType: LessonType;
  expiresAt: string;
}

export interface ChallengeTime {
  time: number;
  unit: UnitTime;
}