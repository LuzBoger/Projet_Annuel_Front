import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/global";
import { profileService } from "@/services/profileService";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "@/components/ui/Avatar";
import { FileInput } from '@/components/ui/FileInput';
import { getProfileImageUrl } from "@/lib/utils/image";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Edit, Trash } from "@/assets/icons";

interface ProfileImageUploadProps {
    currentPhotoUrl?: string;
    onUploadSuccess: (newPhotoUrl: string) => void;
    onDeleteSuccess: () => void;
}

export function ProfileImageUpload({ currentPhotoUrl, onUploadSuccess, onDeleteSuccess }: ProfileImageUploadProps) {
    const {t} = useTranslation();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) {
            return;
        }

        if(file.size > MAX_FILE_SIZE) {
            setError(t('profile.image.error.tooLarge'));
            return;
        }

        if(!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError(t('profile.image.error.invalidType'));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setUploading(true);
        setError(null);

        try {
            const res = await profileService.uploadProfileImage(file);
            onUploadSuccess(res.pathFile);
            setPreview(null);
            setError(null);
        } catch {
            setError(t('profile.image.error.uploadFailed'));
            setPreview(null);
        } finally {
            setUploading(false);
        }
    }

    const handleDelete = async () => {
        setConfirmOpen(false);
        setError(null);
        setUploading(true);
        try {
            await profileService.deleteProfileImage();
            setPreview(null);
            onDeleteSuccess();
        } catch {
            setError(t('profile.image.error.deleteFailed'));
        } finally {
            setUploading(false);
        }
    }

    const display = preview || (currentPhotoUrl ? getProfileImageUrl(currentPhotoUrl) : undefined);


    return (
        <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="relative group">
                <Avatar 
                    imageUrl={display ?? undefined} 
                    uploading={uploading} 
                    size="w-48 h-48" 
                />
                
                <Button
                    variant="none"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    <Edit className="w-4 h-4" />
                    {t('profile.image.edit_label')}
                </Button>

                {display && !uploading && (
                     <Button
                        variant="none"
                        onClick={() => setConfirmOpen(true)}
                        className="absolute -top-2 -right-2 p-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors"
                        title={t('profile.image.delete')}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <div className="space-y-2">
                <FileInput ref={fileInputRef} onChange={handleFileChange} />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center lg:text-left">
                    {t('profile.image.requirements')}
                </p>
                {error && (
                    <p className="text-xs text-red-600 dark:text-red-400 text-center lg:text-left font-medium">
                        {error}
                    </p>
                )}
            </div>
            
            <ConfirmModal
                isOpen={confirmOpen}
                title={t("profile.image.confirmDelete.title")}
                description={t("profile.image.confirmDelete.message")}
                confirmText={t("common.delete")}
                cancelText={t("common.cancel")}
                confirmVariant="danger"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
    </div>
    );

}
