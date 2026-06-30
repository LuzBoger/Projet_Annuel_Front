import { FormHeaderMode } from "@/types/components/formHeader";
import { useTranslation } from "react-i18next";
import { BadgeTag } from "@/components/ui/BadgeTag";

interface FormHeaderProps {
    mode: FormHeaderMode;
}

export function FormHeader({ mode }: FormHeaderProps) {
    const { t } = useTranslation();

    if (mode === "add") {
        return (
            <BadgeTag color="green">
                {t("reviews.formHeader.add")}
            </BadgeTag>
        );
    }

    return (
        <BadgeTag color="purple">
            {t("reviews.formHeader.edit")}
        </BadgeTag>
    );
}