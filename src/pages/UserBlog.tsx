import Page from "../animation/Page.tsx";
import Avatar from "../components/img/Avatar.tsx";
import {
  Calendar,
  Grid3X3,
  ImageIcon,
  LinkIcon,
  List,
  MapPin,
  Music,
  Quote,
  Video,
} from "lucide-react";
import { useState } from "react";
import type { TabData, ToggleOption } from "../types/types.ts";
import Tabs from "../components/tab/Tabs.tsx";
import ViewToggle from "../components/toggle/ViewToggle.tsx";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import DashboardPostGridCard from "../components/card/DashboardPostGridCard.tsx";

const userStats = [
  { label: "Posts", value: "127" },
  { label: "Followers", value: "2.4k" },
  { label: "Following", value: "892" },
  { label: "Likes", value: "15.2k" },
];

const filterOptions: TabData[] = [
  {
    id: "all",
    label: "All",
    icon: <Grid3X3 className="size-4" />,
    count: 127,
    color: "#14b8a6",
  },
  {
    id: "photo",
    label: "Photos",
    icon: <ImageIcon className="size-4" />,
    count: 45,
    color: "#14b8a6",
  },
  {
    id: "video",
    label: "Videos",
    icon: <Video className="size-4" />,
    count: 23,
    color: "#22d3ee",
  },
  {
    id: "music",
    label: "Music",
    icon: <Music className="size-4" />,
    count: 31,
    color: "#0d9488",
  },
  {
    id: "quote",
    label: "Quotes",
    icon: <Quote className="size-4" />,
    count: 28,
    color: "#06b6d4",
  },
];

const viewOptions: ToggleOption[] = [
  { value: "list", icon: <List className="size-5" /> },
  { value: "grid", icon: <Grid3X3 className="size-5" /> },
];

type FilterType = "all" | "photo" | "video" | "music" | "quote";
type ViewMode = "list" | "grid";

const UserBlog = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filterType, setFilterType] = useState<FilterType>("all");

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className={"max-w-6xl w-full flex flex-col gap-8"}>
        <div className={"w-full h-full gap-8 flex rounded-lg bg-black-200 p-8"}>
          <div className={"flex flex-col gap-4 items-center lg:items-start"}>
            <Avatar size={"size-32"} />
            <div className={"text-center lg:text-left"}>
              <h1 className={"text-3xl font-bold text-white-100"}>
                Anna Kowalska
              </h1>
              <p className={"text-xl text-gray-300"}>@anna_k</p>
            </div>
          </div>
          <div className={"flex-1 space-y-4"}>
            <p className={"text-lg leading-relaxed text-white-100"}>
              🎨 Digital artist & creative soul. Sharing my journey through
              colors, emotions, and imagination. Currently exploring abstract
              expressionism and digital painting techniques.
            </p>
            <div className={"flex flex-wrap gap-4 text-gray-300"}>
              <div className={"flex items-center gap-2"}>
                <MapPin className={"size-4"} />
                <span>Warsaw, Poland</span>
              </div>
              <div className={"flex items-center gap-2"}>
                <Calendar className={"size-4"} />
                <span>Joined in 2021</span>
              </div>
              <div className={"flex items-center gap-2"}>
                <LinkIcon className={"size-4"} />
                <a href={"#"} className={"hover:underline text-teal-100"}>
                  annakowalska.com
                </a>
              </div>
            </div>
            <div className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
              {userStats.map((stat, index) => (
                <div key={index} className={"text-center lg:text-left"}>
                  <div className={"text-2xl font-bold text-white-100"}>
                    {stat.value}
                  </div>
                  <div className={"text-gray-400"}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            "rounded-lg p-6 border-2 w-full bg-black-200 border-gray-600 mb-8"
          }
        >
          <div
            className={
              "flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
            }
          >
            <Tabs
              data={filterOptions}
              activeTabId={filterType}
              onClick={(id) => setFilterType(id as FilterType)}
            />
            <ViewToggle
              options={viewOptions}
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
            />
          </div>
        </div>

        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {viewMode === "list" ? (
            <>
              <DashboardPostCard />
              <DashboardPostCard />
              <DashboardPostCard />
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <motion.div
                  layout
                  whileHover={{ y: -5 }}
                  key={item}
                  className="rounded-lg bg-black-200 border-gray-600 overflow-hidden group cursor-pointer border-2"
                >
                  <DashboardPostGridCard />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </div>
    </Page>
  );
};

export default UserBlog;
