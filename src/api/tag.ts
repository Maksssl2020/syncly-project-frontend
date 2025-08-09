import type { MainTag, MainTagRequest, TagUsage } from "../types/tags.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function handleCreateMainTag(data: MainTagRequest) {
  const response = await axiosConfig.post<void>("/tags/create/main", data);
  return response.data;
}

export async function fetchAllTags() {
  const response = await axiosConfig.get<MainTag[]>("/tags");
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

  const response = await axiosConfig.get<MainTag[]>(`/tags/search`, {
    params: {
      query,
    },
  });
  return response.data;
}
