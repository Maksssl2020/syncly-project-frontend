import { motion } from "framer-motion";
import type {
  ReportStatus,
  ReportType,
  ReportUnion,
  ResolveReportRequest,
} from "../../types/report.ts";
import {
  getReportReasonColor,
  getReportStatusColor,
  getReportTypeColor,
} from "../../utils/colorUtils.ts";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  Flag,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { format } from "date-fns";

type ReportCardListProps = {
  report: ReportUnion;
  onSelectReport?: (report: ReportUnion) => void;
  onResolveReport: (data: ResolveReportRequest) => void;
  isResolving: boolean;
};

const getReportTypeIcon = (type: ReportType) => {
  switch (type) {
    case "POST":
      return <Flag className="size-5" />;
    case "USER":
      return <User className="size-5" />;
    case "COMMENT":
      return <MessageSquare className="size-5" />;
  }
};

const getStatusIcon = (status: ReportStatus) => {
  switch (status) {
    case "PENDING":
      return <AlertCircle className="size-5" />;
    case "RESOLVED":
      return <CheckCircle className="size-5" />;
    case "REJECTED":
      return <XCircle className="size-5" />;
  }
};

const ReportCardList = ({
  report,
  onSelectReport,
  onResolveReport,
  isResolving,
}: ReportCardListProps) => {
  return (
    <motion.div
      key={report.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        "rounded-lg border-2 p-4 bg-black-200 border-gray-600 border-l-4"
      }
      style={{
        borderLeftColor: getReportStatusColor(report.reportStatus),
      }}
    >
      <div
        className={
          "flex flex-col md:flex-row md:items-center justify-between gap-4"
        }
      >
        <div className={"flex flex-col gap-4 justify-center"}>
          <div className={"flex gap-2"}>
            <h3 className={"text-lg font-bold text-white-100"}>
              {report.title}
            </h3>
            <span
              className={
                "flex items-center gap-2 px-2 py-1 rounded text-xs font-medium text-black-100"
              }
              style={{
                backgroundColor: getReportStatusColor(report.reportStatus),
              }}
            >
              {getStatusIcon(report.reportStatus)}
              <span>{report.reportStatus}</span>
            </span>
            <div
              className={
                "text-sm flex cursor-pointer items-center gap-2 text-black-100 font-medium  px-2 bg-teal-100 rounded-sm"
              }
            >
              Item ID: <span className={"font-bold "}>{report.entityId}</span>
            </div>
          </div>
          <div className={"flex items-center gap-2 mb-2"}>
            <span
              className={
                "flex items-center gap-2 px-2 py-1 rounded text-xs font-medium"
              }
              style={{
                backgroundColor: getReportTypeColor(report.reportType),
                color: "#111111",
              }}
            >
              {getReportTypeIcon(report.reportType)}
              <span>{report.reportType}</span>
            </span>

            <span
              className={
                "flex items-center px-2 py-1 rounded text-xs font-medium text-black-100"
              }
              style={{
                backgroundColor: getReportReasonColor(report.reportReasonType),
              }}
            >
              {report.reason}
            </span>
          </div>
          <div className={"flex items-center gap-2 mt-2"}>
            <div className={"flex items-center gap-2"}>
              <Avatar size={"size-6"} />
              <span className={"text-sm text-gray-400"}>
                Reported by{" "}
                <span className={"text-white-100"}>
                  {report.reportedBy.username}
                </span>
              </span>
            </div>
            <span className={"text-sm text-gray-400"}>
              {format(report.reportedAt, "dd-MM-yyyy HH:mm:ss")}
            </span>
          </div>
        </div>
        <div className={"flex gap-2 items-center"}>
          <AnimatedButton
            bgColor={"#171719"}
            textColor={"#14b8a6"}
            borderColor={"#14b8a6"}
            borderColorHover={"#14b8a6"}
            className={"flex gap-1 py-2 px-3 rounded-lg items-center"}
            onClick={() => onSelectReport?.(report)}
          >
            <Eye className={"size-4"} />
            <span>View</span>
          </AnimatedButton>

          {report.reportStatus === "PENDING" && (
            <>
              <AnimatedButton
                onClick={() => {
                  onResolveReport({
                    reportId: report.id,
                    reportStatus: "RESOLVED",
                  });
                }}
                bgColor={"#171719"}
                bgColorHover={"#22c55e"}
                textColor={"#22c55e"}
                borderColor={"#22c55e"}
                borderColorHover={"#22c55e"}
                textColorHover={"#111111"}
                loading={isResolving}
                className={"flex items-center gap-1 px-3 py-2 rounded-lg"}
              >
                <CheckCircle className={"size-4"} />
                <span>Resolve</span>
              </AnimatedButton>
              <AnimatedButton
                onClick={() => {
                  onResolveReport({
                    reportId: report.id,
                    reportStatus: "REJECTED",
                  });
                }}
                bgColor={"#171719"}
                bgColorHover={"#ef4444"}
                textColor={"#ef4444"}
                borderColor={"#ef4444"}
                borderColorHover={"#ef4444"}
                textColorHover={"#111111"}
                loading={isResolving}
                className={"flex items-center gap-1 px-3 py-2 rounded-lg"}
              >
                <XCircle className={"size-4"} />
                <span>Reject</span>
              </AnimatedButton>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCardList;
