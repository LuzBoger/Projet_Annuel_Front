import { ChallengeFlashcardForm } from "@/components/challenge/ChallengeFlashcardForm";
import { MatchingPairForm } from "@/components/admin/lessons/MatchingPairForm";
import { QCMForm } from "@/components/admin/lessons/QCMForm";
import { SortingExerciseForm } from "@/components/admin/lessons/SortingExerciseForm";
import { InteractiveForm } from "@/components/admin/lessons/InteractiveForm";
import { Select } from "@/components/ui/Select";
import { LessonType } from "@/types/lesson/lesson";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LanguageOptions } from "@/types/language/language";

interface ChallengeLessonFormProps {
    lessonType: LessonType;
    control: Control<LessonFormData>;
    register: UseFormRegister<LessonFormData>;
    errors: FieldErrors<LessonFormData>;
    availableTypes: LessonType[];
    onLessonTypeChange: (type: LessonType) => void;
    languageOptions?: LanguageOptions[];
    setValue?: UseFormSetValue<LessonFormData>;
}

export function ChallengeLessonForm({ lessonType, control, register, errors, availableTypes, onLessonTypeChange, languageOptions, setValue }: ChallengeLessonFormProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <Select<LessonType>
                label={t('challenge.form.lesson_type')}
                value={lessonType}
                options={availableTypes.map(type => ({
                    value: type,
                    label: t(`challenge.type.${type.toLowerCase()}.type`)
                }))}
                onChange={onLessonTypeChange}
            />

            {lessonType === LessonType.QCM && <QCMForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.FLASHCARD && <ChallengeFlashcardForm control={control} register={register} errors={errors} languageOptions={languageOptions ?? []} />}
            {lessonType === LessonType.MATCHING_PAIR && <MatchingPairForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.SORTING_EXERCISE && <SortingExerciseForm control={control} register={register} errors={errors} />}
            {lessonType === LessonType.INTERACTIVE && setValue && <InteractiveForm control={control} register={register} errors={errors} setValue={setValue} />}
        </div>
    );
}
