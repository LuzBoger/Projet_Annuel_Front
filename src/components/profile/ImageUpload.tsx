import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/global";
import { profileService } from "@/services/profileService";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "@/components/ui/Avatar";
import { FileInput } from '@/components/ui/FileInput';
import { Button } from "@/components/ui/Button";
import { getProfileImageUrl } from "@/lib/utils/image";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

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
            <div className="flex flex-col items-center gap-4">
                <Avatar imageUrl={display ?? undefined} uploading={uploading} />
                <div className="flex gap-2">
                    <FileInput ref={fileInputRef} onChange={handleFileChange} />
                      {display ? (
                        <Button
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                            disabled={uploading}
                            variant="danger"
                            size="md"
                        >
                            {t('profile.image.delete')}
                        </Button>
                    ) : (
                <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    variant="primary"
                    size="md"
                >
                    {t('profile.image.upload')}
                </Button>
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

            {error && (
                <div className="w-full max-w-xs p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-gray-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                    {error}
                </p>
                </div>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.image.requirements')}
            </p>
    </div>
    );

}
