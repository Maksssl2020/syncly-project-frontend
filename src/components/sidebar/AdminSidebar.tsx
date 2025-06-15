import { motion } from "framer-motion";
import {
  Activity,
  Flag,
  Folder,
  LayoutDashboard,
  LogOut,
  Shield,
  Tag,
  Users,
} from "lucide-react";
import type { NavigationData } from "../../types/types.ts";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedButton from "../button/AnimatedButton.tsx";

const adminNavItems: NavigationData[] = [
  {
    title: "Admin Dashboard",
    link: "/admin/panel",
    icon: <LayoutDashboard className={"size-5"} />,
  },
  {
    title: "All Activity",
    link: "/admin/panel/all-activity",
    icon: <Activity className={"size-5"} />,
  },
  {
    title: "Users",
    link: "/admin/panel/users",
    icon: <Users className={"size-5"} />,
  },
  {
    title: "Reports",
    link: "/admin/panel/reports",
    icon: <Flag className={"size-5"} />,
  },
  {
    title: "Tags",
    link: "/admin/panel/tags",
    icon: <Tag className={"size-5"} />,
  },
  {
    title: "Categories",
    link: "/admin/panel/categories",
    icon: <Folder className={"size-5"} />,
  },
];

const AdminSidebar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isActivePath = (link: string) => {
    return pathname === link || pathname.startsWith(`${link}/`);
  };

  return (
    <motion.div
      initial={false}
      className={
        "fixed bg-black-200 md:relative z-40 h-full md:h-auto md:min-h-screen min-w-[300px]"
      }
    >
      <div className={"p-6 flex flex-col gap-12"}>
        <div className={"flex items-center justify-center space-x-2 "}>
          <Shield className={"size-8 text-teal-100"} />
          <h1 className={"text-xl font-bold text-white-100"}>Admin Panel</h1>
        </div>

        <nav className={"space-y-1"}>
          {adminNavItems.map((item, index) => (
            <AnimatedButton
              key={item.title + index}
              className={
                "w-full h-[50px] flex gap-4 rounded-lg justify-start flex items-center p-2"
              }
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              borderColor={"#222222"}
              borderColorHover={"#393939"}
              textColor={isActivePath(item.link) ? "#14b8a6" : "#e6e6e6"}
              textColorHover={"#14b8a6"}
              onClick={() => navigate(item.link)}
            >
              {item.icon}
              {item.title}
            </AnimatedButton>
          ))}
        </nav>

        <div className={"absolute bottom-8 left-0 w-full px-6"}>
          <AnimatedButton
            className={"flex items-center px-4 py-3 rounded-lg w-full"}
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            textColor={"#b0b0b0"}
            borderColor={"#222222"}
            borderColorHover={"#393939"}
            textColorHover={"#14b8a6"}
            onClick={() => navigate("/dashboard")}
          >
            <LogOut className={"size-5"} />
            <span>Exit Admin</span>
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
