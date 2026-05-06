import React, { type JSX } from "react";
import type { AdminUser } from "./user.ts";

export type PostModalConfig = {
  title: string;
  icon: React.ElementType;
  color: string;
};

export interface NavigationData {
  title: string;
  link: string;
  icon: JSX.Element;
}

export interface TabData {
  id: string;
  label: string;
  icon?: JSX.Element;
  count?: number;
  color?: string;
}

export interface ToggleOption {
  value: string;
  icon?: JSX.Element;
}

export interface DropdownOption {
  value?: string;
  color?: string;
  label: string;
  onClick?: () => void;
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: number;
}

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
};

export interface CsvColumnsData {
  label: string;
  key: string;
}

export interface AdminUserSortConfig {
  sortBy: keyof AdminUser | undefined;
  sortDirection: "asc" | "desc";
}
