import Page from "../animation/Page.tsx";
import type { PageStats, RecentActivityStats } from "../types/admin.ts";
import {
  AlertCircle,
  ArrowRight,
  Flag,
  MessageSquare,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import PageStatsCard from "../components/card/PageStatsCard.tsx";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import AdminActivityCard from "../components/card/AdminActivityCard.tsx";

const pageStats: PageStats[] = [
  {
    title: "Total Users",
    value: 12458,
    change: 5.2,
    icon: <Users className="size-6" />,
    color: "#14b8a6",
  },
  {
    title: "Active Reports",
    value: 27,
    change: -12.5,
    icon: <Flag className="size-6" />,
    color: "#ef4444",
  },
  {
    title: "Main Tags",
    value: 156,
    change: 8.1,
    icon: <Tag className="size-6" />,
    color: "#22d3ee",
  },
  {
    title: "Posts Today",
    value: 842,
    change: 3.7,
    icon: <MessageSquare className="size-6" />,
    color: "#0d9488",
  },
];

const quickActions = [
  {
    label: "Pending Reports",
    icon: <AlertCircle className={"size-5 text-red-400"} />,
    link: "/admin/reports",
  },
  {
    label: "Manage Users",
    icon: <Users className={"size-5 text-teal-100"} />,
    link: "/admin/users",
  },
  {
    label: "Create New Tag",
    icon: <Tag className={"size-5 text-cyan-400"} />,
    link: "/admin/tags/create",
  },
  {
    label: "Platform Settings",
    icon: <Settings className={"size-5 text-gray-400"} />,
    link: "/admin/platform/settings",
  },
];

const recentActivities: RecentActivityStats[] = [
  {
    id: "1",
    action: "blocked",
    user: "admin",
    target: "spam_user123",
    timestamp: "2023-06-04T15:30:00Z",
    type: "user",
  },
  {
    id: "2",
    action: "resolved",
    user: "moderator1",
    target: "harassment report #45",
    timestamp: "2023-06-04T14:45:00Z",
    type: "report",
  },
  {
    id: "3",
    action: "created",
    user: "admin",
    target: "photography",
    timestamp: "2023-06-04T13:20:00Z",
    type: "tag",
  },
  {
    id: "4",
    action: "deleted",
    user: "moderator2",
    target: "inappropriate comment #89",
    timestamp: "2023-06-04T12:10:00Z",
    type: "comment",
  },
  {
    id: "5",
    action: "promoted",
    user: "admin",
    target: "helpful_user456",
    timestamp: "2023-06-04T11:05:00Z",
    type: "user",
  },
  {
    id: "6",
    action: "rejected",
    user: "moderator1",
    target: "spam report #32",
    timestamp: "2023-06-04T10:30:00Z",
    type: "report",
  },
];

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-3xl font-bold text-white-100"}>Admin Dashboard</h1>
        <p className={"text-gray-400"}>
          Overview and management of your social media platform
        </p>
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}>
        {pageStats.map((stats, index) => (
          <PageStatsCard data={stats} index={index} />
        ))}
      </div>

      <div className={"grid grid-cols-1 lg:grid-cols-3 gap-6"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 rounded-lg border-2 p-6 bg-black-200 border-gray-600"
        >
          <h2 className={"text-xl font-bold mb-4 text-white-100"}>
            Quick Actions
          </h2>
          <div className={"space-y-3"}>
            {quickActions.map((data, index) => (
              <AnimatedButton
                textColor={"#e6e6e6"}
                textColorHover={"#14b8a6"}
                bgColor={"#171719"}
                bgColorHover={"#171719"}
                borderColorHover={"#171719"}
                borderColor={"#171719"}
                className={
                  "flex items-center justify-between p-3  rounded-lg gap-3"
                }
                key={index + data.link}
                onClick={() => navigate(data.link)}
              >
                <div className={"flex items-center gap-2"}>
                  {data.icon}
                  <span>{data.label}</span>
                </div>
                <ArrowRight className={"size-5 text-gray-400"} />
              </AnimatedButton>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 rounded-lg border-2 p-6 bg-black-200 border-gray-600"
        >
          <h2 className={"text-xl font-bold mb-4 text-white-100"}>
            Recent Activity
          </h2>
          <div className={"space-y-4"}>
            {recentActivities.map((data) => (
              <AdminActivityCard activity={data} />
            ))}
          </div>
          <div className={"flex justify-center mt-4"}>
            <AnimatedButton
              bgColor={"#171719"}
              bgColorHover={"#171719"}
              borderColor={"#171719"}
              borderColorHover={"#171719"}
              textColor={"#e6e6e6"}
              textColorHover={"#14b8a6"}
              className={"rounded-lg px-8 py-4 mx-auto uppercase text-lg"}
            >
              View All Activity
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default AdminPanel;
