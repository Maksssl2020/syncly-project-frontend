import { format } from "date-fns";
import type { CommentReport } from "../../types/report.ts";
import Avatar from "../img/Avatar.tsx";
import { Heart, MoreHorizontal } from "lucide-react";

type ReportedCommentPreviewProps = {
  report: CommentReport;
};

const ReportedCommentPreview = ({ report }: ReportedCommentPreviewProps) => {
  const comment = report.comment;

  return (
    <div className="bg-black-300 border border-gray-600 rounded-lg p-4 max-w-full">
      <div className="flex items-start gap-3">
        <Avatar size="size-8" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-white-100 font-medium text-sm">
              {comment.authorName}
            </p>
            <p className="text-gray-400 text-xs">@{comment.authorUsername}</p>
            <p className="text-gray-400 text-xs">
              • {format(new Date(comment.createdAt), "MMM d, yyyy")}
            </p>
          </div>
          <p className="text-white-100 text-sm line-clamp-4 mb-3">
            {comment.content}
          </p>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
              <Heart className="size-3" />
              <span className="text-xs">{comment.likesBy.length || 0}</span>
            </button>
            <button className="text-gray-400 hover:text-blue-400 transition-colors text-xs">
              Reply
            </button>
            <button className="text-gray-400 hover:text-white-100 transition-colors">
              <MoreHorizontal className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedCommentPreview;
