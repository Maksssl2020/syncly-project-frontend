import { motion } from "framer-motion";
import type { ActivityStats } from "../../types/admin.ts";
import { Clock } from "lucide-react";
import { getActivityColor } from "../../utils/colorUtils.ts";
import { formatTimeAgo } from "../../utils/dateUtils.ts";
import { getActivityIcon } from "../../utils/activityUtils.tsx";

type AdminActivityCardLargeProps = {
  activity: ActivityStats;
  index: number;
};

const AdminActivityCardLarge = ({
  activity,
  index,
}: AdminActivityCardLargeProps) => {
  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={"rounded-lg border-2 p-4 bg-black-200 border-gray-600"}
    >
      <div className={"flex items-start gap-4"}>
        <div
          className={"p-2 rounded-full flex-shrink-0 text-black-100"}
          style={{
            backgroundColor: getActivityColor(activity.actionType),
          }}
        >
          {getActivityIcon(activity.targetType)}
        </div>

        <div className={"flex-1 min-w-0"}>
          <div className={"flex items-start justify-between"}>
            <div className={"flex-1 flex flex-col gap-2"}>
              <p className={"text-white-100 gap-2 flex"}>
                <span className={"font-medium"}>{activity.userUsername}</span>
                <span className={"text-gray-400"}>{activity.actionType}</span>
                <span className={"font-medium"}>{activity.target}</span>
              </p>
              <div className={"flex items-center gap-4 "}>
                <div className={"flex items-center gap-2 text-gray-200"}>
                  <Clock className={"size-5 "} />
                  <span className={"text-sm"}>
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminActivityCardLarge;
