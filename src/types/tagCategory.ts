export interface TagCategory {
  id: string | number;
  name: string;
  description: string;
  tagCount: number;
  color: string;
}

export interface TagCategoryRequest {
  name: string;
  description: string;
  color: string;
}
