import type { Image } from "./image.ts";

export interface UserProfile {
  displayName: string;
  userProfileId: string;
  username: string;
  email: string;
  followersCount: number;
  followingCount: number;
  profileLikes: number;
  joinedAt: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar?: Image;
}

export interface UserProfileDataToUpdate {
  username: string;
  email: string;
  bio?: string;
  website?: string;
  location?: string;
  displayName: string;
}

export interface UserProfileUpdateRequest {
  userId: string | number;
  initialData: UserProfileDataToUpdate;
  dataToUpdate: UserProfileDataToUpdate;
}
