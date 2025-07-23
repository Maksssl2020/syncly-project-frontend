export interface MediaRequest {
  url?: string;
  mediaFile?: File;
  mediaType: MediaType;
}

export type MediaType = "IMAGE" | "VIDEO" | "AUDIO";
