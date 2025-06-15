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
