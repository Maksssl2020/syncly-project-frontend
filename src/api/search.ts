import axiosConfig from "../config/axiosConfig.ts";
import type { SearchData, SearchRequest } from "../types/search.ts";

export async function fetchTrendingSearches() {
  const response = await axiosConfig.get<SearchData[]>("/search/trending");
  return response.data;
}

export async function handleCreateSearch(data: SearchRequest) {
  const response = await axiosConfig.post("/search/save", data);
  return response.data;
}
