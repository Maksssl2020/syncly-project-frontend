import type { PostUnion } from "../../types/post.ts";
import type { UserItem } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  isLinkPost,
  isPhotoPost,
  isQuotePost,
  isTextPost,
  isVideoPost,
} from "../../utils/postUnionGuards.ts";
import TextPostCard from "./TextPostCard.tsx";
import QuotePostCard from "./QuotePostCard.tsx";
import PhotoPostCard from "./PhotoPostCard.tsx";
import VideoPostCard from "./VideoPostCard.tsx";
import LinkPostCard from "./LinkPostCard.tsx";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import useUnsharePostMutation from "../../hooks/mutations/useUnsharePostMutation.ts";

type SharedPostCardProps = {
  sharedBy: UserItem;
  post: PostUnion;
  sharedAt: string;
};

const SharedPostCard = ({ sharedBy, sharedAt, post }: SharedPostCardProps) => {
  const navigate = useNavigate();
  const { userId } = useAuthentication();
  const [isOriginalPostHover, setIsOriginalPostHover] = useState(false);

  const { unsharePost, unsharingPost } = useUnsharePostMutation();

  const renderPostContent = () => {
    if (isTextPost(post)) {
      return <TextPostCard post={post} />;
    }

    if (isQuotePost(post)) {
      return <QuotePostCard post={post} />;
    }

    if (isPhotoPost(post)) {
      return <PhotoPostCard post={post} />;
    }

    if (isVideoPost(post)) {
      return <VideoPostCard post={post} />;
    }

    if (isLinkPost(post)) {
      return <LinkPostCard post={post} />;
    }

    return null;
  };

  const postCreationDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  const postSharingDate = formatDistanceToNow(new Date(sharedAt), {
    addSuffix: true,
  });

  const onUnshareClick = () => {
    unsharePost(post.id);
  };

  return (
    <div
      className={
        "flex flex-col gap-4 bg-black-200 rounded-lg border-2 border-gray-600 p-5"
      }
    >
      <header className={"w-full h-auto flex gap-4 items-center"}>
        <Avatar avatar={sharedBy.userProfile.avatar} />
        <div className={"flex flex-col gap-1 text-white-100"}>
          <motion.h3
            whileHover={{
              color: "#14b8a6",
            }}
            className={"text-xl font-semibold cursor-pointer"}
          >
            {sharedBy.userProfile.displayName}
            <span className={"text-gray-400"}>
              {" "}
              <span className={"text-teal-100"}>shared</span> {post.authorName}
              's post
            </span>
          </motion.h3>
          <div className={"flex gap-1 text-gray-400"}>
            <motion.p
              whileHover={{
                color: "#14b8a6",
              }}
              className={"text-base cursor-pointer"}
            >
              @{sharedBy.username}
            </motion.p>
            <p>•</p>
            <p className={"text-base"}>{postSharingDate}</p>
          </div>
        </div>

        {sharedBy.userId === userId && (
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#4d4d4a"}
            borderColorHover={"#14b8a6"}
            onClick={onUnshareClick}
            loading={unsharingPost}
            className={"ml-auto h-[40px] px-8 rounded-lg"}
          >
            Stop Sharing
          </AnimatedButton>
        )}
      </header>
      <div className={"pt-6"}>
        <div
          onMouseEnter={() => setIsOriginalPostHover(true)}
          onMouseLeave={() => setIsOriginalPostHover(false)}
          className={
            "w-full h-auto p-5 relative flex-col gap-4 flex border border-teal-100 rounded-lg bg-black-200 overflow-hidden"
          }
        >
          <motion.div
            onClick={() => navigate(`/blog/${post.authorId}`)}
            animate={{
              opacity: isOriginalPostHover ? 1 : 0,
            }}
            className={
              "absolute w-full h-full bg-black-100/50 top-0 left-0 rounded-lg z-10 cursor-pointer"
            }
          />
          <header className={"w-full h-auto flex gap-4 items-center"}>
            <Avatar avatar={post.authorAvatar} />
            <div className={"flex flex-col gap-1 text-white-100"}>
              <h3 className={"text-xl font-semibold cursor-pointer"}>
                {post.authorName}
              </h3>
              <div className={"flex gap-1 text-gray-400"}>
                <p className={"text-base cursor-pointer"}>
                  @{post.authorUsername}
                </p>
                <p>•</p>
                <p className={"text-base"}>{postCreationDate}</p>
              </div>
            </div>
          </header>
          <div className="w-full h-auto flex flex-col gap-6">
            {renderPostContent()}
          </div>

          <div className={"flex flex-wrap gap-1"}>
            {post.tags.map((tag) => (
              <span
                key={tag.name + tag.id}
                style={{
                  backgroundColor: tag.color,
                }}
                className={
                  "text-sm px-2 py-1 rounded-full cursor-pointer text-black-100"
                }
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedPostCard;
