import { useMutation } from "@tanstack/react-query";
import type { SearchRequest } from "../../types/search.ts";
import { handleCreateSearch } from "../../api/search.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useSaveSearchMutation() {
  const { mutate: saveSearch, isPending: savingSearch } = useMutation({
    mutationKey: ["saveSearch"],
    mutationFn: (data: SearchRequest) => handleCreateSearch(data),
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { saveSearch, savingSearch };
}

export default useSaveSearchMutation;
