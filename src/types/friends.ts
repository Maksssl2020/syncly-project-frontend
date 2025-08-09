import type { UserItem } from "./user.ts";

export interface FriendRequest {
  id: string | number;
  requester: UserItem;
  receiver: UserItem;
  status: FriendStatus;
  createdAt: string;
}

export interface FriendUser {
  user: UserItem;
  mutualFriendsCount: number;
}

export type FriendStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "BLOCKED";
