import Page from "../animation/Page.tsx";
import DashboardNavigationSidebar from "../components/sidebar/DashboardNavigationSidebar.tsx";
import { useState } from "react";
import FloatingButton from "../components/button/FloatingButton.tsx";
import CreatePostOptionList from "../components/list/CreatePostOptionList.tsx";
import type {
  LinkPostRequest,
  PhotoPostRequest,
  PostType,
  QuotePostRequest,
  TextPostRequest,
  VideoPostRequest,
} from "../types/post.ts";
import CreatePostModal from "../components/modal/CreatePostModal.tsx";
import useCreatePostMutation from "../hooks/mutations/useCreatePostMutation.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { Sparkles, Users } from "lucide-react";
import DashboardRightSidebar from "../components/sidebar/DashboardRightSidebar.tsx";
import DashboardForYouPostsSection from "../components/section/DashboardForYouPostsSection.tsx";
import DashboardFollowedPostsSection from "../components/section/DashboardFollowedPostsSection.tsx";

type FeedTab = "following" | "forYou";

const Dashboard = () => {
  const [isCreatePostListOpen, setIsCreatePostListOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FeedTab>("forYou");

  const { createPost, creatingPost } = useCreatePostMutation();

  const handleCreatePost = (type: PostType) => {
    setIsCreatePostModalOpen(true);
    setSelectedPostType(type);
  };

  const handleCreatePostSubmit = (
    data:
      | TextPostRequest
      | QuotePostRequest
      | PhotoPostRequest
      | VideoPostRequest
      | LinkPostRequest,
  ) => {
    if (selectedPostType) {
      createPost({ data, type: selectedPostType });
      setIsCreatePostModalOpen(false);
    }
  };

  const handleTabChange = (tab: FeedTab) => {
    setActiveTab(tab);
  };

  if (creatingPost) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen flex"}>
      <DashboardNavigationSidebar />

      <div className="flex-1 mx-auto">
        <div className="sticky top-0 z-10 bg-black-200  border-b-2 border-gray-600">
          <div className="flex">
            <button
              onClick={() => handleTabChange("forYou")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === "forYou"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              For You
              {activeTab === "forYou" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-100" />
              )}
            </button>
            <button
              onClick={() => handleTabChange("following")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === "following"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Users className="w-4 h-4" />
              Followed
              {activeTab === "following" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-100" />
              )}
            </button>
          </div>
        </div>

        <div className={"flex-1 mx-auto p-6 space-y-6"}>
          {activeTab === "forYou" && <DashboardForYouPostsSection />}
          {activeTab === "following" && <DashboardFollowedPostsSection />}
        </div>
      </div>

      <DashboardRightSidebar />

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
        onSubmit={(data) => handleCreatePostSubmit(data)}
      />
    </Page>
  );
};

export default Dashboard;
