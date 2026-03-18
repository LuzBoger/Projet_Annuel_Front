import { Control, useFieldArray, UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Trash, Plus } from "@/assets/icons";

interface SortingExerciseFormProps {
    control: Control<any>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
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
                            <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => swap(index, index - 1)}
                                className="text-gray-400 hover:text-indigo-600 disabled:opacity-20 disabled:hover:text-gray-400 p-1"
                                title="Monter"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            </button>
                            <span className="text-xs font-bold text-gray-300 select-none">{index + 1}</span>
                            <button
                                type="button"
                                disabled={index === fields.length - 1}
                                onClick={() => swap(index, index + 1)}
                                className="text-gray-400 hover:text-indigo-600 disabled:opacity-20 disabled:hover:text-gray-400 p-1"
                                title="Descendre"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                        </div>

                        <div className="flex-1 mt-6">
                            <FormField
                                label=""
                                placeholder={t('admin.lessons.sorting.item_placeholder', 'Ex: Je / suis / un / chat...')}
                                {...register(`sortingItems.${index}.value`)}
                                error={(errors.sortingItems as any)?.[index]?.value?.message}
                            />
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
