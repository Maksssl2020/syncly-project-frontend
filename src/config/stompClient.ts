import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ConversationMessage, ConversationRequest } from "../types/conversation.ts";

let stompClient: Client | null = null;
let connectedPromise: Promise<Client> | null = null;
let resolveConnected: ((client: Client) => void) | null = null;
let connectedUserUsername: string | null = null;
let messageSubscription: StompSubscription | null = null;
let errorSubscription: StompSubscription | null = null;

// const presenceCallbacks: Set<(presence: PresenceMessage) => void> = new Set();
const messageCallbacks: Set<(message: any) => void> = new Set();

export const connectStomp = (
  token: string,
  username: string,
): Promise<Client> => {
  if (stompClient?.connected) {
    console.log("STOMP already connected");
    return connectedPromise!;
  }

  connectedUserUsername = username;

  connectedPromise = new Promise<Client>((resolve, reject) => {
    resolveConnected = resolve;

    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("https://ns31075468.ip-51-77-53.eu:8443/syncly/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.debug("[STOMP]", str),
      onConnect: () => {
        console.log("✅ Połączono ze STOMP");
        resolveConnected?.(stompClient!);
        initializeSubscriptions();
      },
      onDisconnect: () => {
        console.log("❌ Rozłączono STOMP");
        cleanup();
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message);
        reject(frame);
        cleanup();
      },
      onWebSocketError: (event) => {
        console.error("WebSocket Error:", event);
        reject(event);
        cleanup();
      },
    });

    stompClient.activate();
  });

  return connectedPromise;
};

const initializeSubscriptions = () => {
  if (!stompClient?.connected) return;

  if (messageSubscription) {
    return;
  }

  messageSubscription = stompClient.subscribe(
    `/user/${connectedUserUsername}/queue/messages`,
    (message: IMessage) => {
      const parsed: ConversationMessage = JSON.parse(message.body);
      console.log("📩 Otrzymano wiadomość:", parsed);

      messageCallbacks.forEach((cb) => cb(parsed));
    },
  );

  errorSubscription = stompClient.subscribe("/user/queue/errors", (message) => {
    console.error("🚨 Błąd z serwera:", message.body);
  });
};

const cleanup = () => {
  messageSubscription?.unsubscribe();
  errorSubscription?.unsubscribe();

  messageSubscription = null;
  errorSubscription = null;

  stompClient = null;
  connectedPromise = null;
  resolveConnected = null;
};

export const getStompClient = async (): Promise<Client> => {
  if (stompClient?.connected) {
    return stompClient;
  }
  if (connectedPromise) {
    return connectedPromise;
  }
  throw new Error("STOMP client not initialized - call connectStomp() first");
};

export const disconnectStomp = async (): Promise<void> => {
  if (stompClient) {
    stompClient.reconnectDelay = 0;
    await stompClient.deactivate();
  }

  cleanup();
};

export const sendMessage = async (
  data: ConversationRequest,
): Promise<ConversationMessage> => {
  try {
    const client = await getStompClient();
    const message: ConversationMessage = {
      id: 0,
      senderUserId: data.senderId,
      recipientUserId: data.recipientId,
      conversationId: "0",
      senderUsername: data.senderUsername,
      recipientUsername: data.recipientUsername,
      content: data.message,
      timestamp: new Date().toISOString(),
    };

    await client.publish({
      destination: "/app/conversation",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    return message;
  } catch (error) {
    console.error("Błąd podczas wysyłania wiadomości:", error);
    throw error;
  }
};

export const subscribeToMessages = (
  callback: (message: any) => void,
): (() => void) => {
  messageCallbacks.add(callback);
  return () => messageCallbacks.delete(callback);
};

export const sendPresenceUpdate = async (status: "online" | "offline") => {
  try {
    const client = await getStompClient();
    client.publish({
      destination: "/app/presence",
      body: JSON.stringify({ status, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error("Błąd aktualizacji statusu:", error);
  }
};
