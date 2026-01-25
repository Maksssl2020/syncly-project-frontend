import axiosConfig from "../config/axiosConfig.ts";
import type { UserItem } from "../types/user.ts";

export async function fetchAllUsers() {
  const response = await axiosConfig.get<UserItem[]>("/users");
  return response.data;
}

export async function fetchUserById(userId: string | number) {
  const response = await axiosConfig.get(`/users/${userId}`);
  return response.data;
}

export async function fetchUsersByQuery(query: string) {
  if (query === "") return;

  const response = await axiosConfig.get<UserItem[]>(`/users/search`, {
    params: {
      query,
    },
  });
  return response.data;
}
