import * as yup from 'yup';

export const createLanguageSchema = (t: (key: string) => string) =>
    yup.object({
        code: yup.string().required(t('validation.languageCode.required')),
        name: yup.string().required(t('validation.languageName.required')).max(100, t('validation.languageName.max')),
        orderIndex: yup.number().required(t('validation.languageOrderIndex.required')).min(0, t('validation.languageOrderIndex.min')),
        isActive: yup.boolean().optional().defined(),
    });

export type CreateLanguageFormData = yup.InferType<ReturnType<typeof createLanguageSchema>>;