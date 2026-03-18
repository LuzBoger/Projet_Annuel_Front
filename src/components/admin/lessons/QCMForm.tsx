import { Control, useFieldArray, UseFormRegister, FieldErrors, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Trash, Plus } from "@/assets/icons";

interface QCMFormProps {
    control: Control<any>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
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
                <h3 className="text-lg font-medium text-gray-900">{t('admin.lessons.form.types.QCM')}</h3>
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
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500">{t('admin.lessons.no_lessons')}</p>
                </div>
            )}
        </div>
    );
}

function QuestionItem({ index, control, register, errors, onRemove }: { index: number, control: Control<any>, register: UseFormRegister<any>, errors: FieldErrors<any>, onRemove: () => void }) {
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
        <div className="relative p-6 bg-gray-50 rounded-xl border border-gray-100 group">
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onRemove}
                className="absolute -top-3 -right-3 p-2 bg-white shadow-md hover:!bg-red-50 !text-gray-400 hover:!text-red-600 transition-all opacity-0 group-hover:opacity-100"
            >
                <Trash className="w-4 h-4" />
            </Button>

            <div className="space-y-4">
                <FormField
                    label={t('admin.lessons.qcm.question')}
                    {...register(`questions.${index}.question`)}
                    error={(errors.questions as any)?.[index]?.question?.message}
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
                                <input
                                    type="radio"
                                    value={optIndex}
                                    checked={Number(correctOptionIndex) === optIndex}
                                    {...register(`questions.${index}.correctOptionIndex`)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <div className="flex-1">
                                    <FormField
                                        label={t('admin.lessons.qcm.option', { index: optIndex + 1 })}
                                        placeholder={t('admin.lessons.qcm.option', { index: optIndex + 1 })}
                                        {...register(`questions.${index}.options.${optIndex}`)}
                                        error={(errors.questions as any)?.[index]?.options?.[optIndex]?.message}
                                    />
                                </div>
                                {options.length > 2 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeOption(optIndex)}
                                        className="p-2 border-transparent !text-gray-400 hover:!text-red-600"
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
                    {...register(`questions.${index}.explanation`)}
                    error={(errors.questions as any)?.[index]?.explanation?.message}
                />
            </div>
        </div>
    );
}
