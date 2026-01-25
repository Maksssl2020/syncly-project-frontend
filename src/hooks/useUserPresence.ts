import { useEffect } from "react";
import { type IMessage, Stomp } from "@stomp/stompjs";
import { usePresenceStore } from "../store/presenceStore.ts";
import type { PresenceMessage } from "../types/conversation.ts";
import SockJS from "sockjs-client";

export function useUserPresence(userId: string | number) {
  const setPresence = usePresenceStore((state) => state.setPresence);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/user/${userId}/status`, (message: IMessage) => {
        const presenceData: PresenceMessage = JSON.parse(message.body);
        setPresence(userId, presenceData);
      });
    });

    return () => {
      client.disconnect();
    };
  }, [setPresence, userId]);
}
