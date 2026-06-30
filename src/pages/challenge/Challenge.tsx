import { MetaData } from "@/components/seo/MetaData";
import { TabChallenge } from "@/components/challenge/TabChallenge";
import { ContentTypeChallenge } from "@/components/challenge/ContentTypeChallenge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useChallenge } from "@/hooks/useChallenge";
import { useChallengeNotificationSocket } from "@/hooks/useChallengeNotificationSocket";
import { getChallengeByPage, getDuel, getTotalChallenge } from "@/lib/utils/challenge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Globe, Swords, Users } from "lucide-react";
import { ChallengeTabs, Tab } from "@/types/components/challengeOption";


export default function Challenge() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('user');

  const {usersChallenge, publicChallenges, loading, fetchUsersChallenges, fetchPublicChallenges, acceptChallenge, declineChallenge, duelPage, setDuelPage, publicPage, setPublicPage} = useChallenge();

  const { notif, clearInvite } = useChallengeNotificationSocket(user?.id ?? '');
  const duel = getDuel(usersChallenge, user?.id ?? '');

  const pendingDuelId = duel?.id ?? notif?.challengeId ?? null;
  const pendingDuelTitle = duel?.title ?? notif?.lessonTitle ?? '';
  const pendingDuelChallenger = duel?.challenger.username ?? notif?.username ?? '';
  const showDuelTab = duel !== null || notif !== null;

  useEffect(() => {
    fetchUsersChallenges();
    fetchPublicChallenges();
  }, [fetchUsersChallenges, fetchPublicChallenges]);

  useEffect(() => {
    if (notif) {
      fetchUsersChallenges();
    }
  }, [notif, fetchUsersChallenges]);

  const pagedDuels = getChallengeByPage(usersChallenge, duelPage);
  const pagedPublic = getChallengeByPage(publicChallenges, publicPage);

  const tabs: ChallengeTabs[] = [
    {
      key: 'user',
      label: t('challenge.user.my_challenges'),
      icon: <Users className="w-4 h-4" />,
      count: usersChallenge.length || undefined,
    },
    {
      key: 'public',
      label: t('challenge.public.challenges'),
      icon: <Globe className="w-4 h-4" />,
      count: publicChallenges.length || undefined,
    },
    ...(showDuelTab ? [{
      key: 'duel' as Tab,
      label: t('challenge.duel.pending'),
      icon: <Swords className="w-4 h-4" />,
      count: 1,
    }] : []),
  ];

  return (
    <>
      <MetaData title={t('challenge.title')} robots={"noindex, nofollow"} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('challenge.title')}
          </h1>
          <Button onClick={() => navigate('/challenges/new')} variant="primary">
            {t('challenge.create_title')}
          </Button>
        </div>

        <TabChallenge tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'user' && (
          <section>
            <ContentTypeChallenge
              loading={loading}
              challenges={usersChallenge}
              allTypeChallenges={pagedDuels}
              icon={<Users className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />}
              message={t('challenge.user.empty')}
              currentPage={duelPage}
              totalPages={getTotalChallenge(usersChallenge)}
              onPrev={() => setDuelPage(p => p - 1)}
              onNext={() => setDuelPage(p => p + 1)}
              onClick={(id) => navigate(`/challenges/${id}`)}
            />
          </section>
        )}

        {activeTab === 'public' && (
          <section>
            <ContentTypeChallenge
              loading={loading}
              challenges={publicChallenges}
              allTypeChallenges={pagedPublic}
              icon={<Globe className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />}
              message={t('challenge.public.empty')}
              currentPage={publicPage}
              totalPages={getTotalChallenge(publicChallenges)}
              onPrev={() => setPublicPage(p => p - 1)}
              onNext={() => setPublicPage(p => p + 1)}
              onClick={(id) => navigate(`/challenges/${id}`)}
            />
          </section>
        )}

        {activeTab === 'duel' && pendingDuelId && (
          <section>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-yellow-400/40 dark:border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.08)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white text-lg">{pendingDuelTitle}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-yellow-500" />
                  {t('challenge.duel.challenged_by', { username: pendingDuelChallenger })}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="primary"
                  onClick={() => acceptChallenge(pendingDuelId).then(() => { clearInvite(); navigate(`/challenges/${pendingDuelId}`); })}
                >
                  {t('challenge.details.accept')}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => declineChallenge(pendingDuelId).then(() => { clearInvite(); setActiveTab('user'); fetchUsersChallenges(); })}
                >
                  {t('challenge.details.decline')}
                </Button>
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  );
}
