import { useTranslation } from "react-i18next";
import { CreateLanguageRequest, LanguageResponse, UpdateLanguageRequest } from "@/types/language/language";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Cross } from "@/assets/icons";
import { Switch } from "@/components/ui/Switch";
import { PREDEFINED_LANGUAGES } from "@/constants/languages";
import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { createLanguageSchema, type CreateLanguageFormData } from "@/validations/languages/createLanguageSchema";
import { updateLanguageSchema, type UpdateLanguageFormData } from "@/validations/languages/updateLanguageSchema";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

interface LanguageFormProps {
    isOpen: boolean;
    isLoading: boolean;
    language: LanguageResponse | null;
    onCancel: () => void;
    onSubmit: (data: CreateLanguageRequest | UpdateLanguageRequest) => Promise<void>;
}

export function LanguageForm({ isOpen, isLoading, language, onCancel, onSubmit }: LanguageFormProps) {
    const { t } = useTranslation();
    const isEditLanguage = !!language;

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<CreateLanguageFormData | UpdateLanguageFormData>({
        resolver: yupResolver(isEditLanguage ? updateLanguageSchema(t) : createLanguageSchema(t)),
        defaultValues: {
            code: "",
            name: "",
            orderIndex: 0,
            isActive: true,
        }
    });

    const code = useWatch({ control, name: "code" });
    const name = useWatch({ control, name: "name" });
    const isActive = useWatch({ control, name: "isActive" });

    useEffect(() => {
        if (language) {
            reset({
                code: language.code,
                name: language.name,
                orderIndex: language.orderIndex,
                isActive: language.isActive,
            });
        } else {
            reset({
                code: "",
                name: "",
                orderIndex: 0,
                isActive: true,
            });
        }
    }, [language, reset]);

    const languageOptions = PREDEFINED_LANGUAGES.map(lang => ({
        label: `${lang.name} (${lang.code})`,
        value: lang.code,
    }));

    const handleLanguageChange = (selectedCode: string) => {
        const predefined = PREDEFINED_LANGUAGES.find(lang => lang.code === selectedCode);
        setValue("code", selectedCode);
        if (predefined) {
            setValue("name", predefined.name);
        }
    };

    const onFormSubmit = async (data: CreateLanguageFormData | UpdateLanguageFormData) => {
        await onSubmit({
            code: data.code,
            name: data.name,
            orderIndex: data.orderIndex,
            isActive: data.isActive,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {language ? t('admin.languages.edit') : t('admin.languages.create')}
                    </h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="ml-auto border-transparent bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 px-2 shadow-none text-gray-500 dark:text-gray-400"
                    >
                        <span className="sr-only">{t('common.close')}</span>
                        <Cross className="h-5 w-5" />
                    </Button>
                </div>
                
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 space-y-4">
                    <div>
                        <Select
                            label={t('admin.languages.form.code')}
                            options={languageOptions}
                            value={code}
                            onChange={handleLanguageChange}
                            placeholder={t('admin.languages.form.select_placeholder')}
                            required
                            error={errors.code?.message}
                        />
                    </div>
                    
                    <div>
                        <FormField
                            type="text"
                            label={t('admin.languages.form.name')}
                            {...register("name")}
                            required
                            error={errors.name?.message}
                        />
                    </div>
                    
                    {code && (
                        <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-md">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('admin.languages.form.flag_preview')}</span>
                            <div className="flex items-center space-x-2">
                                <LanguageFlag languageCode={code} className="w-8 h-8 rounded shadow-sm object-cover" />
                                <span className="text-gray-900 dark:text-white font-medium">{name}</span>
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <FormField
                            type="number"
                            label={t('admin.languages.form.order')}
                            {...register("orderIndex")}
                            required
                            error={errors.orderIndex?.message}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.languages.form.active')}</span>
                        <Switch
                            checked={isActive}
                            onChange={(val) => setValue("isActive", val)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isLoading}>
                            {t('common.save')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
