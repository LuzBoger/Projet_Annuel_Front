import InfoAccountPrivate from "@/components/profile/InfoAccountPrivate";
import { InfoPrivateBanner } from "@/components/profile/InfoPrivateBanner";
import { ProfileLanguageSection } from "@/components/profile/LanguageSection";
import { MetaData } from "@/components/seo/MetaData";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { getProfileImageUrl } from "@/lib/utils/image";
import { profileService } from "@/services/profileService";
import { UserProfileResponse } from "@/types/profile/profile";
import { StreakResponse } from "@/types/profile/streak";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

export  function Profile() {
    const {t} = useTranslation();
    const {userId} = useParams();
    const {user} = useAuth();
    const [languages, setLanguages] = useState<UserLanguageResponse[]>([]);
    const [profile, setProfile] = useState<UserProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [streak, setStreak] = useState<StreakResponse | null>(null);

    const isProfile = !userId || userId === user?.id;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = isProfile ? await profileService.getMyProfile() : await profileService.getUserProfile(userId);
                setProfile(profileData);
                setLanguages(profileData.languages ?? []);
                if(isProfile) {
                  profileService.getStreak().then(setStreak).catch(() => {});
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    const status = err.response?.status;

                    if (status === 403 ) {
                        setIsPrivate(true);
                    } else {
                        setError(t('profile.error.loadFailed'));
                    }
                } else {
                    setError(t('profile.error.loadFailed'));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, isProfile, t]);


    const handleLanguageRemoved = (userLanguageId: string) => {
        setLanguages((prev) => prev.filter((l) => l.id !== userLanguageId));
    };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900 flex justify-center items-center">
        <div className="w-7 h-7 rounded-full border-2 border-[#e8dcc8] border-t-[#c8a97e] animate-spin" />
      </div>
    );
  }

 if (isPrivate) {
    return (
      <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900 flex justify-center items-center px-4">
        <InfoAccountPrivate />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900 flex justify-center items-center px-4">
        <div className="px-6 py-4 bg-[#fcebeb] dark:bg-red-900/20 text-[#791F1F] dark:text-red-400 rounded-xl border border-[#f09595] dark:border-red-800 text-sm">
          {error || t("profile.error.loadFailed")}
        </div>
      </div>
    );
  }

  return (
    <>
    <MetaData title={profile.username} robots="noindex, nofollow"  />
    <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900">
      {isProfile && !profile.isPublic && <InfoPrivateBanner />}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">

          <aside className="w-56 flex-shrink-0 flex flex-col gap-4 sticky top-8">

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-5 py-5 flex flex-col items-center gap-3 text-center">
            <div className="relative inline-block">
                <div className="flex-shrink-0 border-2 border-[#e8dcc8] rounded-full">
                    <Avatar
                        imageUrl={getProfileImageUrl(profile.photoUrl ?? "") ?? undefined}
                        size="w-16 h-16"
                    />
                </div>
                {streak && streak.currentStreak > 0 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        <span>🔥</span>
                        <span>{streak.currentStreak}</span>
                    </div>
                )}
            </div>
              <div className="min-w-0">
                <h1 className="text-[16px] font-medium text-[#3a2e1e] dark:text-white truncate">{profile.username}</h1>
              </div>
              {isProfile && (
                <Link
                  to="/settings"
                  className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg border border-[#c8a97e] dark:border-gray-600 text-[#5a4a2e] dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-[#faf7f2] dark:hover:bg-gray-600 transition-colors"
                >
                  {t("profile.edit")}
                </Link>
              )}
            </div>

            {profile.bio && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-6 py-5">
                <h2 className="text-[10px] font-medium text-[#8a7a60] dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  {t("profile.bio")}
                  <span className="flex-1 h-px bg-[#e8dcc8]" />
                </h2>
                <p className="text-[15px] text-[#3a2e1e] dark:text-gray-300 leading-relaxed font-light">{profile.bio}</p>
              </div>
            )}

          </aside>

          <main className="flex-1 min-w-0 flex flex-col gap-4">
            <ProfileLanguageSection languages={languages} onLanguageRemove={handleLanguageRemoved} />
          </main>

        </div>
      </div>
    </div>
      </>
  );

}
