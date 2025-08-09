import type {
  ConversationMessage,
  ConversationResponse,
} from "../types/conversation.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function fetchAllConversationsByUser() {
  const response =
    await axiosConfig.get<ConversationResponse[]>("/conversations");
  return response.data;
}

export async function fetchConversation(recipientId: number | string) {
  const response = await axiosConfig.get<ConversationMessage[]>(
    `conversation/messages/by-user-ids/${recipientId}`,
  );
  return response.data;
}
