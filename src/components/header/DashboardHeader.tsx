import AnimatedButton from "../button/AnimatedButton.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../logo/Logo.tsx";
import { ArrowLeft, Bookmark, FolderPlus, Hash, Home, Settings, Tag, Users } from "lucide-react";
import Avatar from "../img/Avatar.tsx";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { tag } = useParams();

  const getHeaderTitle = () => {
    if (pathname.includes("user-blog") || pathname.includes("search")) {
      return <Logo />;
    }
    if (pathname.includes("saved-posts")) {
      return (
        <div className="flex items-center gap-3">
          <Bookmark className="size-6 text-teal-100" />
          <h1 className="text-2xl font-bold text-white-100">Saved Posts</h1>
        </div>
      );
    }
    if (pathname === "/tags") {
      return (
        <div className="flex items-center gap-3">
          <Tag className="size-6 text-teal-100" />
          <h1 className="text-2xl font-bold text-white-100">Explore Tags</h1>
        </div>
      );
    }
    if (pathname === "/friends") {
      return (
        <div className="flex items-center gap-3">
          <Users className="size-6 text-teal-100" />
          <h1 className="text-2xl font-bold text-white-100">Friends</h1>
        </div>
      );
    }
    if (pathname.includes("/tags") && tag) {
      return (
        <div className="flex items-center gap-3">
          <div
            className={
              "size-10 bg-teal-100 rounded-lg flex items-center justify-center"
            }
          >
            <Hash className="size-6 text-black-100" />
          </div>
          <h1 className="text-2xl font-bold text-white-100">{tag}</h1>
        </div>
      );
    }
    if (pathname.includes("/settings")) {
      return (
        <div className="flex items-center gap-3">
          <Settings className="size-6 text-teal-100" />
          <h1 className="text-2xl font-bold text-white-100">Settings</h1>
        </div>
      );
    }

    if (pathname.includes("conversation")) {
      return (
        <div className={"flex items-center gap-3"}>
          <Avatar size={"size-10"} />
          <div className={"flex flex-col "}>
            <p className={"text-lg text-white-100"}>dev_mike</p>
            <p className={"text-sm text-gray-400"}>offline</p>
          </div>
        </div>
      );
    }
  };

  const getHeaderAdditionalElements = () => {
    if (pathname.includes("my-blog")) {
      return (
        <>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#14b8a6"}
            bgColorHover={"#14b8a6"}
            textColor={"#b0b0b0"}
            textColorHover={"#111111"}
            onClick={() => navigate("/settings")}
            className={
              "px-4 py-3 border-2 rounded-lg flex gap-3 items-center text-lg"
            }
          >
            <Settings className={"size-4"} />
            Edit Profile
          </AnimatedButton>
        </>
      );
    }
    if (pathname.includes("saved-posts")) {
      return (
        <div className="flex items-center gap-3">
          <AnimatedButton
            bgColor={"#222222"}
            className="px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FolderPlus className="size-4" />
            New Collection
          </AnimatedButton>
        </div>
      );
    }
  };

  // @ts-ignore
  const isDeltaNavigation = () => {
    if (pathname.includes("conversation")) {
      return true;
    }

    if (pathname.includes("/blog")) {
      return true;
    }

    return false;
  };

  return (
    <header
      className={
        "w-full h-[85px] px-4 border-b-2 border-gray-600 bg-black-200 justify-center flex items-center relative"
      }
    >
      <nav
        className={` w-full justify-between items-center flex ${pathname.includes("conversation") ? "" : "max-w-6xl"}`}
      >
        <div className={"flex gap-8 items-center"}>
          <div className={"flex gap-2 items-center"}>
            <AnimatedButton
              onClick={() => navigate(-1)}
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              textColorHover={"#14b8a6"}
              textColor={"#b0b0b0"}
              borderColor={"#2c2c2c"}
              borderColorHover={"#393939"}
              className={"size-12 rounded-lg justify-center items-center flex"}
            >
              <ArrowLeft className={"size-6"} />
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate("/dashboard")}
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              textColorHover={"#14b8a6"}
              textColor={"#b0b0b0"}
              borderColor={"#2c2c2c"}
              borderColorHover={"#393939"}
              className={"size-12 rounded-lg justify-center items-center flex"}
            >
              <Home className={"size-6"} />
            </AnimatedButton>
          </div>
          {getHeaderTitle()}
        </div>
        <div className={"flex items-center gap-4"}>
          {getHeaderAdditionalElements()}
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
