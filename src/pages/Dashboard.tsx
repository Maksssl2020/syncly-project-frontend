import Page from "../animation/Page.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Camera, Music, Palette, Send, Video } from "lucide-react";
import Avatar from "../components/img/Avatar.tsx";
import FormTextArea from "../components/input/FormTextarea.tsx";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import DashboardNavigationSidebar from "../components/sidebar/DashboardNavigationSidebar.tsx";
import { useState } from "react";
import FloatingButton from "../components/button/FloatingButton.tsx";
import CreatePostOptionList from "../components/list/CreatePostOptionList.tsx";
import type { PostType } from "../types/post.ts";
import CreatePostModal from "../components/modal/CreatePostModal.tsx";

const Dashboard = () => {
  const [isCreatePostListOpen, setIsCreatePostListOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const handleCreatePost = (type: PostType) => {
    setIsCreatePostModalOpen(true);
    setSelectedPostType(type);
  };

  return (
    <Page className={"min-h-screen flex"}>
      <DashboardNavigationSidebar />
      <div className={"flex-1 mx-auto p-6 space-y-6"}>
        <div
          className={
            "w-full h-[300px] p-5 flex border-2 border-gray-600 rounded-lg bg-black-200"
          }
        >
          <div className={"flex gap-4 w-full "}>
            <Avatar />
            <div className={"flex-1 flex-col"}>
              <div className={"w-full h-[80%]"}>
                <FormTextArea
                  title={""}
                  placeholder={"What do you want to share?"}
                />
              </div>
              <div
                className={"w-full h-[50px] flex items-center justify-between"}
              >
                <div className={"flex gap-2 h-full"}>
                  <AnimatedButton
                    bgColor={"#222222"}
                    bgColorHover={"#254542"}
                    textColorHover={"#14b8a6"}
                    textColor={"#14b8a6"}
                    className={
                      "flex gap-2 items-center h-full rounded-lg px-4 "
                    }
                  >
                    <Camera className={"size-4"} />
                    Photo
                  </AnimatedButton>
                  <AnimatedButton
                    bgColor={"#222222"}
                    bgColorHover={"#23444B"}
                    textColorHover={"#22d3ee"}
                    textColor={"#22d3ee"}
                    className={
                      "flex gap-2 items-center h-full rounded-lg px-4 "
                    }
                  >
                    <Video className={"size-4"} />
                    Video
                  </AnimatedButton>
                  <AnimatedButton
                    bgColor={"#222222"}
                    bgColorHover={"#254542"}
                    textColorHover={"#0d9488"}
                    textColor={"#0d9488"}
                    className={
                      "flex gap-2 items-center h-full rounded-lg px-4 "
                    }
                  >
                    <Music className={"size-4"} />
                    Music
                  </AnimatedButton>
                  <AnimatedButton
                    bgColor={"#222222"}
                    bgColorHover={"#23444B"}
                    textColorHover={"#06b6d4"}
                    textColor={"#06b6d4"}
                    className={
                      "flex gap-2 items-center h-full rounded-lg px-4 "
                    }
                  >
                    <Palette className={"size-4"} />
                    GIF
                  </AnimatedButton>
                </div>
                <AnimatedButton
                  bgColor={"#222222"}
                  borderColorHover={"#14b8a6"}
                  textColorHover={"#222222"}
                  className={
                    "flex gap-2 border-2 items-center h-full rounded-lg px-6 "
                  }
                >
                  <Send className={"size-4"} />
                  Share
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

        <DashboardPostCard />
      </div>
      <div
        className={
          "min-w-[20%] border-l-2 border-gray-600 h-screen sticky top-0 bg-black-200"
        }
      >
        <div className={"p-6"}>
          <Searchbar onChange={() => {}} />

          <div className={"mt-6"}>
            <h3 className={"text-gray-300 text-lg font-semibold mb-4"}>
              Popular Tags
            </h3>
            <div className={"flex flex-col gap-3"}>
              <div className={"flex flex-col"}>
                <p className={"font-medium text-white-100"}>#art</p>
                <p className={"text-sm text-gray-400"}>2.4k posts</p>
              </div>
              <div className={"flex flex-col"}>
                <p className={"font-medium text-white-100"}>#art</p>
                <p className={"text-sm text-gray-400"}>2.4k posts</p>
              </div>
              <div className={"flex flex-col"}>
                <p className={"font-medium text-white-100"}>#art</p>
                <p className={"text-sm text-gray-400"}>2.4k posts</p>
              </div>
              <div className={"flex flex-col"}>
                <p className={"font-medium text-white-100"}>#art</p>
                <p className={"text-sm text-gray-400"}>2.4k posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingButton
        className={"bottom-6 right-6"}
        isOpen={isCreatePostListOpen}
        onClick={(value) => setIsCreatePostListOpen(value)}
      >
        <CreatePostOptionList
          className={"bottom-16 right-0"}
          onCreatePost={handleCreatePost}
          onClose={() => setIsCreatePostListOpen(false)}
        />
      </FloatingButton>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        postType={selectedPostType}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={() => {}}
      />
    </Page>
  );
};

export default Dashboard;
