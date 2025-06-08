import type { JSX } from "react";

export interface PageStats {
  title: string;
  value: number | string;
  change: number | string;
  icon: JSX.Element;
  color: string;
}

export interface RecentActivityStats {
  id: string;
  action: ActivityActionType;
  user: string;
  target: string;
  timestamp: string;
  type: ActivityTargetType;
}

export type ActivityActionType =
  | "created"
  | "promoted"
  | "resolved"
  | "blocked"
  | "deleted"
  | "rejected";

export type ActivityTargetType = "user" | "report" | "tag" | "comment";
