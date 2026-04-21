import * as yup from 'yup';

export const updateLanguageSchema = (t: (key: string) => string) =>
    yup.object({
        code: yup.string().required(t('validation.languageCode.required')),
        name: yup.string().required(t('validation.languageName.required')).max(100, t('validation.languageName.max')),
        isActive: yup.boolean().optional().defined(),
    });

export type UpdateLanguageFormData = yup.InferType<ReturnType<typeof updateLanguageSchema>>;
