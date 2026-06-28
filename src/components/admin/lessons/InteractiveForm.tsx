import { Control, useFieldArray, UseFormRegister, FieldErrors, useWatch, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Plus, Trash, PlayIcon, Spinner } from "@/assets/icons";
import { LessonFormData } from "@/validations/lessons/lessonSchema";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Radio } from "@/components/ui/Radio";
import { lessonService } from "@/services/lessonService";
import { getImageUrl, getAudioUrl } from "@/lib/utils/media";
import { useState, useRef } from "react";

interface InteractiveQuestionError {
  questionText?: { message?: string };
  systemType?: { message?: string };
  correctOptionIndex?: { message?: string };
  correctWord?: { message?: string };
  options?: Array<{ message?: string } | undefined>;
}

interface InteractiveFormProps {
  control: Control<LessonFormData>;
  register: UseFormRegister<LessonFormData>;
  errors: FieldErrors<LessonFormData>;
  setValue: UseFormSetValue<LessonFormData>;
}

export function InteractiveForm({ control, register, errors, setValue }: InteractiveFormProps) {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interactiveQuestions"
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t("admin.lessons.form.types.INTERACTIVE") || "Questions Interactives"}
        </h3>
        <Button
          type="button"
          variant="pill-green"
          size="sm"
          onClick={() =>
            append({
              questionText: "",
              imagePaths: [],
              audioPaths: [],
              systemType: "MULTIPLE_CHOICE",
              options: ["", ""],
              correctOptionIndex: 0,
              correctWord: ""
            })
          }
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("admin.lessons.interactive.add_question") || "Ajouter une question"}
        </Button>
      </div>

      {errors.interactiveQuestions?.message && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl border border-red-100 dark:border-red-900/50">
          {errors.interactiveQuestions.message}
        </div>
      )}

      <div className="space-y-8">
        {fields.map((field, index) => (
          <InteractiveQuestionItem
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">
            {t("admin.lessons.no_lessons") || "Aucune question interactive configurée."}
          </p>
        </div>
      )}
    </div>
  );
}

function InteractiveQuestionItem({
  index,
  control,
  register,
  errors,
  setValue,
  onRemove
}: {
  index: number;
  control: Control<LessonFormData>;
  register: UseFormRegister<LessonFormData>;
  errors: FieldErrors<LessonFormData>;
  setValue: UseFormSetValue<LessonFormData>;
  onRemove: () => void;
}) {
  const { t } = useTranslation();
  const [imageUploading, setImageUploading] = useState(false);
  const [audioUploading, setAudioUploading] = useState(false);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const systemType = useWatch({
    control,
    name: `interactiveQuestions.${index}.systemType`
  });

  const correctOptionIndex = useWatch({
    control,
    name: `interactiveQuestions.${index}.correctOptionIndex`
  });

  const imagePaths: string[] = useWatch({
    control,
    name: `interactiveQuestions.${index}.imagePaths`
  }) || [];

  const audioPaths: string[] = useWatch({
    control,
    name: `interactiveQuestions.${index}.audioPaths`
  }) || [];

  const { fields: options, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `interactiveQuestions.${index}.options`
  });

  const playAudio = (path: string) => {
    const audio = new Audio(getAudioUrl(path));
    audio.play().catch((err) => console.error("Audio play failed:", err));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setImageUploading(true);
    try {
      const res = await lessonService.uploadImage(files[0]);
      setValue(`interactiveQuestions.${index}.imagePaths`, [...imagePaths, res.pathFile]);
    } catch (err) {
      console.error(err);
    } finally {
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setAudioUploading(true);
    try {
      const res = await lessonService.uploadAudio(files[0]);
      setValue(`interactiveQuestions.${index}.audioPaths`, [...audioPaths, res.pathFile]);
    } catch (err) {
      console.error(err);
    } finally {
      setAudioUploading(false);
      if (audioInputRef.current) audioInputRef.current.value = "";
    }
  };

  const removeImage = (imgIdx: number) => {
    const updated = imagePaths.filter((_, idx) => idx !== imgIdx);
    setValue(`interactiveQuestions.${index}.imagePaths`, updated);
  };

  const removeAudio = (audIdx: number) => {
    const updated = audioPaths.filter((_, idx) => idx !== audIdx);
    setValue(`interactiveQuestions.${index}.audioPaths`, updated);
  };

  const questionErrors = errors.interactiveQuestions?.[index] as InteractiveQuestionError | undefined;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t("admin.lessons.interactive.questionText") || "Consigne / Question"}
            placeholder="ex: Écoutez l'audio et sélectionnez la bonne réponse..."
            {...register(`interactiveQuestions.${index}.questionText`)}
            error={questionErrors?.questionText?.message}
            required
          />

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 block mb-1">
              Type de question
            </label>
            <Select
              value={systemType || "MULTIPLE_CHOICE"}
              onChange={(val) => setValue(`interactiveQuestions.${index}.systemType`, val as "MULTIPLE_CHOICE" | "OPEN_TEXT")}
              options={[
                { value: "MULTIPLE_CHOICE", label: "Choix multiples (QCM)" },
                { value: "OPEN_TEXT", label: "Saisie de texte libre" }
              ]}
              error={questionErrors?.systemType?.message}
            />
          </div>
        </div>

        {/* Media section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-150 dark:border-gray-800">
          {/* Images upload & list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                Images (Visuals)
              </label>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="pill-brand"
                size="sm"
                className="text-xs py-1"
                disabled={imageUploading}
                onClick={() => imageInputRef.current?.click()}
              >
                {imageUploading ? (
                  <Spinner className="animate-spin w-3 h-3 mr-1" />
                ) : (
                  <Plus className="w-3 h-3 mr-1" />
                )}
                Ajouter une image
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {imagePaths.map((path, imgIdx) => (
                <div
                  key={imgIdx}
                  className="relative group/img aspect-square rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800"
                >
                  <img
                    src={getImageUrl(path)}
                    alt="Uploaded asset"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(imgIdx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {imagePaths.length === 0 && (
                <div className="col-span-4 py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  Aucune image téléversée
                </div>
              )}
            </div>
          </div>

          {/* Audios upload & list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                Audios (Voix)
              </label>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                onChange={handleAudioUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="pill-brand"
                size="sm"
                className="text-xs py-1"
                disabled={audioUploading}
                onClick={() => audioInputRef.current?.click()}
              >
                {audioUploading ? (
                  <Spinner className="animate-spin w-3 h-3 mr-1" />
                ) : (
                  <Plus className="w-3 h-3 mr-1" />
                )}
                Ajouter un audio
              </Button>
            </div>

            <div className="space-y-1.5">
              {audioPaths.map((path, audIdx) => (
                <div
                  key={audIdx}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs"
                >
                  <button
                    type="button"
                    onClick={() => playAudio(path)}
                    className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-800 font-medium"
                  >
                    <PlayIcon className="w-3 h-3" />
                    <span>Audio #{audIdx + 1}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAudio(audIdx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {audioPaths.length === 0 && (
                <div className="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  Aucun audio téléversé
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conditional layouts */}
        {systemType === "MULTIPLE_CHOICE" ? (
          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                Choix multiples (Options)
              </label>
              <Button
                type="button"
                variant="pill-brand"
                size="sm"
                onClick={() => appendOption("")}
                className="text-xs font-medium"
              >
                Ajouter une option
              </Button>
            </div>

            <div className="grid gap-3">
              {options.map((optionField, optIndex) => (
                <div key={optionField.id} className="flex items-start gap-3">
                  <div className="mt-9">
                    <Radio
                      value={optIndex}
                      checked={Number(correctOptionIndex) === optIndex}
                      {...register(`interactiveQuestions.${index}.correctOptionIndex`)}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      label={`Option ${optIndex + 1}`}
                      placeholder={`Option ${optIndex + 1}`}
                      {...register(`interactiveQuestions.${index}.options.${optIndex}`)}
                      error={questionErrors?.options?.[optIndex]?.message}
                    />
                  </div>
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(optIndex)}
                      className="mt-7 p-2 bg-transparent text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {questionErrors?.correctOptionIndex?.message && (
              <p className="text-xs text-red-500 mt-1">{questionErrors.correctOptionIndex.message}</p>
            )}
          </div>
        ) : (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <FormField
              label="Mot correct attendu"
              placeholder="ex: cat"
              {...register(`interactiveQuestions.${index}.correctWord`)}
              error={questionErrors?.correctWord?.message}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
