import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { WS_BASE_URL } from "@/constants/global";
export function useRankingSocket(target: string, onMessage:() => void) {

    const messageRef = useRef(onMessage);

    useEffect(() => {
        messageRef.current = onMessage;
    });


    useEffect(() => {
        if(!target) {
            return;
        }

        const client = new Client({
            brokerURL: `${WS_BASE_URL}/api/ws`,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(target, () => {
                    messageRef.current();
                });
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [target]);
}