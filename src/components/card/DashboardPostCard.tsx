import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import type { PostUnion } from "../../types/post.ts";
import TextPostCard from "./TextPostCard.tsx";
import QuotePostCard from "./QuotePostCard.tsx";
import PhotoPostCard from "./PhotoPostCard.tsx";
import { formatDistanceToNow } from "date-fns";
import {
  isAudioPost,
  isLinkPost,
  isPhotoPost,
  isQuotePost,
  isTextPost,
  isVideoPost,
} from "../../utils/postUnionGuards.ts";
import VideoPostCard from "./VideoPostCard.tsx";
import AudioPostCard from "./AudioPostCard.tsx";
import LinkPostCard from "./LinkPostCard.tsx";
import useLikePostMutation from "../../hooks/mutations/useLikePostMutation.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useState } from "react";
import CommentsSection from "../section/CommentsSection.tsx";
import useUnsavePostByUserPostCollectionMutation from "../../hooks/mutations/useUnsavePostByUserPostCollectionMutation.ts";
import SavePostInCollectionModal from "../modal/SavePostInCollectionModal.tsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  } = currentPost;

  const likesBySet = new Set(likesBy);
  const savedBySet = new Set(savedBy);
  const [isLiked, setIsLiked] = useState(likesBySet.has(Number(userId)));
  const [isSaved, setIsSaved] = useState(savedBySet.has(Number(userId)));
  const [likes, setLikes] = useState<number>(likesBySet.size);
  const [showComments, setShowComments] = useState(false);
  const [showSavePostModal, setShowSavePostModal] = useState(false);

  const [showLikes, setShowLikes] = useState(false);
  const [showShares, setShowShares] = useState(false);

  const { likePost } = useLikePostMutation(() => {
    setLikes((prevState) => prevState + 1);
    setIsLiked(true);
  });
  const { unsavePost } = useUnsavePostByUserPostCollectionMutation();

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

    if (isAudioPost(currentPost)) {
      return <AudioPostCard post={currentPost} />;
    }

    if (isLinkPost(currentPost)) {
      return <LinkPostCard post={currentPost} />;
    }

    return null;
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const onLikePost = () => {
    likePost(id);
  };

  return (
    <div
      className={
        "w-full h-auto p-5 flex-col gap-4 flex border-2 border-gray-600 rounded-lg bg-black-200"
      }
    >
      <header className={"w-full h-auto flex gap-4 items-center"}>
        <Avatar />
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
          <AnimatedButton
            className={"p-2 h-fit rounded-lg border-2"}
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            borderColor={"#222222"}
            borderColorHover={"#393939"}
            textColorHover={"#14b8a6"}
          >
            <MoreHorizontal className={"size-4"} />
          </AnimatedButton>

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
          <span
            key={tag}
            className={
              "text-sm px-2 py-1 rounded-full bg-teal-100 cursor-pointer text-black-100"
            }
          >
            #{tag}
          </span>
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
            bgColor={"#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            borderColor={"#222222"}
            borderColorHover={"#244541"}
            bgColorHover={"#244541"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <Share2 className={"size-4"} />
            122
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
    </div>
  );
};

export default DashboardPostCard;
