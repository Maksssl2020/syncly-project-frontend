import axiosConfig from "../config/axiosConfig.ts";
import type { UserSettings } from "../types/userSettings.ts";

export async function fetchUserSettingsByUserId(userId: string | number) {
  const response = await axiosConfig.get<UserSettings>(
    `/users-settings/${userId}`,
  );
  return response.data;
}
