export type UserRole = "ADMIN" | "MODERATOR" | "USER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "INACTIVE";

export interface UserItem {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  postCount: number;
  followersCount: number;
  joinedAt: string;
  lastActive: string;
  avatar: string;
  isActive: boolean;
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

export interface FriendRequest {
  id: string;
  type: "sent" | "received";
  user: FriendSuggest;
  createdAt: string;
}
