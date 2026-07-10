import { ChallengeProgress } from "@/types/challenges/challenge";
import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import { WS_BASE_URL } from "@/constants/global";

export function useChallengeSocket(challengeId: string) {
    const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress[]>([]);
    const [isDuelStarted, setIsDuelStarted] = useState(false);



    useEffect(() => {
        if(!challengeId){
            return;
        }
        
        const client = new Client({
            brokerURL: `${WS_BASE_URL}/api/ws`,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/challenge.${challengeId}.progress`, (message) => {
                    const progress: ChallengeProgress = JSON.parse(message.body);
                    setChallengeProgress((prev => {
                        const isProgressExisting = prev.findIndex(user => user.accountId === progress.accountId);
                        if(isProgressExisting >= 0) {
                            const updatedProgress = [...prev];
                            updatedProgress[isProgressExisting] = progress;
                            return updatedProgress;
                        } else {
                            return [...prev, progress];
                        }
                    }));
                });

                client.subscribe(`/topic/challenge.${challengeId}.result`, (message) => {
                    const progress: ChallengeProgress = JSON.parse(message.body);
                    setChallengeProgress((prev) => {
                        const isProgressExisting = prev.findIndex(user => user.accountId === progress.accountId);
                        if(isProgressExisting >= 0) {
                            const updatedProgress = [...prev];
                            updatedProgress[isProgressExisting] = progress;
                            return updatedProgress;
                        } else {
                            return [...prev, progress];
                        }
                    });         
                });

                client.subscribe(`/topic/challenge.${challengeId}.start`, () => {
                    setIsDuelStarted(true);
                });
            }
        })
        client.activate();

        return () => {
            client.deactivate();
        }
    }, [challengeId]);

    return {challengeProgress, isDuelStarted};
}