import * as yup from 'yup';

export const updateTopicSchema = (t: (key: string) => string) =>
    yup.object({
        languageId: yup.string().required(t('validation.languageId.required')),
        name: yup.string().required(t('validation.topicName.required')).max(100, t('validation.topicName.max')),
        description: yup.string().max(500, t('validation.topicDescription.max')).optional().defined(),
        difficulty: yup.string().required(t('validation.topicDifficulty.required')),
        isActive: yup.boolean().optional().defined(),
    });

export type UpdateTopicFormData = yup.InferType<ReturnType<typeof updateTopicSchema>>;
