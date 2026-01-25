import axiosConfig from "../config/axiosConfig.ts";
import type {
  AdminPanelStats,
  UpdateUserAsAdminRequest,
} from "../types/admin.ts";

export async function fetchAdminPanelStatistics() {
  const response = await axiosConfig.get<AdminPanelStats>(
    "/admin/panel/statistics",
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
