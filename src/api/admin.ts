import axiosConfig from "../config/axiosConfig.ts";
import type {
  ActivityActionType,
  ActivityStats,
  ActivityTargetType,
  AdminPanelStats,
  UpdateUserAsAdminRequest,
} from "../types/admin.ts";
import type { PageResponse } from "../types/types.ts";

export async function fetchAdminPanelStatistics() {
  const response = await axiosConfig.get<AdminPanelStats>(
    "/admin/panel/statistics",
  );
  return response.data;
}

export async function fetchAdminMostRecentActivityData() {
  const response = await axiosConfig.get<ActivityStats[]>(
    "/admin/activity/most-recent",
  );

  return response.data;
}

export async function fetchAdminActivityData(
  page: number = 0,
  size: number = 10,
  sortOption: "RECENT" | "OLDEST" = "RECENT",
  actionType?: ActivityActionType,
  targetType?: ActivityTargetType,
  searchQuery?: string,
) {
  const response = await axiosConfig.get<PageResponse<ActivityStats>>(
    "/admin/activity/all",
    {
      params: {
        page,
        size,
        sortOption,
        actionType,
        targetType,
        searchQuery,
      },
    },
  );
  return response.data;
}

export async function handleUpdateUserAsAdmin(data: UpdateUserAsAdminRequest) {
  const { userId, updatedUserData, initialUserData } = data;
  const formData = new FormData();

  if (
    updatedUserData.bio &&
    updatedUserData.bio !== initialUserData.userProfile.bio
  ) {
    formData.append("bio", updatedUserData.bio);
  }
  if (updatedUserData.role && updatedUserData.role !== initialUserData.role) {
    formData.append("userRole", updatedUserData.role);
  }
  if (
    updatedUserData.status === "BLOCKED" &&
    updatedUserData.status !== initialUserData.status
  ) {
    formData.append("userStatus", updatedUserData.status);
  }

  const response = await axiosConfig.patch(
    `/admin/user/update/${userId}`,
    formData,
  );
  return response.data;
}
