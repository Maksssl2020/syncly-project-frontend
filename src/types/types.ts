import type { JSX } from "react";

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
