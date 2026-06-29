import { Control, useFieldArray, UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { InteractiveQuestionItem } from "./InteractiveQuestionItem";

interface InteractiveFormProps {
  control: Control<LessonFormData>;
  register: UseFormRegister<LessonFormData>;
  errors: FieldErrors<LessonFormData>;
  setValue: UseFormSetValue<LessonFormData>;
}

export function InteractiveForm({ control, register, errors, setValue }: InteractiveFormProps) {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interactiveQuestions"
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t("admin.lessons.form.types.INTERACTIVE")}
        </h3>
        <Button
          type="button"
          variant="pill-green"
          size="sm"
          onClick={() =>
            append({
              questionText: "",
              imagePaths: [],
              audioPaths: [],
              systemType: "MULTIPLE_CHOICE",
              options: ["", ""],
              correctOptionIndex: 0,
              correctWord: ""
            })
          }
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("admin.lessons.interactive.add_question")}
        </Button>
      </div>

      {errors.interactiveQuestions?.message && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl border border-red-100 dark:border-red-900/50">
          {errors.interactiveQuestions.message}
        </div>
      )}

      <div className="space-y-8">
        {fields.map((field, index) => (
          <InteractiveQuestionItem
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">
            {t("admin.lessons.no_lessons")}
          </p>
        </div>
      )}
    </div>
  );
}
