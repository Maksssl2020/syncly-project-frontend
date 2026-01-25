export interface ConversationUser {
  id: string;
  username: string;
  avatar: string;
  isActive?: boolean;
}

export interface Conversation {
  id: string;
  participants: ConversationUser[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}

export type SelectedConversation = {
  conversationId?: string | number;
  recipientId?: string | number;
  recipientUsername?: string;
};

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ConversationResponse {
  id: string | number;
  conversationId: string;
  senderUsername: string;
  recipientUsername: string;
  lastMessageContent: string;
  lastMessageTimestamp: string;
  lastMessageSenderId: number;
  senderId: number;
  recipientId: number;
}

export interface ConversationMessage {
  id: number;
  senderUserId: number | string;
  recipientUserId: number | string;
  conversationId: string;
  senderUsername: string;
  recipientUsername: string;
  content: string;
  timestamp: string;
}

export interface ConversationNotification {
  conversationId: string;
  senderUsername: string;
  recipientUsername: string;
  senderUserId: number | string;
  recipientUserId: number | string;
  messageContent: string;
}

export interface ConversationRequest {
  senderUsername: string;
  senderId: string | number;
  recipientUsername: string;
  recipientId: string | number;
  message: string;
}

export interface PresenceMessage {
  username: string;
  status: "online" | "offline";
  timestamp?: string;
}
