import * as yup from "yup";
import { LessonType } from "@/types/lesson/lesson";

export const lessonSchema = (t: (key: string) => string) => yup.object({
  title: yup.string().required(t('common.required')),
  description: yup.string().required(t('common.required')),
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
    )
    .min(5, t('admin.lessons.form.validation.flashcards_min'))
    .max(20, t('admin.lessons.form.validation.flashcards_max')),
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
    )
    .min(5, t('admin.lessons.form.validation.questions_min'))
    .max(20, t('admin.lessons.form.validation.questions_max')),
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
    )
    .min(3, t('admin.lessons.form.validation.matching_min'))
    .max(10, t('admin.lessons.form.validation.matching_max')),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Sorting Exercise specific
  sortingItems: yup.array().when('lessonType', {
    is: LessonType.SORTING_EXERCISE,
    then: (schema) => schema.of(
      yup.object({
        value: yup.string().required(t('common.required'))
      })
    )
    .min(3, t('admin.lessons.form.validation.sorting_min'))
    .max(10, t('admin.lessons.form.validation.sorting_max')),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const aiGenerationSchema = (t: (key: string) => string, lessonType: LessonType, isEdit: boolean) => {
  const isFlashcardOrQcm = lessonType === LessonType.FLASHCARD || lessonType === LessonType.QCM;
  const minItems = isFlashcardOrQcm ? 5 : 3;
  const maxItems = isFlashcardOrQcm ? 20 : 10;

  return yup.object({
    aiGenerationDescription: yup
      .string()
      .trim()
      .required(
        isEdit
          ? t("admin.lessons.form.ai_generate.empty_description_modify")
          : t("admin.lessons.form.ai_generate.empty_description")
      ),
    aiItemCount: yup
      .number()
      .transform((value, originalValue) => (originalValue === "" || originalValue === undefined || originalValue === null) ? undefined : value)
      .nullable()
      .optional()
      .test("is-valid-range", function (value) {
        if (value === undefined || value === null || isNaN(value)) {
          return true;
        }

        if (value < minItems || value > maxItems) {
          const errorMessage = isFlashcardOrQcm
            ? t("admin.lessons.form.ai_generate.item_count_error_flashcard_qcm")
            : t("admin.lessons.form.ai_generate.item_count_error_matching_sorting");
          return this.createError({ message: errorMessage });
        }

        return true;
      })
  });
};

export type LessonFormData = Omit<yup.InferType<ReturnType<typeof lessonSchema>>, 'orderIndex'> & { orderIndex?: number };
