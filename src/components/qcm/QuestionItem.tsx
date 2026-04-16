import { Control, FieldError, FieldErrors, useFieldArray, UseFormRegister, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Trash } from "@/assets/icons";
import { FormField } from "@/components/ui/FormField";
import { Radio } from "@/components/ui/Radio";
import { LessonFormData } from "@/validations/lessons/lessonSchema";

export function QuestionItem({ index, control, register, errors, onRemove }: { index: number, control: Control<LessonFormData>, register: UseFormRegister<LessonFormData>, errors: FieldErrors<LessonFormData>, onRemove: () => void }) {
    const { t } = useTranslation();
    const { fields: options, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: `questions.${index}.options`
    });

    const correctOptionIndex = useWatch({
        control,
        name: `questions.${index}.correctOptionIndex`
    });

    return (
        <div className="relative p-6 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 group transition-all hover:bg-white dark:hover:bg-gray-900/60 hover:shadow-md">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="absolute -top-3 -right-3 p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
            >
                <Trash className="w-4 h-4" />
            </Button>

            <div className="space-y-4">
                <FormField
                    label={t('admin.lessons.qcm.question')}
                    placeholder="ex: Comment dit-on 'Bonjour' ?"
                    {...register(`questions.${index}.question`)}
                    error={(errors.questions?.[index] as Record<string, FieldError | undefined>)?.question?.message}
                    required
                />

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">{t('admin.lessons.table.actions')}</label>
                        <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => appendOption("")}
                            className="text-xs"
                        >
                            {t('admin.lessons.qcm.add_option')}
                        </Button>
                    </div>
                    
                    <div className="grid gap-3">
                        {options.map((optionField, optIndex) => (
                            <div key={optionField.id} className="flex items-center gap-3">
                                <Radio
                                    value={optIndex}
                                    checked={Number(correctOptionIndex) === optIndex}
                                    {...register(`questions.${index}.correctOptionIndex`)}
                                />
                                <div className="flex-1">
                                    <FormField
                                        label={t('admin.lessons.qcm.option', { index: optIndex + 1 })}
                                        placeholder={t('admin.lessons.qcm.option', { index: optIndex + 1 })}
                                        {...register(`questions.${index}.options.${optIndex}`)}
                                        error={((errors.questions?.[index] as Record<string, unknown>)?.options as Record<number, FieldError | undefined> | undefined)?.[optIndex]?.message}
                                    />
                                </div>
                                {options.length > 2 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeOption(optIndex)}
                                        className="p-2 bg-transparent text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <FormField
                    label={t('admin.lessons.qcm.explanation')}
                    placeholder={t('admin.lessons.qcm.explanation_placeholder')}
                    {...register(`questions.${index}.explanation`)}
                    error={(errors.questions?.[index] as Record<string, FieldError | undefined>)?.explanation?.message}
                />
            </div>
        </div>
    );
}
