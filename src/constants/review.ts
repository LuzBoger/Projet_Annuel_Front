import { ReviewStatus } from "@/types/review/review";

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export const RATING_VALUES: RatingValue[] = [1, 2, 3, 4, 5];

export const RATING_LABELS: (t: (key: string) => string) => Record<RatingValue, string> = (t) => ({
    0: '',
    1: t("reviews.rating_1"),
    2: t("reviews.rating_2"),
    3: t("reviews.rating_3"),
    4: t("reviews.rating_4"),
    5: t("reviews.rating_5"),
});

export const REVIEWS_PER_PAGE = 5;

export const STYLES_REVIEW: Record<ReviewStatus, string> = {
    PUBLISHED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
};