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
        name: "sortingItems"
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{t('admin.lessons.form.types.SORTING_EXERCISE')}</h3>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => append({ value: "" })}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.sorting.add', 'Ajouter un élément')}
                </Button>
            </div>

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 group transition-all hover:bg-white hover:shadow-sm">
                        
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <IconButton
                                icon={<ChevronUp className="w-5 h-5" />}
                                disabled={index === 0}
                                onClick={() => swap(index, index - 1)}
                                variant="ghost"
                                title="Monter"
                            />
                            <span className="text-xs font-bold text-gray-300 select-none">{index + 1}</span>
                            <IconButton
                                icon={<ChevronDown className="w-5 h-5" />}
                                disabled={index === fields.length - 1}
                                onClick={() => swap(index, index + 1)}
                                variant="ghost"
                                title="Descendre"
                            />
                        </div>

                        <div className="flex-1 mt-6">
                            <FormField
                                label=""
                                {...register(`sortingItems.${index}.value`)}
                                placeholder="ex: Je m'appelle..."
                                error={(errors.sortingItems?.[index] as Record<string, FieldError | undefined>)?.value?.message}
                                required/>
                        </div>
                        
                        <div className="mt-6">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => remove(index)}
                                className="bg-white p-2 !text-gray-400 hover:!text-red-600 hover:!bg-red-50 border border-gray-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
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
                {t('admin.lessons.sorting.note_new', "Ajoutez les éléments (mots ou fragments) directement dans l'ordre final attendu de 1 à N. Vous pouvez utiliser les flèches pour les réorganiser facilement.")}
            </p>
        </div>
    );
}
