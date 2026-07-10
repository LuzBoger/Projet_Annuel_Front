import * as yup from "yup";
import { LessonType } from "@/types/lesson/lesson";

export const lessonSchema = (t: (key: string) => string) => yup.object({
  title: yup.string().required(t('common.required')),
  description: yup.string().required(t('common.required')),
  isActive: yup.boolean().required(),
  lessonType: yup.string().oneOf(Object.values(LessonType)).required(t('common.required')),
  
  flashcards: yup.array().when('lessonType', {
    is: LessonType.FLASHCARD,
    then: (schema) => schema.of(
      yup.object({
        front: yup.string().required(t('common.required')),
        back: yup.string().required(t('common.required')),
        frontLanguage: yup.string().required(t('common.required')),
        backLanguage: yup.string().required(t('common.required')),
      })
    )
    .min(5, t('admin.lessons.form.validation.flashcards_min'))
    .max(20, t('admin.lessons.form.validation.flashcards_max')),
    otherwise: (schema) => schema.notRequired(),
  }),

  questions: yup.array().when('lessonType', {
    is: LessonType.QCM,
    then: (schema) => schema.of(
      yup.object({
        question: yup.string().required(t('common.required')),
        options: yup.array().of(yup.string().required(t('common.required'))).min(2, t('common.required')),
        correctOptionIndex: yup.number().required(t('common.required')),
        explanation: yup.string(),
      })
    )
    .min(5, t('admin.lessons.form.validation.questions_min'))
    .max(20, t('admin.lessons.form.validation.questions_max')),
    otherwise: (schema) => schema.notRequired(),
  }),

  matchingPairs: yup.array().when('lessonType', {
    is: LessonType.MATCHING_PAIR,
    then: (schema) => schema.of(
      yup.object({
        item1: yup.string().required(t('common.required')),
        item2: yup.string().required(t('common.required')),
      })
    )
    .min(3, t('admin.lessons.form.validation.matching_min'))
    .max(10, t('admin.lessons.form.validation.matching_max')),
    otherwise: (schema) => schema.notRequired(),
  }),

  sortingExercises: yup.array().when('lessonType', {
    is: LessonType.SORTING_EXERCISE,
    then: (schema) => schema.of(
      yup.object({
        sentence: yup.string().required(t('common.required'))
          .test('min-words', t('admin.lessons.form.validation.sorting_min_words'), (value) => {
              if (!value) return false;
              const words = value.trim().split(/\s+/);
              return words.length >= 3;
          })
          .test('max-words', t('admin.lessons.form.validation.sorting_max_words'), (value) => {
              if (!value) return false;
              const words = value.trim().split(/\s+/);
              return words.length <= 10;
          })
      })
    )
    .min(3, t('admin.lessons.form.validation.sorting_min'))
    .max(10, t('admin.lessons.form.validation.sorting_max')),
    otherwise: (schema) => schema.notRequired(),
  }),

  interactiveQuestions: yup.array().when('lessonType', {
    is: LessonType.INTERACTIVE,
    then: (schema) => schema.of(
      yup.object({
        questionText: yup.string().required(t('common.required')),
        imagePaths: yup.array().of(yup.string().required()).default([]),
        audioPaths: yup.array().of(yup.string().required()).default([]),
        systemType: yup.string().oneOf(["MULTIPLE_CHOICE", "OPEN_TEXT"]).required(t('common.required')),
        options: yup.array().of(yup.string().required(t('common.required'))).default([]),
        correctOptionIndex: yup.number().nullable().when('systemType', {
          is: "MULTIPLE_CHOICE",
          then: (s) => s.required(t('common.required')),
          otherwise: (s) => s.nullable().notRequired()
        }),
        correctWord: yup.string().nullable().when('systemType', {
          is: "OPEN_TEXT",
          then: (s) => s.required(t('common.required')),
          otherwise: (s) => s.nullable().notRequired()
        })
      })
    )
    .min(3, t('admin.lessons.form.validation.matching_min'))
    .max(20, t('admin.lessons.form.validation.matching_max')),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export type LessonFormData = Omit<yup.InferType<ReturnType<typeof lessonSchema>>, 'orderIndex'> & { orderIndex?: number };
