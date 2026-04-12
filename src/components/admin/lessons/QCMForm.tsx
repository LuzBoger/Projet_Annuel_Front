import { Control, useFieldArray, UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { QuestionItem } from "@/components/qcm/QuestionItem";

interface QCMFormProps {
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
}

export function QCMForm({ control, register, errors }: QCMFormProps) {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('admin.lessons.form.types.QCM')}</h3>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => append({ question: "", options: ["", ""], correctOptionIndex: 0, explanation: "" })}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.qcm.add_question')}
                </Button>
            </div>

            <div className="space-y-8">
                {fields.map((field, index) => (
                    <QuestionItem 
                        key={field.id}
                        index={index}
                        control={control}
                        register={register}
                        errors={errors}
                        onRemove={() => remove(index)}
                    />
                ))}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">{t('admin.lessons.no_lessons')}</p>
                </div>
            )}
        </div>
    );
}
