import { useMutation } from "@tanstack/react-query";
import { fetchLinkPreview } from "../../api/linkPreview.ts";

function useFetchLinkPreviewMutation() {
  const { mutateAsync: getLinkPreview, isPending: fetchingLinkPreview } =
    useMutation({
      mutationKey: ["fetchLinkPreviewMutation"],
      mutationFn: (url: string) => fetchLinkPreview(url),
    });

  return { getLinkPreview, fetchingLinkPreview };
}

export default useFetchLinkPreviewMutation;
