import axiosConfig from "../config/axiosConfig.ts";
import type {
  ReportData,
  ReportRequest,
  ResolveReportRequest,
} from "../types/report.ts";
import { mapToReportType } from "../utils/reportMapperUtils.ts";

export async function fetchAllReports() {
  const response = await axiosConfig.get<ReportData[]>("/reports");
  return response.data.map(mapToReportType);
}

export async function handleCreateReport(data: ReportRequest) {
  const response = await axiosConfig.post("/reports/report", data);
  return response.data;
}

export async function handleResolveReport(data: ResolveReportRequest) {
  const response = await axiosConfig.patch("/reports/resolve", data);
  return response.data;
}
