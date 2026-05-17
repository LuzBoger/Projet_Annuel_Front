import { WS_BASE_URL } from "@/constants/global";
import { ChallengeNotification } from "@/types/challenges/challenge";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";

export function useChallengeNotificationSocket(accountId: string) {

    const [notif, setNotif] = useState<ChallengeNotification | null>(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: `${WS_BASE_URL}/ws`,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/user/${accountId}/notification/duel`, (message) => {
                    const notification: ChallengeNotification = JSON.parse(message.body);
                    setNotif(notification);
                });
            }

            
        })        
        client.activate();

        return () => {
            client.deactivate();
        }
    }, [accountId]);
    return { notif, clearInvite: () => setNotif(null) };
}