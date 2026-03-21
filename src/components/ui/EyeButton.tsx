import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "@/assets/icons";

interface EyeButtonProps {
    isVisible: boolean;
    onToggle: () => void;
    className?: string;
}

export function EyeButton({ isVisible, onToggle,className = 'absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors'}: EyeButtonProps) {
    const {t} = useTranslation();
    return (
    <button
        type="button"
        onClick={onToggle}
        className={className}
        aria-label={isVisible ? t('profile.password.hide') : t('profile.password.show')}
    >
        {isVisible ? <EyeOff /> : <Eye />}
    </button>
    );
}
