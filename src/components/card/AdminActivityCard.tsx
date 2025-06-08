import { Activity, Clock, Flag, MessageSquare, Tag, User } from "lucide-react";
import type { RecentActivityStats } from "../../types/admin.ts";
import { getActivityColor } from "../../utils/colorUtils.ts";
import { formatTimeAgo } from "../../utils/dateUtils.ts";

const getActivityIcon = (type: string) => {
  switch (type) {
    case "user":
      return <User className="size-5" />;
    case "report":
      return <Flag className="size-5" />;
    case "tag":
      return <Tag className="size-5" />;
    case "comment":
      return <MessageSquare className="size-5" />;
    default:
      return <Activity className="size-5" />;
  }
};

type AdminActivityCardProps = {
  activity: RecentActivityStats;
};

const AdminActivityCard = ({ activity }: AdminActivityCardProps) => {
  return (
    <div
      key={activity.id}
      className={"flex items-start p-3 rounded-lg bg-black-300"}
    >
      <div
        className={"p-2 rounded-full mr-3 text-black-100"}
        style={{
          backgroundColor: getActivityColor(activity.action),
        }}
      >
        {getActivityIcon(activity.type)}
      </div>
      <div className={"flex-1"}>
        <p className={"text-white-100 flex gap-2"}>
          <span className={"font-medium"}>{activity.user}</span>
          <span className={"text-gray-400"}> {activity.action}</span>
          <span className={"font-medium"}>{activity.target}</span>
        </p>
        <div className={"flex items-center mt-1 text-gray-400"}>
          <Clock className={"size-4 mr-1 "} />
          <span className={"text-sm"}>{formatTimeAgo(activity.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityCard;
