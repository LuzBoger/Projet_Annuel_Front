import { useTranslation } from "react-i18next";
import { Modal } from "@/components/ui/Modal";
import { DeleteFormData } from "@/components/profile/DeleteFormData";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose(): void;
    onConfirm(password: string): Promise<void>;
}

export function DeleteModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('data.delete.modal_title')}>
            <DeleteFormData onConfirm={onConfirm} onCancel={onClose} />
        </Modal>
    );
}