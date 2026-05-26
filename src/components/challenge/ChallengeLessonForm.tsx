import { FlashcardForm } from "@/components/admin/lessons/FlashcardForm";
import { MatchingPairForm } from "@/components/admin/lessons/MatchingPairForm";
import { QCMForm } from "@/components/admin/lessons/QCMForm";
import { SortingExerciseForm } from "@/components/admin/lessons/SortingExerciseForm";
import { Button } from "@/components/ui/Button";
import { LessonType } from "@/types/lesson/lesson";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ChallengeLessonFormProps {
    lessonType: LessonType;
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
    availableTypes: LessonType[];
    onLessonTypeChange: (type: LessonType) => void;
}

export function ChallengeLessonForm({ lessonType, control, register, errors, availableTypes, onLessonTypeChange }: ChallengeLessonFormProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('challenge.form.lesson_type')}</label>
                <div className="flex flex-wrap gap-3">
                    {availableTypes.map(type => (
                        <Button
                            key={type}
                            type="button"
                            variant={lessonType === type ? 'primary' : 'outline'}
                            onClick={() => onLessonTypeChange(type)}
                        >
                            {t(`challenge.type.${type.toLowerCase()}.type`)}
                        </Button>
                    ))}
                </div>
            </div>

            {lessonType === LessonType.QCM && <QCMForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.FLASHCARD && <FlashcardForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.MATCHING_PAIR && <MatchingPairForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.SORTING_EXERCISE && <SortingExerciseForm control={control} register={register} errors={errors} />}
        </div>
    );
}
