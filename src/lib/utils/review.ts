import { Tab } from "@/types/components/reviewsTabs";
import { ReviewStatus, TopicReviewResponse } from "@/types/review/review";

export const getReviewCountByStatus = (reviews: TopicReviewResponse[], status: ReviewStatus) => {
    return reviews.filter(review => review.status === status).length;
}

export const getFiltersReviewByStatus = (reviews: TopicReviewResponse[], tab: Tab) => {
    if(tab === "ALL"){
        return reviews;
    }
    return reviews.filter(review => review.status === tab);
}