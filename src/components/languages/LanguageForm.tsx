import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CreateLanguageRequest, LanguageResponse, UpdateLanguageRequest } from "@/types/language/language";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Cross } from "@/assets/icons";
import { Switch } from "@/components/ui/Switch";
import { PREDEFINED_LANGUAGES } from "@/constants/languages";
import { LanguageFlag } from "@/components/languages/LanguageFlag";

interface LanguageFormProps {
    isOpen: boolean;
    isLoading: boolean;
    language: LanguageResponse | null;
    onCancel: () => void;
    onSubmit: (data: CreateLanguageRequest | UpdateLanguageRequest) => Promise<void>;
}

export function LanguageForm({ isOpen, isLoading, language, onCancel, onSubmit }: LanguageFormProps) {
    const { t } = useTranslation();
    
    // State form
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [orderIndex, setOrderIndex] = useState<number>(0);
    const [isActive, setIsActive] = useState(true);

    const languageOptions = PREDEFINED_LANGUAGES.map(lang => ({
        label: `${lang.name} (${lang.code})`,
        value: lang.code,
    }));

    useEffect(() => {
        if (language) {
            setCode(language.code);
            setName(language.name);
            setOrderIndex(language.orderIndex);
            setIsActive(language.isActive);
        } else {
            setCode("");
            setName("");
            setOrderIndex(0);
            setIsActive(true);
        }
    }, [language, isOpen]);

    const handleLanguageChange = (selectedCode: string) => {
        const predefined = PREDEFINED_LANGUAGES.find(lang => lang.code === selectedCode);
        setCode(selectedCode);
        if (predefined) {
            setName(predefined.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            code,
            name,
            orderIndex,
            isActive
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {language ? t('admin.languages.edit') : t('admin.languages.create')}
                    </h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="ml-auto border-transparent bg-transparent hover:bg-gray-100 px-2 shadow-none text-gray-500"
                    >
                        <span className="sr-only">{t('common.close')}</span>
                        <Cross className="h-5 w-5" />
                    </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <Select
                            label={t('admin.languages.form.code')}
                            options={languageOptions}
                            value={code}
                            onChange={handleLanguageChange}
                            placeholder={t('admin.languages.form.select_placeholder')}
                            required
                        />
                    </div>
                    
                    <div>
                        <FormField
                            type="text"
                            label={t('admin.languages.form.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    {code && (
                        <div className="flex items-center space-x-4 p-3 bg-gray-50 border border-gray-100 rounded-md">
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{t('admin.languages.form.flag_preview')}</span>
                            <div className="flex items-center space-x-2">
                                <LanguageFlag languageCode={code} className="w-8 h-8 rounded shadow-sm object-cover" />
                                <span className="text-gray-900 font-medium">{name}</span>
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <FormField
                            type="number"
                            label={t('admin.languages.form.order')}
                            value={orderIndex}
                            onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700">{t('admin.languages.form.active')}</span>
                        <Switch
                            checked={isActive}
                            onChange={setIsActive}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
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
