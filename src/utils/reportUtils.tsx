import type {
  CommentReport,
  PostReport,
  ReportData,
  ReportReason,
  ReportStatus,
  ReportType,
  ReportUnion,
} from "../types/report.ts";
import {
  AlertCircle,
  CheckCircle,
  Flag,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";

export function mapToReportType(report: ReportData): ReportUnion {
  switch (report.reportType) {
    case "COMMENT":
      return report as CommentReport;
    case "POST":
      return report as PostReport;
    default:
      return report;
  }
}

export const getReportTypeIcon = (type: ReportType) => {
  switch (type) {
    case "POST":
      return <Flag className="size-4" />;
    case "USER":
      return <User className="size-4" />;
    case "COMMENT":
      return <MessageSquare className="size-4" />;
  }
};

export const getReportStatusIcon = (status: ReportStatus) => {
  switch (status) {
    case "PENDING":
      return <AlertCircle className="size-4" />;
    case "RESOLVED":
      return <CheckCircle className="size-4" />;
    case "REJECTED":
      return <XCircle className="size-4" />;
  }
};

export function getReportStatusColor(status: ReportStatus): string {
  switch (status) {
    case "PENDING":
      return "#f59e0b";
    case "RESOLVED":
      return "#22c55e";
    case "REJECTED":
      return "#ef4444";
    default:
      return "#6b7280";
  }
}

export function getReportTypeColor(type: ReportType): string {
  switch (type) {
    case "POST":
      return "#3b82f6";
    case "USER":
      return "#8b5cf6";
    case "COMMENT":
      return "#14b8a6";
    default:
      return "#6b7280";
  }
}

export function getReportReasonColor(reason: ReportReason): string {
  switch (reason) {
    case "SPAM":
      return "#f97316";
    case "HARASSMENT":
      return "#ef4444";
    case "VIOLENCE":
      return "#b91c1c";
    case "INAPPROPRIATE":
      return "#ec4899";
    case "OTHER":
      return "#6366f1";
    default:
      return "#6366f1";
  }
}
