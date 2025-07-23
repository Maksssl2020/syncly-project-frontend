import { useMutation } from "@tanstack/react-query";
import { fetchLinkPreview } from "../../api/linkPreview.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useFetchLinkPreviewMutation() {
  const { mutateAsync: getLinkPreview, isPending: fetchingLinkPreview } =
    useMutation({
      mutationKey: ["fetchLinkPreviewMutation"],
      mutationFn: (url: string) => fetchLinkPreview(url),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { getLinkPreview, fetchingLinkPreview };
}

export default useFetchLinkPreviewMutation;
