import * as yup from "yup";
import { LessonType } from "@/types/lesson/lesson";

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
      .typeError(t("admin.lessons.form.ai_generate.item_count_required"))
      .required(t("admin.lessons.form.ai_generate.item_count_required"))
      .test("is-valid-range", function (value) {
        if (value === undefined || value === null || isNaN(value)) {
          return false;
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
