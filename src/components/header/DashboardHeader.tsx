import AnimatedButton from "../button/AnimatedButton.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../logo/Logo.tsx";
import {
  ArrowLeft,
  Bookmark,
  FolderPlus,
  Hash,
  Plus,
  Settings,
  Share2,
  Tag,
} from "lucide-react";

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
  };

  const getHeaderAdditionalElements = () => {
    if (pathname.includes("user-blog")) {
      return (
        <>
          <AnimatedButton
            onClick={() => navigate("/sign-in")}
            className={"px-4 py-3  rounded-lg flex gap-3 items-center text-lg"}
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#14b8a6"}
            textColor={"#b0b0b0"}
          >
            <Share2 className="size-4" />
            Share Profile
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#14b8a6"}
            bgColorHover={"#14b8a6"}
            textColor={"#b0b0b0"}
            textColorHover={"#111111"}
            onClick={() => navigate("/sign-up")}
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
    if (pathname.includes("/tags") && tag) {
      return (
        <AnimatedButton
          bgColor={"#222222"}
          borderColor={"#14b8a6"}
          bgColorHover={"#14b8a6"}
          textColor={"#14b8a6"}
          textColorHover={"#111111"}
          className="px-4 py-2 rounded-lg flex items-center gap-2 border-2"
        >
          <Plus className={"size-5"} />
          Follow Tag
        </AnimatedButton>
      );
    }
  };

  return (
    <header
      className={
        "w-full h-[85px] px-4 border-b-2 border-gray-600 bg-black-200 justify-center flex items-center relative"
      }
    >
      <nav className={"max-w-6xl  w-full justify-between items-center flex"}>
        <div className={"flex gap-5 items-center"}>
          <AnimatedButton
            onClick={() => navigate("/dashboard")}
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#14b8a6"}
            textColor={"#b0b0b0"}
            borderColor={"#222222"}
            borderColorHover={"#393939"}
            className={"size-10 rounded-lg justify-center items-center flex"}
          >
            <ArrowLeft className={"size-6"} />
          </AnimatedButton>
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
