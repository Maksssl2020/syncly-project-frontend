export type ReportType = "POST" | "USER" | "COMMENT";
export type ReportStatus = "PENDING" | "RESOLVED" | "REJECTED";
export type ReportReason =
  | "SPAM"
  | "HARASSMENT"
  | "INAPPROPRIATE"
  | "VIOLENCE"
  | "OTHER";

export interface Report {
  id: string;
  type: ReportType;
  targetId: string;
  targetTitle: string;
  targetContent: string;
  targetImage?: string;
  reportedBy: {
    id: string;
    username: string;
    avatar: string;
  };
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: {
    id: string;
    username: string;
  };
}
