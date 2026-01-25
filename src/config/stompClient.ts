import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  ConversationMessage,
  ConversationRequest,
} from "../types/conversation.ts";

let stompClient: Client | null = null;
let connectedPromise: Promise<Client> | null = null;
let resolveConnected: ((client: Client) => void) | null = null;
let connectedUserUsername: string | null = null;

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
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
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

  stompClient.subscribe(
    `/user/${connectedUserUsername}/queue/messages`,
    (message: IMessage) => {
      try {
        const parsed: ConversationMessage = JSON.parse(message.body);
        console.log("📩 Otrzymano wiadomość:", parsed);

        // Powiadom wszystkich subskrybentów
        messageCallbacks.forEach((cb) => cb(parsed));

        // Dodatkowo powiadom o wiadomościach wysłanych przez siebie
        if (parsed.senderUsername === connectedUserUsername) {
          messageCallbacks.forEach((cb) => cb(parsed));
        }
      } catch (e) {
        console.error("Błąd parsowania wiadomości:", e);
      }
    },
  );

  stompClient.subscribe("/user/queue/errors", (message: IMessage) => {
    console.error("🚨 Błąd z serwera:", message.body);
  });
};

const cleanup = () => {
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

export const disconnectStomp = (): void => {
  if (stompClient?.connected) {
    stompClient.deactivate().then(() => {
      console.log("STOMP client deactivated");
      cleanup();
    });
  }
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

    messageCallbacks.forEach((cb) => cb(message));

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
