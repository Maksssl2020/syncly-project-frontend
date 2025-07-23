export interface MainTag {
  id: string | number;
  name: string;
  description: string;
  postsCount: number;
  followersCount: number;
  trending: boolean;
  tagCategory: string;
  type: TagType;
  color: string;
  createdAt: string;
}

export type TagType = "MAIN" | "COMMON";

export interface MainTagRequest {
  name: string;
  description: string;
  tagCategoryName: string;
  color: string;
  trending: boolean;
}

export interface Tag {
  id: string | number;
  name: string;
  color: string;
}

export interface TagsStatistics {
  label: string;
  value: string | number;
}
