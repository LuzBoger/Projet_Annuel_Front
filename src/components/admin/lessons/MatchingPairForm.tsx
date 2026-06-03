import { Control, useFieldArray, UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Trash, Plus } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";

interface MatchingPairFormProps {
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
}

export function MatchingPairForm({ control, register, errors }: MatchingPairFormProps) {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "matchingPairs"
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('admin.lessons.form.types.MATCHING_PAIR')}</h3>
                <Button 
                    type="button" 
                    variant="pill-green"
                    size="sm" 
                    onClick={() => append({ item1: "", item2: "" })}
                    className="gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.matching.add')}
                </Button>
            </div>

            {errors.matchingPairs?.message && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl border border-red-100 dark:border-red-900/50">
                    {errors.matchingPairs.message}
                </div>
            )}

            <div className="grid gap-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 group transition-all hover:bg-white dark:hover:bg-gray-900/60 hover:shadow-md">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                label={t('admin.lessons.matching.item1')}
                                {...register(`matchingPairs.${index}.item1`)}
                                placeholder="ex: Bonjour"
                                error={(errors.matchingPairs?.[index] as Record<string, FieldError | undefined>)?.item1?.message}
                                required
                            />
                            <FormField
                                label={t('admin.lessons.matching.item2')}
                                {...register(`matchingPairs.${index}.item2`)}
                                placeholder="ex: Hello"
                                error={(errors.matchingPairs?.[index] as Record<string, FieldError | undefined>)?.item2?.message}
                                required
                            />
                        </div>
                    </div>
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
