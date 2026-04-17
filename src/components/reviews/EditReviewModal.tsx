import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/hooks/useToast";
import { reviewService } from "@/services/reviewService";
import { ReviewFormData, reviewSchema } from "@/validations/reviews/reviewSchema";
import { RatingValue } from "@/constants/review";
import { ReviewModal } from "./ReviewModal";

interface EditReviewModalProps {
    isOpen: boolean;
    reviewId: string;
    topicName: string;
    initialRating: RatingValue;
    initialComment?: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export function EditReviewModal({ isOpen, reviewId, topicName, initialRating, initialComment, onClose, onSuccess }: EditReviewModalProps) {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
        resolver: yupResolver(reviewSchema(t)),
        defaultValues: {
            rating: initialRating,
            comment: initialComment ?? "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await reviewService.updateReview(reviewId, {
                rating: data.rating as RatingValue,
                comment: data.comment || undefined,
            });
            onSuccess?.();
            handleClose();
        } catch {
            addToast({ type: "error", message: t("reviews.update_error") });
        } finally {
            setIsSubmitting(false);
        }
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <ReviewModal
            isOpen={isOpen}
            mode="edit"
            title={t("reviews.edit_title")}
            topicName={topicName}
            submitLabel={t("reviews.update")}
            cancelLabel={t("common.cancel")}
            isSubmitting={isSubmitting}
            control={control}
            errors={errors}
            onSubmit={onSubmit}
            onCancel={handleClose}
        />
    );
}
