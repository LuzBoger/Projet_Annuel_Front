import { useAuth } from "@/hooks/useAuth";
import { reviewService } from "@/services/reviewService";
import { TopicReviewResponse, TopicReviewsResponse } from "@/types/review/review";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StarRating } from "@/components/ui/reviews/StarRating";
import { REVIEWS_PER_PAGE, RatingValue } from "@/constants/review";
import { Pagination } from "@/components/ui/Pagination";
import { EditReviewModal } from "@/components/reviews/EditReviewModal";
import { Button } from "@/components/ui/Button";

interface TopicReviewsProps {
    topicId: string;
}

export function TopicReviews({ topicId }: TopicReviewsProps) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [data, setData] = useState<TopicReviewsResponse | null>(null);
    const [pendingReview, setPendingReview] = useState<TopicReviewResponse | null>(null);
    const [reviewToEdit, setReviewToEdit] = useState<TopicReviewResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        reviewService.getTopicReviews(topicId)
            .then(setData)
            .finally(() => setIsLoading(false));
    }, [topicId]);

    useEffect(() => {
        if(!user) {
            return;
        }
        reviewService.getUserReview(topicId)
            .then((review) => {
                if (review?.status === "PENDING" || review?.status === "REJECTED") {
                    setPendingReview(review);
                }
            })
            .catch(() => {
            });
    }, [topicId, user]);
        useEffect(() => {
            const handler = () => {
                reviewService.getTopicReviews(topicId).then(setData);
                reviewService.getUserReview(topicId).then((review) => {
                setPendingReview(review?.status === "PENDING" || review?.status === "REJECTED" ? review : null);
            }).catch(() => {});
            };
            window.addEventListener("REVIEW_AUTO_REJECTED", handler);
            window.addEventListener("REVIEW_REJECTED", handler);
            window.addEventListener("REVIEW_APPROVED", handler);
            return () => {
                window.removeEventListener("REVIEW_AUTO_REJECTED", handler);
                window.removeEventListener("REVIEW_REJECTED", handler);
                window.removeEventListener("REVIEW_APPROVED", handler);
            };
        }, [topicId]);

    if(isLoading) {return null;}
    if(!pendingReview && (!data || data.reviews.length === 0)) {
        return <p>{t("reviews.no_reviews")}</p>;
    }

return (
        <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("reviews.section_title")}
                </h2>
                {data && data.totalReviews > 0 && (
                    <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(data.averageRating) as RatingValue} onRatingChange={() => {}} disabled />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {data.averageRating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-400">
                            ({data.totalReviews} {t("reviews.total")})
                        </span>
                    </div>
                )}
            </div>
            {pendingReview && (
                <div className={`mb-4 rounded-2xl p-5 border ${
                    pendingReview.status === "REJECTED"
                        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                        : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700"
                }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            pendingReview.status === "REJECTED"
                                ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                                : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                        }`}>
                            {pendingReview.status === "REJECTED" ? t("reviews.rejected_badge") : t("reviews.pending_badge")}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {t("reviews.your_review")}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {pendingReview.status === "REJECTED" ? t("reviews.rejected_message") : t("reviews.pending_message")}
                    </p>
                </div>
            )}

            {data && data.totalReviews > 0 && (
                <div className="flex flex-col gap-4">
                    {data.reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE).map((review) => (
                        <div key={review.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                                        {review.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {review.username}
                                        </p>
                                        <StarRating rating={review.rating} onRatingChange={() => {}} disabled />
                                    </div>
                                </div>
                                {user?.id === review.accountId && (
                                    <Button
                                        variant='none'
                                        onClick={() => setReviewToEdit(review)}
                                        className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                                        {t("reviews.edit")}
                                    </Button>
                                )}
                            </div>
                            {review.comment && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                    {review.comment}
                                </p>
                            )}
                        </div>
                    ))}
                    {data.totalReviews > REVIEWS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            hasMore={currentPage * REVIEWS_PER_PAGE < data.totalReviews}
                            onNext={() => setCurrentPage((p) => p + 1)}
                            onPrev={() => setCurrentPage((p) => p - 1)}
                        />
                    )}
                </div>
            )}

            {reviewToEdit && (
                <EditReviewModal
                    isOpen={!!reviewToEdit}
                    reviewId={reviewToEdit.id}
                    topicName={reviewToEdit.topicName ?? ""}
                    initialRating={reviewToEdit.rating}
                    initialComment={reviewToEdit.comment}
                    onClose={() => setReviewToEdit(null)}
                    onSuccess={() => {
                        reviewService.getTopicReviews(topicId).then(setData);
                        reviewService.getUserReview(topicId).then((review) => {
                            setPendingReview(review?.status === "PENDING" || review?.status === "REJECTED" ? review : null);
                        }).catch(() => {});
                        setReviewToEdit(null);
                    }}
                />
            )}
        </div>
    );
}