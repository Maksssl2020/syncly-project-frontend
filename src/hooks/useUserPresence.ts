import { useEffect, useState } from "react";
import { getStompClient } from "../config/stompClient.ts";

export function useUserPresence(userId: string | number) {
  const [presence, setPresence] = useState<{
    online: boolean;
    lastSeen: string;
  }>({ online: false, lastSeen: new Date().toISOString() });

  console.log(userId);

  useEffect(() => {
    const stompClient = getStompClient();
    const subscription = stompClient.subscribe(
      `/topic/user/${userId}/status`,
      (message) => {
        console.log(message.body);
        setPresence(JSON.parse(message.body));
      },
    );

    return () => subscription.unsubscribe();
  }, [userId]);

  return presence;
}
