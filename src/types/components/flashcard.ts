import { FlashcardRequest } from "@/types/lesson/lesson";

export interface QueuedCard {
    originalIndex: number;
    card: FlashcardRequest;
}
