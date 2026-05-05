import { Clock } from "lucide-react";
import type { ActivityStats } from "../../types/admin.ts";
import { getActivityColor } from "../../utils/colorUtils.ts";
import { formatTimeAgo } from "../../utils/dateUtils.ts";
import { getActivityIcon } from "../../utils/activityUtils.tsx";

type AdminActivityCardProps = {
  activity: ActivityStats;
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
          backgroundColor: getActivityColor(activity.actionType),
        }}
      >
        {getActivityIcon(activity.targetType)}
      </div>
      <div className={"flex-1"}>
        <p className={"text-white-100 flex gap-2"}>
          <span className={"font-medium"}>{activity.userUsername}</span>
          <span className={"text-gray-400"}> {activity.actionType}</span>
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
