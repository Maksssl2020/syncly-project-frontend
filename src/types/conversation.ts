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
  senderUserId: number;
  recipientUserId: number;
  conversationId: string;
  senderUsername: string;
  recipientUsername: string;
  content: string;
  timestamp: string;
}

export interface ConversationRequest {
  senderUsername: string;
  recipientUsername: string;
  message: string;
}
