import type { AdminTag, AdminTagRequest, CommonTagRequest, Tag, TagUsage } from "../types/tags.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function handleCreateMainTag(data: AdminTagRequest) {
  const response = await axiosConfig.post<void>("/tags/create/main", data);
  return response.data;
}

export async function handleCreateCommonTag(data: CommonTagRequest) {
  const response = await axiosConfig.post<Tag>("/tags/create/common", data);
  return response.data;
}

export async function fetchAllTags() {
  const response = await axiosConfig.get<AdminTag[]>("/tags");
  return response.data;
}

export async function fetchTagByName(tagName: string) {
  const response = await axiosConfig.get<AdminTag>("/tags/tag/by-name", {
    params: {
      tagName,
    },
  });
  return response.data;
}

export async function fetchRelatedTagsByTagCategory(category: string) {
  const response = await axiosConfig.get<AdminTag[]>(
    "/tags/related/by-category",
    {
      params: {
        category,
      },
    },
  );
  return response.data;
}

export async function fetchPopularTags(limit: number) {
  const response = await axiosConfig.get<TagUsage[]>("/tags/popular", {
    params: {
      limit,
    },
  });
  return response.data;
}

export async function fetchTrendingTags(limit: number) {
  const response = await axiosConfig.get<TagUsage[]>("/tags/trending", {
    params: {
      limit,
    },
  });
  return response.data;
}

export async function fetchTagsByQuery(query: string) {
  if (query === "") return;

  const response = await axiosConfig.get<AdminTag[]>(`/tags/search`, {
    params: {
      query,
    },
  });
  return response.data;
}

export async function handleChangeTagCategory(
  tagId: string | number,
  categoryId: string | number,
) {
  const response = await axiosConfig.patch("/tags/change/category", {
    tagId,
    categoryId,
  });
  return response.data;
}
