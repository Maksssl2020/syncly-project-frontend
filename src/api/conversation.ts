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

export async function fetchConversation(
  recipientId: number | string,
  page: number = 0,
  size: number = 20,
) {
  const response = await axiosConfig.get<{
    content: ConversationMessage[];
    totalElements: number;
    totalPages: number;
    number: number; // current page
  }>(`conversation/messages/by-user-ids/${recipientId}`, {
    params: { page, size },
  });
  return response.data;
}
