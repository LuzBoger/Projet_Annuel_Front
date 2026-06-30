import { FormHeaderMode } from "@/types/components/formHeader";
import { useTranslation } from "react-i18next";
import { ReviewSuccess } from "@/components/reviews/ReviewSuccess";
import { FormHeader } from "@/components/reviews/FormHeader";
import { StarRating } from "@/components/ui/reviews/StarRating";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ReviewFormData } from "@/validations/reviews/reviewSchema";
import { RatingValue } from "@/constants/review";
import { Modal } from "@/components/ui/Modal";

interface ReviewModalProps {
    isOpen: boolean;
    mode: FormHeaderMode;
    title: string;
    topicName: string;
    submitLabel: string;
    isSubmitting: boolean;
    control: Control<ReviewFormData>;
    errors: FieldErrors<ReviewFormData>;
    onSubmit: () => void;
    onCancel: () => void;
    showSuccess?: boolean;
}

export function ReviewModal({
    isOpen,
    mode,
    title,
    topicName,
    submitLabel,
    isSubmitting,
    control,
    errors,
    onSubmit,
    onCancel,
    showSuccess = false
}: ReviewModalProps) {
    const { t } = useTranslation();

    const customModalHeader = (
        <div className="flex items-center gap-3">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {title}
                </span>
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    {topicName}
                </span>
            </div>
            
            <FormHeader mode={mode} />
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={customModalHeader}
            size="md"
        >
            {showSuccess ? (
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <ReviewSuccess
                            topicName={topicName}
                            rating={field.value as RatingValue}
                            onClose={onCancel}
                        />
                    )}
                />
            ) : (
                <>
                    <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                            <StarRating
                                rating={field.value as RatingValue}
                                onRatingChange={field.onChange}
                            />
                        )}
                    />
                    {errors.rating && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {errors.rating.message}
                        </p>
                    )}

                    <div className="mt-4">
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    placeholder={t("reviews.comment_placeholder")}
                                    maxLength={1000}
                                    rows={3}
                                    error={errors.comment?.message}
                                />
                            )}
                        />
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <p className={`text-xs text-right mt-1 ${
                                    (field.value?.length ?? 0) > 900 
                                        ? "text-amber-500 dark:text-amber-400" 
                                        : "text-gray-500 dark:text-gray-400"
                                }`}>
                                    {field.value?.length ?? 0}/1000
                                </p>
                            )}
                        />
                    </div>

                    <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button
                            variant="primary"
                            onClick={onSubmit}
                            isLoading={isSubmitting}
                            className="w-full"
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
}
