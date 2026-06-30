import { RatingValue } from "@/constants/review";

export const  ReviewStatus = {
    PENDING: 'PENDING',
    PUBLISHED: 'PUBLISHED',
    REJECTED: 'REJECTED',
} as const;

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export interface TopicReviewRequest {
    rating: RatingValue;
    comment?: string;
}

export interface TopicReviewResponse {
    id: string;
    accountId: string;
    username: string;
    rating: RatingValue;
    comment?: string;
    createdAt: string;
    topicName?: string;
    topicId?: string;
    status: ReviewStatus;
    photoUrl?: string;
}

export interface TopicReviewsResponse {
    reviews: TopicReviewResponse[];
    averageRating: number;
    totalReviews: number;
}
