import Page from "../animation/Page.tsx";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import DashboardNavigationSidebar from "../components/sidebar/DashboardNavigationSidebar.tsx";
import { useState } from "react";
import FloatingButton from "../components/button/FloatingButton.tsx";
import CreatePostOptionList from "../components/list/CreatePostOptionList.tsx";
import type {
  AudioPostRequest,
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
import usePostsForUserDashboard from "../hooks/queries/usePostsForUserDashboard.ts";

const Dashboard = () => {
  const [isCreatePostListOpen, setIsCreatePostListOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const { createPost, creatingPost } = useCreatePostMutation();

  const { postsForUserDashboard, fetchingPostsForUserDashboard } =
    usePostsForUserDashboard();

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
      | AudioPostRequest
      | LinkPostRequest,
  ) => {
    if (selectedPostType) {
      createPost({ data, type: selectedPostType });
    }
  };

  if (creatingPost || fetchingPostsForUserDashboard) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen flex"}>
      <DashboardNavigationSidebar />
      <div className={"flex-1 mx-auto p-6 space-y-6"}>
        {postsForUserDashboard?.map((post) => (
          <DashboardPostCard post={post} />
        ))}
      </div>
      <div
        className={
          "min-w-[20%] border-l-2 border-gray-600 h-screen sticky top-0 bg-black-200"
        }
      >
        <div className={"p-6"}>
          <Searchbar onChange={() => {}} value={""} />

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
        onSubmit={(data) => handleCreatePostSubmit(data)}
      />
    </Page>
  );
};

export default Dashboard;
