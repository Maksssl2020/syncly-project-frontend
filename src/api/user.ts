import axiosConfig from "../config/axiosConfig.ts";
import type {
  AdminUser,
  UserItem,
  UserRole,
  UserStatus,
} from "../types/user.ts";
import type { PageResponse } from "../types/types.ts";

export async function fetchAllUsers(
  page: number = 0,
  size: number = 10,
  userRole?: UserRole,
  userStatus?: UserStatus,
  searchQuery?: string,
) {
  const response = await axiosConfig.get<PageResponse<AdminUser>>("/users", {
    params: {
      page,
      size,
      userRole,
      userStatus,
      searchQuery,
    },
  });
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
