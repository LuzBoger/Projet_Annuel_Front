import { LessonSessionTable } from "@/components/lessonSession/LessonSessionTable";
import InfoAccountPrivate from "@/components/profile/InfoAccountPrivate";
import { InfoPrivateBanner } from "@/components/profile/InfoPrivateBanner";
import { ProfileLanguageSection } from "@/components/profile/LanguageSection";
import { MetaData } from "@/components/seo/MetaData";
import { Avatar } from "@/components/ui/Avatar";
import { FriendsModal } from "@/components/friends/FriendsModal";
import { useAuth } from "@/hooks/useAuth";
import { getProfileImageUrl } from "@/lib/utils/image";
import { profileService } from "@/services/profileService";
import { aiService } from "@/services/aiService";
import { friendsService } from "@/services/friendsService";
import { FriendshipStatus } from "@/types/friends/friends";
import { UserProfileResponse } from "@/types/profile/profile";
import { StreakResponse } from "@/types/profile/streak";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { AIQuotaResponse } from "@/types/ai/ai";
import { RoleEnum } from "@/types/enum/roles";
import { isAxiosError } from "axios";
import { Users, UserPlus, UserCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/useToast";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { FRIENDS_STATUS_COLORS } from "@/constants/colors";
import { FRIENDS_STATUS_TITLE } from "@/constants/friends";

export function Profile() {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const { userId } = useParams();
    const { user } = useAuth();
    const [languages, setLanguages] = useState<UserLanguageResponse[]>([]);
    const [profile, setProfile] = useState<UserProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [streak, setStreak] = useState<StreakResponse | null>(null);
    const [aiQuota, setAiQuota] = useState<AIQuotaResponse | null>(null);
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>('NONE');
    const [friendRequestId, setFriendRequestId] = useState<string | undefined>(undefined);
    const [sendingRequest, setSendingRequest] = useState(false);

    const isProfile = !userId || userId === user?.id;

    useEffect(() => {
        if (isProfile) {
            aiService.getQuota()
                .then((data) => setAiQuota(data))
                .catch(() => {});
        }
    }, [isProfile]);

    useEffect(() => {
        if (profile && !isProfile) {
            setFriendshipStatus((profile.friendsViewStatus as FriendshipStatus) ?? 'NONE');
            setFriendRequestId(profile.friendRequestId ?? undefined);
        }
    }, [profile, isProfile]);

    const handleAddFriend = () => {
        if (!userId || sendingRequest) return;
        setSendingRequest(true);
        friendsService.sendFriendRequest(userId)
            .then((result) => {
                setFriendshipStatus('PENDING_SENT');
                setFriendRequestId(result.id);
            })
            .finally(() => {
                setSendingRequest(false);
            });
    };

    const handleCancelRequest = () => {
        if (!friendRequestId || sendingRequest) return;
        setSendingRequest(true);
        friendsService.cancelFriendRequest(friendRequestId)
            .then(() => {
                setFriendshipStatus('NONE');
                setFriendRequestId(undefined);
                addToast({ type: 'success', message: t('friends.cancelRequest.success') });
            })
            .finally(() => setSendingRequest(false));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = isProfile
                    ? await profileService.getMyProfile()
                    : await profileService.getUserProfile(userId);
                setProfile(profileData);
                setLanguages(profileData.languages ?? []);
                if (isProfile) {
                    profileService.getStreak().then(setStreak).catch(() => {});
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    setError(t('profile.error.loadFailed'));
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

    const friendButton = (
        <Button
            onClick={friendshipStatus === 'NONE' ? handleAddFriend : friendshipStatus === 'PENDING_SENT' ? handleCancelRequest : undefined}
            variant="none"
            disabled={sendingRequest || (friendshipStatus !== 'NONE' && friendshipStatus !== 'PENDING_SENT')}
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 transition-colors ${FRIENDS_STATUS_COLORS[friendshipStatus]}`}
            title={t(FRIENDS_STATUS_TITLE[friendshipStatus])}
        >
            {friendshipStatus === 'NONE' && <UserPlus className="w-3 h-3" />}
            {friendshipStatus === 'PENDING_SENT' && <Clock className="w-3 h-3" />}
            {friendshipStatus === 'PENDING_RECEIVED' && <UserPlus className="w-3 h-3" />}
            {friendshipStatus === 'ACCEPTED' && <UserCheck className="w-3 h-3" />}
        </Button>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900 flex justify-center items-center">
                <div className="w-7 h-7 rounded-full border-2 border-[#e8dcc8] border-t-[#c8a97e] animate-spin" />
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

    if (!isProfile && profile.isAccountPrivate) {
        return (
            <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900 flex flex-col items-center justify-center gap-4 px-4">
                <div className="relative inline-block">
                    <div className="flex-shrink-0 border-2 border-[#e8dcc8] rounded-full">
                        <Avatar imageUrl={getProfileImageUrl(profile.photoUrl ?? '') ?? undefined} size="w-20 h-20" />
                    </div>
                    {friendshipStatus !== 'ACCEPTED' && friendButton}
                </div>
                <h1 className="text-lg font-semibold text-[#3a2e1e] dark:text-white">{profile.username}</h1>
                <InfoAccountPrivate />
            </div>
        );
    }

    return (
        <>
            <MetaData title={profile.username} robots="noindex, nofollow" />
            <div className="min-h-screen bg-[#faf7f2] dark:bg-gray-900">
                {isProfile && !profile.isPublic && <InfoPrivateBanner />}

                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">

                        <aside className="w-full md:w-56 flex-shrink-0 flex flex-col gap-4 md:sticky md:top-8">

                            <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-5 py-5 flex flex-col items-center gap-3 text-center">
                                {isProfile && (
                                    <Button
                                        onClick={() => setFriendsOpen(true)}
                                        variant="none"
                                        className="absolute top-3 right-3 p-1.5 rounded-lg text-[#8a7a60] dark:text-gray-400 hover:bg-[#f5ede0] dark:hover:bg-gray-700 transition-colors"
                                        title={t('friends.manage')}
                                    >
                                        <Users className="w-4 h-4" />
                                    </Button>
                                )}
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
                                    {!isProfile && friendshipStatus !== 'ACCEPTED' && friendButton}
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

                            {isProfile && aiQuota && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-6 py-5 flex flex-col gap-3">
                                    <h2 className="text-[10px] font-medium text-[#8a7a60] dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        {t("profile.ai_quota.title")}
                                        <span className="flex-1 h-px bg-[#e8dcc8] dark:bg-[#e8dcc8]" />
                                    </h2>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-[#3a2e1e] dark:text-gray-300">
                                            <span className="font-medium">{t("profile.ai_quota.usage")}</span>
                                            <span className="font-semibold">{aiQuota.currentUsage} / {aiQuota.maxQuota}</span>
                                        </div>
                                        
                                        <div className="w-full bg-[#faf7f2] dark:bg-gray-900 rounded-full h-2.5 overflow-hidden border border-[#e8dcc8]/40 dark:border-gray-700">
                                            <div 
                                                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500" 
                                                style={{ width: `${Math.min(100, Math.round((aiQuota.currentUsage / aiQuota.maxQuota) * 100))}%` }}
                                            />
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-[#8a7a60] dark:text-gray-400 leading-normal">
                                        {t("profile.ai_quota.renews_on", { date: new Date(aiQuota.periodEnd).toLocaleDateString() })}
                                    </p>
                                </div>
                            )}

                        </aside>

                        <main className="flex-1 min-w-0 flex flex-col gap-6">

                            <section className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-6 py-5 space-y-4">
                                <h2 className="text-[10px] font-medium text-[#8a7a60] dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    {t("profile.languageSection.learningLanguages")}
                                    <span className="flex-1 h-px bg-[#e8dcc8] dark:bg-gray-700" />
                                </h2>
                                <ProfileLanguageSection languages={languages} onLanguageRemove={handleLanguageRemoved} isProfileOwner={isProfile} />
                            </section>

                            {((isProfile && user?.role !== RoleEnum.ADMIN) || (!isProfile && !profile.isAccountPrivate)) && (
                                <LessonSessionTable userId={isProfile ? undefined : userId} />
                            )}

                        </main>

                    </div>
                </div>
            </div>
            <FriendsModal isOpen={friendsOpen} onClose={() => setFriendsOpen(false)} />
        </>
    );
}
