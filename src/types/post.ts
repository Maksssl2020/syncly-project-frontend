import React from "react";

export interface PostOption {
  type: PostType;
  label: string;
  icon: React.ElementType;
  color: string;
}

export type PostType =
  | "text"
  | "quote"
  | "music"
  | "photo"
  | "video"
  | "link"
  | "chat"
  | "audio";
