import { motion } from "framer-motion";
import type { ReportUnion, ResolveReportRequest } from "../../types/report.ts";
import { getReportReasonColor, getReportStatusColor, getReportTypeColor } from "../../utils/colorUtils.ts";
import { CheckCircle, Clock, Eye, Hash, XCircle } from "lucide-react";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { format } from "date-fns";
import { getReportStatusIcon, getReportTypeIcon } from "../../utils/reportUtils.tsx";

type ReportCardListProps = {
  report: ReportUnion;
  onSelectReport?: (report: ReportUnion) => void;
  onResolveReport: (data: ResolveReportRequest) => void;
  isResolving: boolean;
};

const ReportCardList = ({
  report,
  onSelectReport,
  onResolveReport,
  isResolving,
}: ReportCardListProps) => {
  const statusColor = getReportStatusColor(report.reportStatus);
  const typeColor = getReportTypeColor(report.reportType);
  const reasonColor = getReportReasonColor(report.reportReasonType);

  return (
    <motion.div
      key={report.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-black-200 border-2 border-gray-500 overflow-hidden hover:border-gray-600 transition-colors"
    >
      <div className="h-1" style={{ backgroundColor: statusColor }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white-100 truncate">
                {report.title}
              </h3>
              <span
                className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${statusColor}20`,
                  color: statusColor,
                }}
              >
                {getReportStatusIcon(report.reportStatus)}
                <span>{report.reportStatus}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: `${typeColor}/20`,
                  color: typeColor,
                }}
              >
                {getReportTypeIcon(report.reportType)}
                <span>{report.reportType}</span>
              </span>

              <span
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: `${reasonColor}20`,
                  color: reasonColor,
                }}
              >
                {report.reason}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-teal-500/15 text-teal-400">
                <Hash className="size-3" />
                <span>{report.entityId}</span>
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <AnimatedButton
              bgColorHover={"#14b8a6"}
              textColor={"#14b8a6"}
              borderColorHover={"#14b8a6"}
              className="flex gap-1.5 py-2 px-3 rounded-lg items-center text-sm font-medium border-2"
              onClick={() => onSelectReport?.(report)}
            >
              <Eye className="size-4" />
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
                  bgColorHover={"#22c55e"}
                  textColor={"#22c55e"}
                  borderColorHover={"#22c55e"}
                  textColorHover={"#111111"}
                  disabled={isResolving}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2"
                >
                  <CheckCircle className="size-4" />
                  <span>Resolve</span>
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => {
                    onResolveReport({
                      reportId: report.id,
                      reportStatus: "REJECTED",
                    });
                  }}
                  bgColorHover={"#ef4444"}
                  textColor={"#ef4444"}
                  borderColorHover={"#ef4444"}
                  textColorHover={"#111111"}
                  disabled={isResolving}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2"
                >
                  <XCircle className="size-4" />
                  <span>Reject</span>
                </AnimatedButton>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-gray-600">
          <div className="flex items-center gap-2">
            <Avatar size="size-7" />
            <span className="text-sm text-gray-400">
              Reported by{" "}
              <span className="text-gray-200 font-medium">
                {report.reportedBy.username}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            <Clock className="size-3.5" />
            <span>{format(report.reportedAt, "MMM d, yyyy 'at' HH:mm")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCardList;
