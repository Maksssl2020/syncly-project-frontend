import Logo from "../logo/Logo.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  Bookmark,
  Home,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Tag,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NavigationData } from "../../types/types.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useAuthenticationStore } from "../../store/authenticationStore.ts";

const navigationData: NavigationData[] = [
  {
    title: "Home",
    link: "/dashboard",
    icon: <Home className="size-5 mr-3" />,
  },
  {
    title: "Search",
    link: "/search",
    icon: <Search className="size-5 mr-3" />,
  },
  {
    title: "Friends",
    link: "/friends",
    icon: <Users className="size-5 mr-3" />,
  },
  {
    title: "Messages",
    link: "/conversations",
    icon: <MessageCircle className="size-5 mr-3" />,
  },
  {
    title: "My Blog",
    link: "/blog",
    icon: <User className="size-5 mr-3" />,
  },
  {
    title: "Saved Posts",
    link: "/saved-posts",
    icon: <Bookmark className="size-5 mr-3" />,
  },
  {
    title: "Tags",
    link: "/tags",
    icon: <Tag className="size-5 mr-3" />,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <Settings className="size-5 mr-3" />,
  },
];

const DashboardNavigationSidebar = () => {
  const { role } = useAuthentication();
  const navigate = useNavigate();

  return (
    <div
      className={
        "min-w-[25%] border-r-2 border-gray-600 h-screen sticky top-0 bg-black-200"
      }
    >
      <div className={"p-6 h-full flex flex-col"}>
        <Logo />
        <nav className={"flex flex-col gap-4 mt-10 items-start"}>
          {navigationData.map((item, index) => (
            <AnimatedButton
              key={item.title + index}
              className={
                "w-full h-[50px] rounded-lg justify-start flex items-center p-2"
              }
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              borderColor={"#222222"}
              borderColorHover={"#393939"}
              textColorHover={"#14b8a6"}
              onClick={() => navigate(item.link)}
            >
              {item.icon}
              {item.title}
            </AnimatedButton>
          ))}
        </nav>

        <div className={"mt-auto flex flex-col gap-4"}>
          <AnimatedButton
            onClick={() => useAuthenticationStore.getState().logout()}
            bgColor={"#222222"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            borderColorHover={"#ef4444"}
            textColorHover={"#ef4444"}
            className={
              "flex gap-2 h-[50px] rounded-lg items-center justify-center"
            }
          >
            <LogOut className={"size-6"} />
            Logout
          </AnimatedButton>
          {role === "ADMIN" && (
            <AnimatedButton
              onClick={() => navigate("/admin/panel")}
              bgColor={"#222222"}
              borderColor={"#222222"}
              bgColorHover={"#393939"}
              borderColorHover={"#14b8a6"}
              textColorHover={"#14b8a6"}
              className={
                "flex gap-2 h-[50px] rounded-lg items-center justify-center"
              }
            >
              <Shield className={"size-5 "} />
              Go To Admin Panel
            </AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigationSidebar;
