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
}
