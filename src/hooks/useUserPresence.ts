import { useEffect } from "react";
import { type IMessage, type StompSubscription } from "@stomp/stompjs";
import { usePresenceStore } from "../store/presenceStore.ts";
import type { PresenceMessage } from "../types/conversation.ts";
import { getStompClient } from "../config/stompClient.ts";

export function useUserPresence(userId: string | number) {
  const setPresence = usePresenceStore((state) => state.setPresence);

  useEffect(() => {
    if (!userId) return;

    let subscription: StompSubscription | null = null;
    let active = true;

    getStompClient()
      .then((client) => {
        if (!active || !client.connected) return;

        subscription = client.subscribe(
          `/topic/user/${userId}/status`,
          (message: IMessage) => {
            const presenceData: PresenceMessage = JSON.parse(message.body);
            setPresence(userId, presenceData);
          },
        );
      })
      .catch((error) => {
        console.error("Presence subscription error:", error);
      });

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, [setPresence, userId]);
}
