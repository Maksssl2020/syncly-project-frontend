import type { UserItem } from "./user.ts";
import type { PostUnion } from "./post.ts";
import type { Comment } from "./comment.ts";

export type ReportType = "POST" | "USER" | "COMMENT";
export type ReportStatus = "PENDING" | "RESOLVED" | "REJECTED";
export type ReportReason =
  | "SPAM"
  | "HARASSMENT"
  | "INAPPROPRIATE"
  | "VIOLENCE"
  | "OTHER";

export interface ReportRequest {
  entityId: string | number;
  reason: string;
  title: string;
  reportReasonType: ReportReason;
  reportType: ReportType;
}

export interface ReportData {
  id: number | string;
  entityId: string;
  reportedBy: UserItem;
  resolvedBy: UserItem;
  reason: string;
  title: string;
  reportedAt: string;
  resolvedAt: string;
  reportType: ReportType;
  reportStatus: ReportStatus;
  reportReasonType: ReportReason;
}

export interface PostReport extends ReportData {
  post: PostUnion;
  reportType: "POST";
}

export interface CommentReport extends ReportData {
  comment: Comment;
  reportType: "COMMENT";
}

export type ReportUnion = ReportData | CommentReport | PostReport;

export interface ResolveReportRequest {
  reportId: string | number;
  reportStatus: ReportStatus;
}
