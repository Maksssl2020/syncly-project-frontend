import type {
  ReportReason,
  ReportStatus,
  ReportType,
} from "../types/report.ts";
import type { UserRole, UserStatus } from "../types/user.ts";

const colors = ["#14b8a6", "#22d3ee", "#0d9488", "#06b6d4"];

export const getTagColor = (index: number) => {
  return colors[index % colors.length];
};

export const getRandomTagColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getActivityColor = (action: string) => {
  switch (action) {
    case "created":
    case "promoted":
    case "resolved":
      return "#22c55e";
    case "blocked":
    case "deleted":
    case "rejected":
      return "#ef4444";
    default:
      return "#14b8a6";
  }
};

export const getUserRoleBadgeColor = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return "#14b8a6";
    case "MODERATOR":
      return "#22d3ee";
    default:
      return "#2c2c2e";
  }
};

export const getUserStatusBadgeColor = (status: UserStatus) => {
  switch (status) {
    case "ACTIVE":
      return "#22c55e";
    case "BLOCKED":
      return "#ef4444";
    case "INACTIVE":
      return "#eab308";
    default:
      return "#2c2c2e";
  }
};

export const getReportStatusColor = (status: ReportStatus) => {
  switch (status) {
    case "PENDING":
      return "#eab308";
    case "RESOLVED":
      return "#22c55e";
    case "REJECTED":
      return "#ef4444";
  }
};

export const getReportReasonColor = (reason: ReportReason) => {
  switch (reason) {
    case "SPAM":
      return "#eab308";
    case "HARASSMENT":
      return "#ef4444";
    case "INAPPROPRIATE":
      return "#ef4444";
    case "VIOLENCE":
      return "#ef4444";
    case "OTHER":
      return "#22c55e";
  }
};

export const getReportTypeColor = (type: ReportType) => {
  return type === "POST" ? "#14b8a6" : type === "USER" ? "#22d3ee" : "#0d9488";
};
