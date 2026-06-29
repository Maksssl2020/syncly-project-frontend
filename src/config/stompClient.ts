import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  ConversationMessage,
  ConversationRequest,
} from "../types/conversation.ts";

let stompClient: Client | null = null;
let connectedPromise: Promise<Client> | null = null;
let resolveConnected: ((client: Client) => void) | null = null;
let messageSubscription: StompSubscription | null = null;
let errorSubscription: StompSubscription | null = null;

const messageCallbacks: Set<(message: any) => void> = new Set();

export const connectStomp = (
  token: string,
  username: string,
): Promise<Client> => {
  if (stompClient?.connected || stompClient?.active) {
    console.log("STOMP already connected");
    return connectedPromise!;
  }

  connectedPromise = new Promise<Client>((resolve, reject) => {
    resolveConnected = resolve;

    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(
          `https://ns31075468.ip-51-77-53.eu:8443/syncly/ws?token=${encodeURIComponent(token)}`,
          // `http://localhost:8080/ws?token=${encodeURIComponent(token)}`,
        ),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.debug("[STOMP]", str),
      onConnect: () => {
        console.log("✅ Połączono ze STOMP jako:", username);
        resolveConnected?.(stompClient!);
        initializeSubscriptions();
      },
      onDisconnect: () => {
        console.log("❌ Rozłączono STOMP");
        // cleanup();
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message);
        reject(frame);
        // cleanup();
      },
      onWebSocketError: (event) => {
        console.error("WebSocket Error:", event);
        reject(event);
        // cleanup();
      },
    });

    stompClient.activate();
  });

  return connectedPromise;
};

const initializeSubscriptions = () => {
  console.log("INIT SUBSCRIPTIONS");
  console.log("connected:", stompClient?.connected);
  console.log("messageSubscription:", messageSubscription);

  if (!stompClient?.connected) {
    console.log("NOT CONNECTED");
    return;
  }

  if (!messageSubscription) {
    console.log("SUBSCRIBING NOW");

    messageSubscription = stompClient.subscribe(
      "/user/queue/messages",
      (message: IMessage) => {
        console.log("RAW MESSAGE:", message);

        const parsed: ConversationMessage = JSON.parse(message.body);

        console.log("PARSED MESSAGE:", parsed);

        messageCallbacks.forEach((cb) => cb(parsed));
      },
    );

    console.log("SUBSCRIBED:", messageSubscription);
  }

  if (!errorSubscription) {
    errorSubscription = stompClient.subscribe(
      "/user/queue/errors",
      (message) => {
        console.error("Error from server:", message.body);
      },
    );
  }
};

const cleanup = () => {
  messageSubscription?.unsubscribe();
  errorSubscription?.unsubscribe();

  messageSubscription = null;
  errorSubscription = null;

  stompClient = null;
  connectedPromise = null;
  resolveConnected = null;

  messageCallbacks.clear();
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

    client.publish({
      destination: "/app/conversation",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    return {
      id: 0,
      senderUserId: data.senderId,
      recipientUserId: data.recipientId,
      conversationId: "0",
      senderUsername: data.senderUsername,
      recipientUsername: data.recipientUsername,
      content: data.message,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error during sending the message:", error);
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
    console.error("Error during status update: ", error);
  }
};
