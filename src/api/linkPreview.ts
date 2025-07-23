import type { LinkPreviewResponse } from "../types/linkPreview.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function fetchLinkPreview(
  url: string,
): Promise<LinkPreviewResponse> {
  const formData = new FormData();
  formData.append("url", url);

  const response = await axiosConfig.post<LinkPreviewResponse>(
    "/site-preview",
    formData,
  );
  return response.data;
}
