import { ProfileImageUpload } from "@/components/profile/ImageUpload";
import { MetaData } from "@/components/seo/MetaData";
import { UpdateProfileForm } from "@/components/settings/profile/UpdateProfileForm";
import { EVENT_PROFILE_UPDATED } from "@/constants/event";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { profileService } from "@/services/profileService";
import { UserProfileResponse } from "@/types/profile/profile";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ProfileSettings() {
    const {t} = useTranslation();
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


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
    <div className="space-y-8">
      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {t('profile.update.success')}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">{t('profile.image.title')}</h2>
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

      <section>
        <h2 className="text-xl font-semibold mb-4">{t('profile.info.title')}</h2>
        {profile && <UpdateProfileForm
          data={profile}
          onSuccess={() => {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }}
        />}
      </section>
    </div>
    </>
  );


}