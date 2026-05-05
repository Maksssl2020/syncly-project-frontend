import type { CsvColumnsData } from "../types/types.ts";

export const activityCsvColumns: CsvColumnsData[] = [
  { label: "ID", key: "id" },
  { label: "User ID", key: "userId" },
  { label: "Username", key: "userUsername" },
  { label: "User Role", key: "userRole" },
  { label: "Action", key: "actionType" },
  { label: "Target Type", key: "targetType" },
  { label: "Target ID", key: "targetId" },
  { label: "Target", key: "target" },
  { label: "Timestamp", key: "timestamp" },
];
