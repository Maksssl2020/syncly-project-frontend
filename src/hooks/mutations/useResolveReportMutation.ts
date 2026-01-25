import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResolveReportRequest } from "../../types/report.ts";
import { handleResolveReport } from "../../api/report.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useResolveReportMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: resolveReport, isPending: resolvingReport } = useMutation({
    mutationKey: ["resolveReport"],
    mutationFn: (data: ResolveReportRequest) => handleResolveReport(data),
    onSuccess: () => {
      toast.success("Resolveed report successfully.");
      queryClient.invalidateQueries({
        queryKey: ["reportsData"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { resolveReport, resolvingReport };
}

export default useResolveReportMutation;
