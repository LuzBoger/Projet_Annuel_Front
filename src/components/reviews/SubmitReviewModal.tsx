import { useToast } from "@/hooks/useToast";
import { reviewService } from "@/services/reviewService";
import { ReviewFormData, reviewSchema } from "@/validations/reviews/reviewSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReviewModal } from "./ReviewModal";
import { RatingValue } from "@/constants/review";

interface SubmitReviewModalProps {
    isOpen: boolean;
    topicId: string;
    topicName: string;
    onClose: () => void;
}

export function SubmitReviewModal({ isOpen, topicId, topicName, onClose }: SubmitReviewModalProps) {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
        resolver: yupResolver(reviewSchema(t)),
        defaultValues: {
            rating: 0 as RatingValue,
            comment: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await reviewService.addReview(topicId, {
                rating: data.rating as RatingValue,
                comment: data.comment || undefined,
            });
            setShowSuccess(true);
        } catch {
            addToast({ type: "error", message: t("reviews.add_error") });
        } finally {
            setIsSubmitting(false);
        }
    });

    const handleClose = () => {
        reset();
        setShowSuccess(false);
        onClose();
    };

    return (
        <ReviewModal
            isOpen={isOpen}
            mode="add"
            title={t("reviews.modal_title")}
            topicName={topicName}
            submitLabel={t("reviews.submit")}
            cancelLabel={t("common.skip")}
            isSubmitting={isSubmitting}
            control={control}
            errors={errors}
            onSubmit={onSubmit}
            onCancel={handleClose}
            showSuccess={showSuccess}
        />
    );
}
