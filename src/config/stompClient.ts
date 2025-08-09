import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ConversationRequest } from "../types/conversation.ts";

let stompClient: Client | null = null;

export const connectStomp = (token: string) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    debug: (value) => console.log(value),
    onConnect: () => {
      console.log("Połączono ze STOMP");
      console.log("TERAZ CONNECTED:", stompClient?.connected); // Tutaj będzie true
      subscribeToUserQueue();
      subscribeToUserPresence();
    },
    onDisconnect: () => {
      console.log("❌ Rozłączono STOMP");
    },
    onStompError: (frame) => {
      console.log("STOMP Error: ", frame);
    },
  });

  stompClient.activate();
};

const subscribeToUserQueue = () => {
  if (!stompClient?.connected) return;

  stompClient.subscribe("/user/queue/messages", (message: IMessage) => {
    try {
      const parsed = JSON.parse(message.body);
      console.log("📩 Otrzymano wiadomość:", parsed);
    } catch (e) {
      console.error("Błąd parsowania wiadomości:", e);
    }
  });
};

const subscribeToUserPresence = () => {
  if (!stompClient?.connected) return;

  stompClient.subscribe("/topic/presence", (message: IMessage) => {
    const [username, status] = message.body.split(" is ");
    console.log(message.body);

    console.log(username);
    console.log(status);
  });
};

export const getStompClient = () => {
  if (!stompClient) {
    throw new Error("STOMP client not initialized. Call connectStomp first.");
  }
  return stompClient;
};

export const disconnectStomp = () => {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
  }
};

export function handleSendMessage(data: ConversationRequest) {
  console.log("IS STOMPCLIENT: " + (stompClient !== undefined));
  console.log("IS CONNECTED BEFORE SEND: " + stompClient?.connected);

  if (!stompClient || !stompClient.connected) return;
  console.log("Wysyłam wiadomość:", data);

  stompClient.publish({
    destination: "/app/conversation",
    body: JSON.stringify(data),
  });
}
