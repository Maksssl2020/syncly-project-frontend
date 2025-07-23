import { useMutation } from "@tanstack/react-query";
import { handleCheckPostCollectionExists } from "../../api/postCollection.ts";
import useAuthentication from "../useAuthentication.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useCheckPostCollectionExistsMutation() {
  const { userId } = useAuthentication();

  const {
    mutateAsync: checkPostCollectionExists,
    isPending: checkingPostCollectionExists,
  } = useMutation({
    mutationKey: ["checkPostCollectionExists"],
    mutationFn: async (title: string) => {
      if (userId) {
        return await handleCheckPostCollectionExists(userId, title);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { checkPostCollectionExists, checkingPostCollectionExists };
}

export default useCheckPostCollectionExistsMutation;
