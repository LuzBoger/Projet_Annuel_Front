import { FormHeaderMode } from "@/types/components/formHeader";
import { useTranslation } from "react-i18next";

interface FormHeaderProps {
    mode: FormHeaderMode;
}

export function FormHeader({ mode }: FormHeaderProps) {
    const {t} = useTranslation();

    if(mode === "add") {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-300">
                {t('review.formHeader.add')}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-300">
            {t('review.formHeader.edit')}
        </span>
    );
}