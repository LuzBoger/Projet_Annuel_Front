import * as yup from 'yup';

export const reviewSchema = (t: (key: string) => string) =>
    yup.object({
        rating: yup
            .number()
            .min(1, t('validation.review.rating_required'))
            .max(5, t('validation.review.rating_max'))
            .required(t('validation.review.rating_required')),
        comment: yup
            .string()
            .max(1000, t('validation.review.comment_max'))
            .optional().defined(),
    });

export type ReviewFormData = yup.InferType<ReturnType<typeof reviewSchema>>;
