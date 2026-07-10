import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { StarDisplay } from "@/components/ui/reviews/StarDisplay";
import { ReviewStatusBadge } from "@/components/ui/reviews/ReviewStatusBadge";
import { TopicReviewResponse } from "@/types/review/review";
import { useTranslation } from "react-i18next";

interface ReviewDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: TopicReviewResponse | null;
}

export function ReviewDetailsModal({ isOpen, onClose, review }: ReviewDetailsModalProps) {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    if (!isOpen || !review) {
        return null;
    }

    const reviewDate = new Date(review.createdAt).toLocaleDateString(currentLocale);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t("reviews.view_details_title")}
            size="md"
        >
            <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_user")}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {review.username}
                    </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_topic")}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {review.topicName}
                    </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_rating")}
                    </span>
                    <span>
                        <StarDisplay rating={review.rating} size="sm" />
                    </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_status")}
                    </span>
                    <span>
                        <ReviewStatusBadge status={review.status} />
                    </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_date")}
                    </span>
                    <span className="text-gray-900 dark:text-white">
                        {reviewDate}
                    </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <span className="text-gray-500 dark:text-gray-400">
                        {t("reviews.col_comment")}
                    </span>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words border border-gray-100 dark:border-gray-800/50">
                        {review.comment ?? (
                            <span className="italic text-gray-400 dark:text-gray-500">
                                {t("reviews.no_comment")}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-5 mt-4 border-t border-gray-100 dark:border-gray-800">
                <Button variant="pill-red" onClick={onClose} className="w-full sm:w-auto px-8">
                    {t("common.close")}
                </Button>
            </div>
        </Modal>
    );
}
