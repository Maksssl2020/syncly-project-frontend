import type { UserProfile } from "./userProfile.ts";

export type UserRole = "ADMIN" | "MODERATOR" | "USER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "INACTIVE";

export interface UserItem {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  postCount: number;
  followersCount: number;
  joinedAt: string;
  lastActive: string;
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
