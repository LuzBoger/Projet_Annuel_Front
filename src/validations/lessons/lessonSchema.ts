import * as yup from "yup";
import { LessonType } from "@/types/lesson/lesson";

export const lessonSchema = (t: (key: string) => string) => yup.object({
  title: yup.string().required(t('common.required')),
  description: yup.string().required(t('common.required')),
  xpReward: yup.number().min(0).required(t('common.required')),
  minLevelRequired: yup.number().min(0).required(t('common.required')),
  durationMinutes: yup.number().min(1).required(t('common.required')),
  isActive: yup.boolean().required(),
  lessonType: yup.string().oneOf(Object.values(LessonType)).required(t('common.required')),
  
  // Flashcard specific
  flashcards: yup.array().when('lessonType', {
    is: LessonType.FLASHCARD,
    then: (schema) => schema.of(
      yup.object({
        front: yup.string().required(t('common.required')),
        back: yup.string().required(t('common.required')),
        frontLanguage: yup.string().required(t('common.required')),
        backLanguage: yup.string().required(t('common.required')),
      })
    ).min(1, t('common.required')),
    otherwise: (schema) => schema.notRequired(),
  }),

  // QCM specific
  questions: yup.array().when('lessonType', {
    is: LessonType.QCM,
    then: (schema) => schema.of(
      yup.object({
        question: yup.string().required(t('common.required')),
        options: yup.array().of(yup.string().required(t('common.required'))).min(2, t('common.required')),
        correctOptionIndex: yup.number().required(t('common.required')),
        explanation: yup.string(),
      })
    ).min(1, t('common.required')),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Matching Pair specific
  matchingPairs: yup.array().when('lessonType', {
    is: LessonType.MATCHING_PAIR,
    then: (schema) => schema.of(
      yup.object({
        item1: yup.string().required(t('common.required')),
        item2: yup.string().required(t('common.required')),
      })
    ).min(1, t('common.required')),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Sorting Exercise specific
  sortingItems: yup.array().when('lessonType', {
    is: LessonType.SORTING_EXERCISE,
    then: (schema) => schema.of(
      yup.object({
        value: yup.string().required(t('common.required'))
      })
    ).min(2, t('common.required')),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export type LessonFormData = Omit<yup.InferType<ReturnType<typeof lessonSchema>>, 'orderIndex'> & { orderIndex?: number };
