import * as yup from 'yup';
import { ChallengeType } from "@/types/challenges/challenge";
import { CHALLENGE_TYPES } from '@/constants/challenge';
import { LessonType } from '@/types/lesson/lesson';


export const challengeSchema = (t: (key: string) => string) => yup.object({
    title: yup.string().trim().required(t('challenge.validation.title')).max(200, t('challenge.validation.title.max')),
    challengeType: yup.string().oneOf(Object.values(CHALLENGE_TYPES) as ChallengeType[]).required(t('challenge.validation.challengeType')),

    questionCount: yup.number().transform((value) => (isNaN(value) ? undefined : value)).min(1).max(50).notRequired(),

    lessonId: yup.string().when('challengeType', {
        is: 'DUEL',
        then: (schema) => schema.uuid().required(t('challenge.validation.lessonId')),
        otherwise: (schema) => schema.notRequired()
    }),

    lessonType: yup.string().oneOf(Object.values(LessonType) as LessonType[]).when('challengeType', {
        is: 'PUBLIC',
        then: (schema) => schema.required(t('challenge.validation.lessonType')),
        otherwise: (schema) => schema.notRequired()
    }),

    languageId: yup.string().when('challengeType', {
        is: 'PUBLIC',
        then: (schema) => schema.uuid().required(t('challenge.validation.languageId')),
        otherwise: (schema) => schema.notRequired()
    }),

    challengedId: yup.string().when('challengeType', {
        is: 'DUEL',
        then: (schema) => schema.uuid().required(t('challenge.validation.challengedId.required')),
        otherwise: (schema) => schema.notRequired()
    }),
});

export type ChallengeFormData = yup.InferType<ReturnType<typeof challengeSchema>>;
