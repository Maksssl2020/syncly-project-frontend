import type { ConversationMessage } from "../types/conversation.ts";

export const getConversationKey = (
  userId1: string | number,
  userId2: string | number,
) => {
  const [first, second] = [String(userId1), String(userId2)].sort();
  return ["conversation", first, second];
};

export const getConversationId = (
  senderUsername: string,
  recipientUsername: string,
) => {
  console.log(`${senderUsername}_${recipientUsername}`);

  return `${senderUsername}_${recipientUsername}`;
};

export const uniqueMessages = (messages: ConversationMessage[]) => {
  const map = new Map<string, ConversationMessage>();

  messages.forEach((message) => {
    const key = String(
      message.id ??
        `${message.senderUserId}-${message.recipientUserId}-${message.content}-${message.timestamp}`,
    );

    map.set(key, message);
  });

  return Array.from(map.values());
};
