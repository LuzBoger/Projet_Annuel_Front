import { Control, useFieldArray, UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { IconButton } from "@/components/ui/IconButton";
import { Trash, Plus, ChevronUp, ChevronDown } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";

interface SortingExerciseFormProps {
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
}

export function SortingExerciseForm({ control, register, errors }: SortingExerciseFormProps) {
    const { t } = useTranslation();
    const { fields, append, remove, swap } = useFieldArray({
        control,
        name: "sortingExercises"
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('admin.lessons.form.types.SORTING_EXERCISE')}</h3>
                <Button 
                    type="button" 
                    variant="pill-green"
                    size="sm" 
                    onClick={() => append({ sentence: "" })}
                    className="gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.sorting.add')}
                </Button>
            </div>

            {errors.sortingExercises?.message && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl border border-red-100 dark:border-red-900/50">
                    {errors.sortingExercises.message}
                </div>
            )}

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 group transition-all hover:bg-white dark:hover:bg-gray-900/60 hover:shadow-md">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>

                        <div className="flex flex-col gap-1 items-center justify-center">
                            <IconButton
                                icon={<ChevronUp className="w-5 h-5" />}
                                disabled={index === 0}
                                onClick={() => swap(index, index - 1)}
                                variant="ghost"
                                title={t('admin.lessons.sorting.move_up')}
                            />
                            <span className="text-xs font-bold text-gray-300 dark:text-gray-700 select-none">{index + 1}</span>
                            <IconButton
                                icon={<ChevronDown className="w-5 h-5" />}
                                disabled={index === fields.length - 1}
                                onClick={() => swap(index, index + 1)}
                                variant="ghost"
                                title={t('admin.lessons.sorting.move_down')}
                            />
                        </div>

                        <div className="flex-1 mt-6">
                            <FormField
                                label={t('admin.lessons.sorting.sentence_label', { index: index + 1 })}
                                {...register(`sortingExercises.${index}.sentence`)}
                                placeholder={t('admin.lessons.sorting.sentence_placeholder')}
                                error={(errors.sortingExercises?.[index] as Record<string, FieldError | undefined>)?.sentence?.message}
                                required/>
                        </div>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">{t('admin.lessons.no_lessons')}</p>
                    </div>
                )}
            </div>

            <p className="text-sm text-gray-500 italic px-2">
                {t('admin.lessons.sorting.note_new')}
            </p>
        </div>
    );
}
