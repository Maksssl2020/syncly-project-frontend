import type { JSX } from "react";
import type { UserItem, UserRole, UserStatus } from "./user.ts";

export interface PageStats {
  title: string;
  value: number | string;
  change: number | string;
  icon: JSX.Element;
  color: string;
}

export interface AdminPanelStats {
  totalUsersCount: number;
  usersChangeFromYesterday: number;
  totalActiveReportsCount: number;
  reportsChangeFromYesterday: number;
  totalMainTagsCount: number;
  tagsChangeFromYesterday: number;
  postsToday: number;
  postsChangeFromYesterday: number;
}

export interface ActivityStats {
  id: string;
  action: ActivityActionType;
  user: string;
  target: string;
  timestamp: string;
  type: ActivityTargetType;
}

export interface UpdateUserAsAdminRequest {
  userId: string | number;
  initialUserData: UserItem;
  updatedUserData: AdminUserFormData;
}

export interface AdminUserFormData {
  role?: UserRole;
  status?: UserStatus;
  bio?: string | undefined;
}

export type ActivityActionType =
  | "created"
  | "promoted"
  | "resolved"
  | "blocked"
  | "deleted"
  | "rejected";

export type ActivityTargetType = "user" | "report" | "tag" | "comment";
