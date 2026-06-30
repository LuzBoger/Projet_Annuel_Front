import { Control, useFieldArray, UseFormRegister, FieldErrors, FieldError, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Trash, Plus } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { LanguageOptions } from "@/types/language/language";

interface ChallengeFlashcardFormProps {
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
    languageOptions: LanguageOptions[];
}

export function ChallengeFlashcardForm({ control, register, errors, languageOptions }: ChallengeFlashcardFormProps) {
    const { t } = useTranslation();
    const defaultFrontLanguage = languageOptions[0]?.code ?? '';
    const defaultBackLanguage = languageOptions[1]?.code ?? '';

    const { fields, append, remove } = useFieldArray({control,name: "flashcards"});

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('admin.lessons.form.types.FLASHCARD')}</h3>
                <Button
                    type="button"
                    variant="pill-green"
                    size="sm"
                    onClick={() => append({ front: "", back: "", frontLanguage: defaultFrontLanguage, backLanguage: defaultBackLanguage })}
                    className="gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {t('admin.lessons.flashcards.add')}
                </Button>
            </div>

            {errors.flashcards?.message && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl border border-red-100 dark:border-red-900/50">
                    {errors.flashcards.message}
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

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Controller
                                control={control}
                                name={`flashcards.${index}.frontLanguage`}
                                render={({ field }) => (
                                    <Select
                                        label={t('admin.lessons.flashcards.frontLang')}
                                        value={field.value}
                                        options={languageOptions.map(lang => ({ value: lang.code, label: lang.name }))}
                                        onChange={field.onChange}
                                        placeholder={languageOptions.length === 0 ? t('challenge.create.select_language') : undefined}
                                        disabled={languageOptions.length === 0}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name={`flashcards.${index}.backLanguage`}
                                render={({ field }) => (
                                    <Select
                                        label={t('admin.lessons.flashcards.backLang')}
                                        value={field.value}
                                        options={languageOptions.map(lang => ({ value: lang.code, label: lang.name }))}
                                        onChange={field.onChange}
                                        placeholder={languageOptions.length === 0 ? t('challenge.create.select_language') : undefined}
                                        disabled={languageOptions.length === 0}
                                    />
                                )}
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
