import { useMutation } from "@tanstack/react-query";
import type { ReportRequest } from "../../types/report.ts";
import { handleCreateReport } from "../../api/report.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useCreateReportMutation(onSuccess?: () => void) {
  const { mutate: createReport, isPending: creatingReport } = useMutation({
    mutationKey: ["createReport"],
    mutationFn: (data: ReportRequest) => handleCreateReport(data),
    onSuccess: () => {
      toast.success("Created report successfully.");
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { createReport, creatingReport };
}

export default useCreateReportMutation;
