import type { UserProfile } from "./userProfile.ts";

export const USER_ROLES = ["ADMIN", "MODERATOR", "REGISTERED"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["ACTIVE", "BLOCKED", "OFFLINE"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export interface UserItem {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  postCount: number;
  createdAt: string;
  lastActive?: string;
  isActive: boolean;
  userProfile: UserProfile;
  mutualFriendsCount: number;
}

export interface UserSearchResult {
  displayName: string;
  username: string;
  bio: string;
  followers: number;
  posts: number;
  avatar: string;
}

export interface Friend {
  id: string;
  username: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen: string;
  mutualFriends: number;
}

export interface FriendSuggest {
  id: string;
  username: string;
  email: string;
  avatar: string;
  mutualFriends: number;
  reason?: string;
}
