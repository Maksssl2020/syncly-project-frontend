import Logo from "../logo/Logo.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  Bookmark,
  Home,
  Search,
  Settings,
  Tag,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NavigationData } from "../../types/types.ts";

const navigationData: NavigationData[] = [
  {
    title: "Home",
    link: "/",
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
  const navigate = useNavigate();

  return (
    <div
      className={
        "min-w-[25%] border-r-2 border-gray-600 h-screen sticky top-0 bg-black-200"
      }
    >
      <div className={"p-6"}>
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
      </div>
    </div>
  );
};

export default DashboardNavigationSidebar;
