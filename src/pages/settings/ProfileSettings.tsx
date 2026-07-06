import { ProfileImageUpload } from "@/components/profile/ImageUpload";
import { DeleteAccountModal } from "@/components/profile/DeleteModal";
import { MetaData } from "@/components/seo/MetaData";
import { UpdateProfileForm } from "@/components/settings/profile/UpdateProfileForm";
import { EVENT_PROFILE_UPDATED } from "@/constants/event";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { profileService } from "@/services/profileService";
import { useDataProfile } from "@/hooks/useDataProfile";
import { UserProfileResponse } from "@/types/profile/profile";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function ProfileSettings() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { exportData, exportLoading } = useDataProfile();
    const [profile, setProfile] = useState<UserProfileResponse | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleted = () => {
        navigate('/login');
    };


  useEffect(() => {
    profileService
      .getMyProfile()
      .then((data) => setProfile(data))
      .catch(() => setError(t("profile.error.loadFailed")))
      .finally(() => setLoading(false));
  }, [t]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <MetaData title={t('profile.settings.page_title')}  robots="noindex, nofollow"  />
    <div className="max-w-6xl">
      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg border border-green-200 dark:border-green-800 transition-all">
          {t('profile.update.success')}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800 transition-all">
          {error}
        </div>
      )}

      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold dark:text-white">{t('profile.settings.page_title')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('profile.settings.subtitle')}</p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
        <div className="flex-1 w-full lg:max-w-2xl">
          <section>
            <h2 className="text-lg font-semibold mb-6 dark:text-white">{t('profile.info.section_title')}</h2>
            {profile && <UpdateProfileForm
              data={profile}
              onSuccess={() => {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
              }}
            />}
          </section>
        </div>

        <div className="w-full lg:w-64 flex-shrink-0">
          <section>
            <h2 className="text-lg font-semibold mb-6 dark:text-white">{t('profile.image.title')}</h2>
            <ProfileImageUpload
              currentPhotoUrl={profile?.photoUrl}
              onUploadSuccess={(url) => {
                const filename = url.split('/').pop() ?? '';
                setProfile((prev) => prev ? { ...prev, photoUrl: filename } : null);
                globalEvents.emit(EVENT_PROFILE_UPDATED, filename);
              }}
              onDeleteSuccess={async () => {
                setProfile((prev) => prev ? { ...prev, photoUrl: undefined } : null);
                globalEvents.emit(EVENT_PROFILE_UPDATED, '');
              }}
            />
          </section>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
              {t('data.export.title')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('data.export.subtitle')}
          </p>
          <Button
              variant="outline"
              onClick={exportData}
              isLoading={exportLoading}
              disabled={exportLoading}
          >
              {t('data.export.btn')}
          </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-red-200 dark:border-red-900/40">
          <h2 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
              {t('data.danger_zone.title')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('data.danger_zone.subtitle')}
          </p>
          <Button
              variant="pill-red"
              onClick={() => setShowDeleteModal(true)}
              className="whitespace-nowrap"
          >
              {t('data.delete.btn')}
          </Button>
      </div>

      <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={handleDeleted}
      />
    </div>
    </>
  );


}
