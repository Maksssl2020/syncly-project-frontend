import type { ActivityTargetType } from "../types/admin.ts";
import { Activity, Flag, Folder, MessageSquare, Tag, User } from "lucide-react";

export const getActivityIcon = (type: ActivityTargetType) => {
  switch (type) {
    case "USER":
      return <User className="size-5" />;
    case "REPORT":
      return <Flag className="size-5" />;
    case "TAG":
      return <Tag className="size-5" />;
    case "COMMENT":
      return <MessageSquare className="size-5" />;
    case "TAG_CATEGORY":
      return <Folder className="size-5" />;
    default:
      return <Activity className="size-5" />;
  }
};
