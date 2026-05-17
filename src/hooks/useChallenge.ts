import { useToast } from "@/hooks/useToast";
import { challengeService } from "@/services/challengeService";
import { Challenge, CreateChallengeRequest, SubmitChallengeRequest } from "@/types/challenges/challenge";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export function useChallenge() {
    const {addToast} = useToast();
    const {t} = useTranslation();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [usersChallenge, setUsersChallenge] = useState<Challenge[]>([]);
    const [publicChallenges, setPublicChallenges] = useState<Challenge[]>([]);
    const [duelPage, setDuelPage] = useState(1);
    const [publicPage, setPublicPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createChallenge = useCallback(async (data: CreateChallengeRequest) => {
      try {
        setLoading(true);
        setError(null);
        const createdChallenge = await challengeService.createChallenge(data);
        setChallenge(createdChallenge);
        return createdChallenge;
      } catch (err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError.response?.data?.message || t('error.createChallenge');
        setError(errorMessage);
        addToast({ type: 'error', message: errorMessage });
      } finally {
        setLoading(false);
      }
    }, [addToast, t]);

    const joinChallenge = useCallback(async (challengeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const joinedChallenge = await challengeService.joinChallenge(challengeId);
            setChallenge(joinedChallenge);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.joinChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const submitScore = useCallback(async(challengeId: string, data: SubmitChallengeRequest) => {
        try {
            setLoading(true);
            setError(null);
            const updatedChallenge = await challengeService.submitChallengeResult(challengeId, data);
            setChallenge(updatedChallenge);
        }
        catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.submitChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchChallenge = useCallback(async (challengeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const fetchedChallenge = await challengeService.getChallenge(challengeId);
            setChallenge(fetchedChallenge);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.fetchChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchUsersChallenges = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const challenges = await challengeService.getUserChallenges();
            setUsersChallenge(challenges);
            setDuelPage(1);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.fetchChallenges');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchPublicChallenges = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const challenges = await challengeService.getPublicChallenges();
            setPublicChallenges(challenges);
            setPublicPage(1);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.fetchPublicChallenges');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const acceptChallenge = useCallback(async (challengeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const acceptedChallenge = await challengeService.acceptChallenge(challengeId);
            setChallenge(acceptedChallenge);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.acceptChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const declineChallenge = useCallback(async (challengeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const declinedChallenge = await challengeService.declineChallenge(challengeId);
            setChallenge(declinedChallenge);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.declineChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const cancelChallenge = useCallback(async (challengeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const cancelledChallenge = await challengeService.cancelChallenge(challengeId);
            setChallenge(cancelledChallenge);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.cancelChallenge');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const getOthersParticipants = useCallback(async (languageId: string) => {
        try {
            setLoading(true);
            setError(null);
            const participants = await challengeService.getOthersParticipants(languageId);
            return participants;
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.fetchParticipants');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            return [];
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
      challenge,
      usersChallenge,
      publicChallenges,
      duelPage,
      setDuelPage,
      publicPage,
      setPublicPage,
      loading,
      error,
      createChallenge,
      joinChallenge,
      submitScore,  
      fetchChallenge,
      fetchUsersChallenges,
      fetchPublicChallenges,
      acceptChallenge,
      declineChallenge,
      cancelChallenge,
      getOthersParticipants
    };
}