import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import type { PostUnion } from "../../types/post.ts";
import TextPostCard from "./TextPostCard.tsx";
import QuotePostCard from "./QuotePostCard.tsx";
import PhotoPostCard from "./PhotoPostCard.tsx";
import { formatDistanceToNow } from "date-fns";
import { isLinkPost, isPhotoPost, isQuotePost, isTextPost, isVideoPost } from "../../utils/postUnionGuards.ts";
import VideoPostCard from "./VideoPostCard.tsx";
import LinkPostCard from "./LinkPostCard.tsx";
import useLikePostMutation from "../../hooks/mutations/useLikePostMutation.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useState } from "react";
import CommentsSection from "../section/CommentsSection.tsx";
import useUnsavePostByUserPostCollectionMutation
  from "../../hooks/mutations/useUnsavePostByUserPostCollectionMutation.ts";
import SavePostInCollectionModal from "../modal/SavePostInCollectionModal.tsx";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useSharePostMutation from "../../hooks/mutations/useSharePostMutation.ts";
import PostOptionsDropdown from "../dropdown/PostOptionsDropdown.tsx";
import ReportFormModal from "../modal/ReportFormModal.tsx";
import useUnlikePostMutation from "../../hooks/mutations/useUnlikePostMutation.ts";
import DeleteWarningModal from "../modal/DeleteWarningModal.tsx";
import useDeletePostMutation from "../../hooks/mutations/useDeletePostMutation.ts";
import EditPostModal from "../modal/EditPostModal.tsx";
import useUpdatePostMutation from "../../hooks/mutations/useUpdatePostMutation.ts";

type DashboardPostCardProps = {
  isSavedPost?: boolean;
  post: PostUnion;
};

const DashboardPostCard = ({
  isSavedPost = false,
  post,
}: DashboardPostCardProps) => {
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const currentPost = post;
  const {
    id,
    authorId,
    authorName,
    authorUsername,
    createdAt,
    likesBy,
    commentsCount,
    savedBy,
    sharedBy,
    authorAvatar,
  } = currentPost;

  const likesBySet = new Set(likesBy);
  const savedBySet = new Set(savedBy);
  const sharedBySet = new Set(sharedBy);

  const [isLiked, setIsLiked] = useState(likesBySet.has(Number(userId)));
  // @ts-ignore
  const [isSaved, setIsSaved] = useState(savedBySet.has(Number(userId)));
  const [isShared, setIsShared] = useState(sharedBySet.has(Number(userId)));

  const [likes, setLikes] = useState<number>(likesBySet.size);
  const [sharedCount, setSharedCount] = useState<number>(sharedBySet.size);
  const [showComments, setShowComments] = useState(false);

  const [showSavePostModal, setShowSavePostModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { likePost, likingPost } = useLikePostMutation(() => {
    setLikes((prevState) => prevState + 1);
    setIsLiked(true);
  });
  const { unlikePost, unlikingPost } = useUnlikePostMutation(() => {
    setLikes((prevState) => prevState - 1);
    setIsLiked(false);
  });
  const { unsavePost } = useUnsavePostByUserPostCollectionMutation();
  const { sharePost, sharingPost } = useSharePostMutation(() => {
    setSharedCount((prevState) => prevState + 1);
    setIsShared(true);
  });
  // @ts-ignore
  const { updatePost, updatingPost } = useUpdatePostMutation();

  const renderPostContent = () => {
    if (isTextPost(currentPost)) {
      return <TextPostCard post={currentPost} />;
    }

    if (isQuotePost(currentPost)) {
      return <QuotePostCard post={currentPost} />;
    }

    if (isPhotoPost(currentPost)) {
      return <PhotoPostCard post={currentPost} />;
    }

    if (isVideoPost(currentPost)) {
      return <VideoPostCard post={currentPost} />;
    }

    if (isLinkPost(currentPost)) {
      return <LinkPostCard post={currentPost} />;
    }

    return null;
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const onLikePost = () => {
    if (!isLiked) {
      likePost(id);
    } else {
      unlikePost(id);
    }
  };

  const onSharePost = () => {
    if (!isShared) {
      sharePost(id);
    }
  };

  const { deletePost, deletingPost } = useDeletePostMutation();

  const onDeletePost = () => {
    deletePost({
      postId: id,
      authorId: authorId,
    });

    setShowDeleteWarningModal(false);
  };

  return (
    <div
      className={
        "w-full h-auto p-5 flex-col gap-4 flex border-2 border-gray-600 rounded-lg bg-black-200"
      }
    >
      <header className={"w-full h-auto flex gap-4 items-center"}>
        <Avatar avatar={authorAvatar} />
        <div className={"flex flex-col gap-1 text-white-100"}>
          <motion.h3
            whileHover={{
              color: "#14b8a6",
            }}
            onClick={() => navigate(`/blog/${authorId}`)}
            className={"text-xl font-semibold cursor-pointer"}
          >
            {authorName}
          </motion.h3>
          <div className={"flex gap-1 text-gray-400"}>
            <motion.p
              whileHover={{
                color: "#14b8a6",
              }}
              onClick={() => navigate(`/blog/${authorId}`)}
              className={"text-base cursor-pointer"}
            >
              @{authorUsername}
            </motion.p>
            <p>•</p>
            <p className={"text-base"}>{timeAgo}</p>
          </div>
        </div>
        <div className={"ml-auto flex gap-2"}>
          <PostOptionsDropdown
            authorId={currentPost.authorId}
            postId={currentPost.id}
            onReportClick={() => setShowReportModal(true)}
            onDeleteClick={() => setShowDeleteWarningModal(true)}
            onEditPostClick={() => setEditModalOpen(true)}
          />

          {isSavedPost && (
            <AnimatedButton
              className={"p-2 h-fit rounded-lg border-2"}
              bgColor={"#222222"}
              bgColorHover={"#14b8a6"}
              textColor={"#14b8a6"}
              textColorHover={"#222222"}
              borderColor={"#14b8a6"}
            >
              <Bookmark className={"size-4"} />
            </AnimatedButton>
          )}
        </div>
      </header>
      <div className="w-full h-auto flex flex-col gap-6">
        {renderPostContent()}
      </div>

      <div className={"flex flex-wrap gap-1"}>
        {post.tags.map((tag) => (
          <Link to={`/tags/${tag.name}`}>
            <span
              key={tag.name + tag.id}
              style={{
                backgroundColor: tag.color,
              }}
              className={
                "text-sm px-2 py-1 rounded-full bg-teal-100 cursor-pointer text-black-100"
              }
            >
              #{tag.name}
            </span>
          </Link>
        ))}
      </div>

      <footer
        className={
          "w-full h-[75px] border-t-2 border-gray-600  flex items-center justify-between"
        }
      >
        <div className={"w-auto flex items-center gap-4"}>
          <AnimatedButton
            onClick={() => onLikePost()}
            bgColor={isLiked ? "#4D3232" : "#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            bgColorHover={"#4D3232"}
            borderColor={isLiked ? "#4D3232" : "#222222"}
            borderColorHover={"#4D3232"}
            loading={likingPost || unlikingPost}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <Heart className={"size-4"} />
            {likes}
          </AnimatedButton>
          <AnimatedButton
            onClick={() => setShowComments(!showComments)}
            bgColor={showComments ? "#22454B" : "#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            bgColorHover={"#22454B"}
            borderColor={"#222222"}
            borderColorHover={"#22454B"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <MessageCircle className={"size-4"} />
            {commentsCount}
          </AnimatedButton>
          <AnimatedButton
            bgColor={isShared ? "#244541" : "#222222"}
            onClick={onSharePost}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            borderColor={"#222222"}
            borderColorHover={"#244541"}
            bgColorHover={"#244541"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
            loading={sharingPost}
          >
            <Share2 className={"size-4"} />
            {sharedCount}
          </AnimatedButton>
        </div>
        <AnimatedButton
          bgColor={isSaved ? "#4D441F" : "#222222"}
          bgColorHover={"#4D441F"}
          borderColor={isSaved ? "#4D441F" : "#222222"}
          borderColorHover={"#4D441F"}
          textColor={"#b0b0b0"}
          textColorHover={"#b0b0b0"}
          onClick={() => {
            if (isSaved) {
              if (userId) {
                unsavePost({
                  postCollectionId: userId,
                  postId: post.id,
                });
              }
            } else {
              setShowSavePostModal(true);
            }
          }}
          className={
            "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
          }
        >
          <Bookmark className={"size-4"} />
        </AnimatedButton>
      </footer>

      {showComments && <CommentsSection postId={post.id} />}

      <SavePostInCollectionModal
        postId={post.id}
        isOpen={showSavePostModal}
        onClose={() => setShowSavePostModal(false)}
      />

      <ReportFormModal
        type={"POST"}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        authorName={authorName}
        entityId={id}
      />

      <DeleteWarningModal
        onSubmit={() => onDeletePost()}
        onClose={() => setShowDeleteWarningModal(false)}
        loading={deletingPost}
        isOpen={showDeleteWarningModal}
        title={"Are you sure you want to delete post?"}
      />

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        // @ts-ignore
        postToEdit={post}
        onSubmit={(data) => {
          console.log(data);
          updatePost({
            type: post.postType,
            updateRequest: data,
          });
        }}
      />
    </div>
  );
};

export default DashboardPostCard;
