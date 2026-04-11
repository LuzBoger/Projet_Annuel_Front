import { Control, useFieldArray, UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Trash, Plus } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";

interface FlashcardFormProps {
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
}

export function FlashcardForm({ control, register, errors }: FlashcardFormProps) {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "flashcards"
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{t('admin.lessons.form.types.FLASHCARD')}</h3>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => append({ front: "", back: "", frontLanguage: "fr", backLanguage: "en" })}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.flashcards.add')}
                </Button>
            </div>

            <div className="grid gap-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 bg-gray-50 rounded-xl border border-gray-100 group">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 p-2 bg-white shadow-md hover:bg-red-50 hover:text-red-600 transition-all "
                        >
                            <Trash className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                label={t('admin.lessons.flashcards.front')}
                                {...register(`flashcards.${index}.front`)}
                                placeholder="ex: Bonjour"
                                error={(errors.flashcards?.[index] as Record<string, FieldError | undefined>)?.front?.message}
                                required
                            />
                            <FormField
                                label={t('admin.lessons.flashcards.back')}
                                {...register(`flashcards.${index}.back`)}
                                placeholder="ex: Hello"
                                error={(errors.flashcards?.[index] as Record<string, FieldError | undefined>)?.back?.message}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                label={t('admin.lessons.flashcards.frontLang')}
                                {...register(`flashcards.${index}.frontLanguage`)}
                                placeholder="ex: fr"
                                error={(errors.flashcards?.[index] as Record<string, FieldError | undefined>)?.frontLanguage?.message}
                            />
                            <FormField
                                label={t('admin.lessons.flashcards.backLang')}
                                {...register(`flashcards.${index}.backLanguage`)}
                                placeholder="ex: en"
                                error={(errors.flashcards?.[index] as Record<string, FieldError | undefined>)?.backLanguage?.message}
                                required
                            />
                        </div>
                    </div>
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
