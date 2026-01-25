import type {
  CommentReport,
  PostReport,
  ReportData,
  ReportUnion,
} from "../types/report.ts";

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
