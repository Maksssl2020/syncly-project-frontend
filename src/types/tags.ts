export interface MainTag {
  id: string | number;
  name: string;
  description: string;
  postsCount: number;
  followersCount: number;
  trending: boolean;
  category: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface TagsStatistics {
  label: string;
  value: string | number;
}
