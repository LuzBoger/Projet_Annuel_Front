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


interface ReviewModalProps {
    isOpen: boolean;
    mode: FormHeaderMode;
    title: string;
    topicName: string;
    submitLabel: string;
    cancelLabel: string;
    isSubmitting: boolean;
    control: Control<ReviewFormData>;
    errors: FieldErrors<ReviewFormData>;
    onSubmit: () => void;
    onCancel: () => void;
    showSuccess?: boolean;
}

export function ReviewModal({ isOpen, mode, title, topicName, submitLabel, cancelLabel, isSubmitting, control, errors, onSubmit, onCancel, showSuccess = false }: ReviewModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-[#1c1c1e] border border-white/10 shadow-xl p-6">
                {showSuccess ? (
                    <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                            <ReviewSuccess topicName={topicName} rating={field.value as RatingValue} onClose={onCancel} />
                        )}
                    />
                ) : (
                    <>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-base font-medium text-white mb-1">{title}</h3>
                                <p className="text-xs text-gray-400">{topicName}</p>
                            </div>
                            <FormHeader mode={mode} />
                        </div>

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
                            <p className="text-xs text-red-400 mt-1">{errors.rating.message}</p>
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
                                        (field.value?.length ?? 0) > 900 ? "text-amber-400" : "text-gray-600"
                                    }`}>
                                        {field.value?.length ?? 0}/1000
                                    </p>
                                )}
                            />
                        </div>

                        <div className="flex gap-3 mt-5">
                            <Button
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                                className="flex-1 border-white/15 text-gray-400 hover:bg-white/5"
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={onSubmit}
                                isLoading={isSubmitting}
                                className="flex-1 bg-indigo-500 hover:bg-indigo-400"
                            >
                                {submitLabel}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
