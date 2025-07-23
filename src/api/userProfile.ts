import axiosConfig from "../config/axiosConfig.ts";
import type {
  UserProfile,
  UserProfileUpdateRequest,
} from "../types/userProfile.ts";
import { dataURLtoFile } from "../utils/base64Utils.ts";

export async function fetchUserProfileByUserId(userId: string | number) {
  const response = await axiosConfig.get<UserProfile>(
    `/users-profiles/${userId}`,
  );

  console.log(response.data);

  return response.data;
}

export async function handleUploadUserAvatar(
  userId: string | number,
  avatar: string,
) {
  console.log(avatar);

  const blob = dataURLtoFile(avatar, "avatar.jpg");
  const formData = new FormData();
  formData.append("file", blob);

  const response = await axiosConfig.post(
    `/users-profiles/upload/avatar/${userId}`,
    formData,
  );
  return response.data;
}

export async function handleUserProfileDataUpdate(
  data: UserProfileUpdateRequest,
) {
  const { initialData, dataToUpdate, userId } = data;
  const formData = new FormData();

  if (initialData.username !== dataToUpdate.username) {
    formData.append("username", dataToUpdate.username);
  }
  if (initialData.displayName !== dataToUpdate.displayName) {
    formData.append("displayName", initialData.displayName);
  }
  if (initialData.email !== dataToUpdate.email) {
    formData.append("email", dataToUpdate.email);
  }
  if (
    initialData.website !== dataToUpdate.website &&
    dataToUpdate.website !== undefined
  ) {
    formData.append("website", dataToUpdate.website);
  }
  if (initialData.bio !== dataToUpdate.bio && dataToUpdate.bio !== undefined) {
    formData.append("bio", dataToUpdate.bio);
  }
  if (
    initialData.location !== dataToUpdate.location &&
    dataToUpdate.location !== undefined
  ) {
    formData.append("location", dataToUpdate.location);
  }

  console.log(initialData);
  console.log(dataToUpdate);

  const response = await axiosConfig.patch(
    `/users-profiles/update/${userId}`,
    formData,
  );
  return response.data;
}
