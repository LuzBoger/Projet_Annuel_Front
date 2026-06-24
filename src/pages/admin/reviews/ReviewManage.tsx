import { ReviewActions } from "@/components/reviews/ReviewActions";
import { ReviewTabs } from "@/components/reviews/ReviewTabs";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ReviewStatusBadge } from "@/components/ui/reviews/ReviewStatusBadge";
import { StarDisplay } from "@/components/ui/reviews/StarDisplay";
import { Table } from "@/components/ui/Table";
import { useReview } from "@/hooks/useReview";
import { useToast } from "@/hooks/useToast";
import { getFiltersReviewByStatus, getReviewCountByStatus } from "@/lib/utils/review";
import { reviewService } from "@/services/reviewService";
import { Tab } from "@/types/components/reviewsTabs";
import { TableColumn } from "@/types/components/tableColumn";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ReviewManage() {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const { reviews, loading, fetchAllReviews, approveReview, deleteReview } = useReview();
    const [tab, setTab] = useState<Tab>("PENDING");
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchAllReviews();
    }, [fetchAllReviews]);

    useEffect(() => {
        const handler = () => fetchAllReviews();
        window.addEventListener("NEW_PENDING_REVIEW", handler);
        return () =>window.removeEventListener("NEW_PENDING_REVIEW", handler);
    }, [fetchAllReviews]);


    const handleReject = async (id: string) => {
        try {
            await reviewService.rejectReview(id);
            await fetchAllReviews();
            addToast({ type: "success", message: t("reviews.rejected_success") });
        } catch {
            addToast({ type: "error", message: t("reviews.reject_error") });
        }
    };

    const handleDelete = async () => {
        if (!reviewToDelete) return;
        await deleteReview(reviewToDelete);
        setReviewToDelete(null);
    };

    const tabs = [
        { key: "ALL"       as Tab, label: t("reviews.tab_all"),        count: reviews.length },
        { key: "PUBLISHED" as Tab, label: t("reviews.tab_published"),  count: getReviewCountByStatus(reviews, "PUBLISHED") },
        { key: "PENDING"   as Tab, label: t("reviews.tab_pending"),   count: getReviewCountByStatus(reviews, "PENDING") },
        { key: "REJECTED"  as Tab, label: t("reviews.tab_rejected"),   count: getReviewCountByStatus(reviews, "REJECTED") },
    ];

    const columns: TableColumn[] = [
        { key: "user",    label: t("reviews.col_user") },
        { key: "topic",   label: t("reviews.col_topic") },
        { key: "rating",  label: t("reviews.col_rating") },
        { key: "comment", label: t("reviews.col_comment") },
        { key: "status",  label: t("reviews.col_status") },
        { key: "date",    label: t("reviews.col_date") },
        { key: "actions", label: t("common.actions"), align: "right" as const },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("reviews.admin_title")}
            </h1>

            <ReviewTabs tabs={tabs} activeTab={tab} onChange={setTab} />

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
                </div>
            ) : (
                <Table
                    data={getFiltersReviewByStatus(reviews, tab)}
                    columns={columns}
                    keyExtractor={(r) => r.id}
                    emptyMessage={t("reviews.no_reviews")}
                    renderRow={(review) => (
                        <>
                            <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{review.username}</td>
                            <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{review.topicName}</td>
                            <td className="px-6 py-3"><StarDisplay rating={review.rating} size="sm" /></td>
                            <td className="px-6 py-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                {review.comment ?? <span className="italic text-gray-300">{t("reviews.no_comment")}</span>}
                            </td>
                            <td className="px-6 py-3"><ReviewStatusBadge status={review.status} /></td>
                            <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-3">
                                <ReviewActions
                                    status={review.status}
                                    onApprove={() => approveReview(review.id)}
                                    onReject={() => handleReject(review.id)}
                                    onDelete={() => setReviewToDelete(review.id)}
                                />
                            </td>
                        </>
                    )}
                />
            )}

            <ConfirmModal
                isOpen={!!reviewToDelete}
                title={t("reviews.delete_title")}
                description={t("reviews.delete_description")}
                onConfirm={handleDelete}
                onCancel={() => setReviewToDelete(null)}
                isConfirming={loading}
                confirmVariant="danger"
            />
        </div>
    );
}
