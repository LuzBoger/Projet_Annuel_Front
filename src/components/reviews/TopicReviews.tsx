import { useAuth } from "@/hooks/useAuth";
import { reviewService } from "@/services/reviewService";
import { TopicReviewResponse, TopicReviewsResponse } from "@/types/review/review";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StarDisplay } from "@/components/ui/reviews/StarDisplay";
import { REVIEWS_PER_PAGE, RatingValue, RATING_LABELS, INITIAL_RATING_BREAKDOWN, RATING_VALUES_DESC } from "@/constants/review";
import { Pagination } from "@/components/ui/Pagination";
import { EditReviewModal } from "@/components/reviews/EditReviewModal";
import { Button } from "@/components/ui/Button";
import { Edit, Trash } from "@/assets/icons";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/hooks/useToast";
import { formDateTime } from "@/lib/utils/date";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileImageUrl } from "@/lib/utils/image";

interface TopicReviewsProps {
    topicId: string;
}

export function TopicReviews({ topicId }: TopicReviewsProps) {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const { addToast } = useToast();
    
    const [data, setData] = useState<TopicReviewsResponse | null>(null);
    const [pendingReview, setPendingReview] = useState<TopicReviewResponse | null>(null);
    const [reviewToEdit, setReviewToEdit] = useState<TopicReviewResponse | null>(null);
    const [reviewToDelete, setReviewToDelete] = useState<TopicReviewResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleting, setIsDeleting] = useState(false);

    const locale = i18n.language;
    const labels = RATING_LABELS(t);

    const getRatingBreakdown = () => {
        const counts = { ...INITIAL_RATING_BREAKDOWN };
        if (!data) {
            return counts;
        }
        data.reviews.forEach((review) => {
            if (review.rating >= 1 && review.rating <= 5) {
                counts[review.rating as keyof typeof counts]++;
            }
        });
        return counts;
    };

    const ratingBreakdown = getRatingBreakdown();


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

    const handleDeleteConfirm = async () => {
        if (!reviewToDelete) {
            return;
        }

        try {
            setIsDeleting(true);
            await reviewService.deleteReview(reviewToDelete.id);
            addToast({ type: "success", message: t("reviews.delete_success") });

            const updatedReviews = await reviewService.getTopicReviews(topicId);
            setData(updatedReviews);

            const userReview = await reviewService.getUserReview(topicId).catch(() => null);
            setPendingReview(userReview?.status === "PENDING" || userReview?.status === "REJECTED" ? userReview : null);

            setReviewToDelete(null);
        } catch {
            addToast({ type: "error", message: t("error.deleteReview") });
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return null;
    }
    if(!pendingReview && (!data || data.reviews.length === 0)) {
        return <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">{t("reviews.no_reviews")}</p>;
    }

return (
        <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("reviews.section_title")}
                </h2>
            </div>

            {data && data.totalReviews > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-800/80 animate-fade-in">
                    <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                        <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400">
                            {data.averageRating.toFixed(1)}
                        </span>
                        
                        <div className="mt-2">
                            <StarDisplay rating={Math.round(data.averageRating)} size="xl" />
                        </div>
                        
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2">
                            {data.totalReviews} {t("reviews.total")}
                        </span>
                    </div>

                    <div className="md:col-span-2 flex flex-col justify-center gap-2">
                        {RATING_VALUES_DESC.map((stars) => {
                            const count = ratingBreakdown[stars as keyof typeof ratingBreakdown] || 0;
                            const percentage = data.totalReviews > 0 ? (count / data.totalReviews) * 100 : 0;
                            return (
                                <div key={stars} className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-4 text-right">
                                        {stars}
                                    </span>
                                    
                                    <span className="text-lg text-amber-500">★</span>
                                    
                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-10 text-right">
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {pendingReview && (
                <div className={`mb-6 rounded-2xl p-5 border ${
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
                            className="relative group bg-white/60 dark:bg-gray-800/40 backdrop-blur-xs rounded-2xl p-6 border border-gray-100 dark:border-gray-800/80 shadow-xs hover:shadow-md hover:border-brand-200 dark:hover:border-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300">
                            
                            <div className="absolute right-6 bottom-4 text-gray-200/20 dark:text-gray-700/20 pointer-events-none select-none text-7xl font-serif">
                                ”
                            </div>

                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        imageUrl={review.photoUrl ? getProfileImageUrl(review.photoUrl) : undefined}
                                        size="w-10 h-10 shadow-sm"
                                    />
                                    
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {review.username}
                                            </p>
                                            
                                            <span className="text-[10px] text-gray-300 dark:text-gray-600">•</span>
                                            
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {formDateTime(review.createdAt, locale)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30 shadow-xs">
                                                <span className="text-amber-500">★</span>
                                                <span>{review.rating.toFixed(0)}</span>
                                            </div>
                                            
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                {labels[review.rating as RatingValue]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {user?.id === review.accountId && (
                                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setReviewToEdit(review)}
                                            className="p-2 rounded-xl text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                                            title={t("common.edit")}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        
                                        <button
                                            onClick={() => setReviewToDelete(review)}
                                            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                            title={t("common.delete")}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {review.comment && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed relative z-10 font-medium whitespace-pre-wrap pl-1">
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

            <Modal
                isOpen={!!reviewToDelete}
                onClose={() => setReviewToDelete(null)}
                title={t("reviews.delete_title")}
                size="sm"
            >
                <div className="text-center">
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        {t("reviews.delete_description")}
                    </p>
                    
                    <Button
                        variant="danger"
                        onClick={handleDeleteConfirm}
                        isLoading={isDeleting}
                        className="w-full"
                    >
                        {t("common.delete")}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}