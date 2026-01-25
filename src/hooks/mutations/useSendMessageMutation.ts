import { useMutation } from "@tanstack/react-query";
import type { ConversationRequest } from "../../types/conversation.ts";
import { sendMessage } from "../../config/stompClient.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useSendMessageMutation() {
  const { mutateAsync: sendMessageMutation, isPending: sendingMessage } =
    useMutation({
      mutationKey: ["sendMessage"],
      mutationFn: (data: ConversationRequest) => sendMessage(data),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { sendMessageMutation, sendingMessage };
}

export default useSendMessageMutation;
