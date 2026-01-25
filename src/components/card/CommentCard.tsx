import { AnimatePresence, motion } from "framer-motion";
import type { Comment } from "../../types/comment.ts";
import Avatar from "../img/Avatar.tsx";
import { formatTimeAgo } from "../../utils/dateUtils.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { CheckIcon, ChevronDown, ChevronUp, Heart, Reply, Send, XIcon } from "lucide-react";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication.ts";
import useAddPostCommentReplyMutation from "../../hooks/mutations/useAddPostCommentReplyMutation.ts";
import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import useLikePostCommentMutation from "../../hooks/mutations/useLikePostCommentMutation.ts";
import useUnlikePostCommentMutation from "../../hooks/mutations/useUnlikePostCommentMutation.ts";
import CommentOptionsDropdown from "../dropdown/CommentOptionsDropdown.tsx";

type CommentCardProps = {
  comment: Comment;
  isReply: boolean;
  onDelete: (commentId: string | number) => void;
  onUpdate: (commentId: string | number, content: string) => void;
  onReport: (comment: Comment) => void;
};

const CommentCard = ({
  comment,
  isReply = false,
  onDelete,
  onUpdate,
  onReport,
}: CommentCardProps) => {
  const { userId } = useAuthentication();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      content: "",
      newContent: comment.content,
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const {
    authorImage,
    authorUsername,
    authorName,
    content,
    likesBy,
    replies,
    id,
    createdAt,
    postId,
  } = comment;

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );
  const likesBySet = new Set(likesBy);
  const [isLiked, setIsLiked] = useState(likesBySet.has(Number(userId)));
  const [likes, setLikes] = useState<number>(likesBySet.size);

  const { addPostCommentReply, addingPostCommentReply } =
    useAddPostCommentReplyMutation();
  const { likePostComment } = useLikePostCommentMutation(() => {
    setLikes((prevState) => prevState + 1);
    setIsLiked(true);
  });
  const { unlikePostComment } = useUnlikePostCommentMutation(() => {
    setLikes((prevState) => prevState - 1);
    setIsLiked(false);
  });

  const onLikeComment = () => {
    if (!isLiked) {
      likePostComment(comment.id);
    } else {
      unlikePostComment(comment.id);
    }
  };

  const onAddCommentReply = async (content: string, parentId: number) => {
    if (!content.trim() || !userId) return;

    await addPostCommentReply({
      postId: postId,
      data: {
        userId: userId,
        parentCommentId: parentId,
        content: content,
      },
    });

    setReplyingTo(null);
  };

  const onUpdateComment = () => {
    const newCommentContent = watch("newContent");
    onUpdate(comment.id, newCommentContent);
    setIsEditing(false);
  };

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isReply ? "ml-12 mt-3" : "mb-4"}`}
    >
      <Avatar avatar={authorImage} size={isReply ? "size-8" : "size-10"} />
      <div className="flex-1">
        <div className="bg-black-300 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-white-100 text-sm">
              {authorName}
            </h4>
            <span className="text-xs text-gray-400">@{authorUsername}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">
              {formatTimeAgo(createdAt)}
            </span>
          </div>
          {isEditing ? (
            <div className={"flex w-full gap-4"}>
              <input
                className={
                  "w-full px-2 h-[35px] outline-none text-white-100 text-sm leading-relaxed border border-gray-600 rounded-lg"
                }
                {...register("newContent")}
              />
              <div className={"flex gap-1"}>
                <AnimatedButton
                  borderColor={"#22c55e"}
                  borderColorHover={"#22c55e"}
                  textColor={"#22c55e"}
                  bgColorHover={"#22c55e"}
                  onClick={onUpdateComment}
                  disabled={watch("newContent").length === 0}
                  className={
                    "size-8 rounded-full flex items-center justify-center border"
                  }
                >
                  <CheckIcon className={"size-4"} />
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => setIsEditing(false)}
                  borderColor={"#ef4444"}
                  borderColorHover={"#ef4444"}
                  textColor={"#ef4444"}
                  bgColorHover={"#ef4444"}
                  className={
                    "size-8 rounded-full flex items-center justify-center border"
                  }
                >
                  <XIcon className={"size-4"} />
                </AnimatedButton>
              </div>
            </div>
          ) : (
            <p className="text-white-100 text-sm leading-relaxed">{content}</p>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2 ml-2">
          <AnimatedButton
            onClick={() => onLikeComment()}
            borderColor={"transparent"}
            className="flex items-center gap-1 text-xs"
            bgColor="transparent"
            bgColorHover="transparent"
            textColor={isLiked ? "#ef4444" : "#9ca3af"}
            textColorHover="#ef4444"
          >
            <Heart className={`size-4 `} />
            {likes > 0 && likes}
          </AnimatedButton>

          {!isReply && (
            <AnimatedButton
              onClick={() => setReplyingTo(replyingTo === id ? null : id)}
              className="text-xs items-center flex"
              bgColor="transparent"
              borderColor={"transparent"}
              bgColorHover="transparent"
              textColor="#9ca3af"
              textColorHover="#14b8a6"
            >
              <Reply className="size-4 mr-1" />
              Reply
            </AnimatedButton>
          )}

          <CommentOptionsDropdown
            authorId={comment.authorId}
            onDeleteClick={() => onDelete(comment.id)}
            onEditClick={() => setIsEditing(true)}
            onReportClick={() => onReport(comment)}
          />
        </div>

        {replyingTo === comment.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex gap-3 w-full items-center"
          >
            <Avatar size="size-8" />
            <div className="flex-1">
              <FormInput
                title={""}
                type={"text"}
                showError={false}
                inputClassname={"rounded-full"}
                placeholder={"Write a comment..."}
                register={register("content", {
                  required: {
                    value: true,
                    message: "Please enter a comment reply.",
                  },
                })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit((data) =>
                      onAddCommentReply(data.content, comment.id),
                    )();
                  }
                }}
              />
            </div>
            <AnimatedButton
              onClick={() =>
                handleSubmit((data) =>
                  onAddCommentReply(data.content, comment.id),
                )
              }
              className="rounded-full size-10 flex items-center justify-center"
              bgColor="#14b8a6"
              bgColorHover="#0d9488"
              textColor="#0a0a0c"
              loading={addingPostCommentReply}
            >
              <Send className="size-4" />
            </AnimatedButton>
          </motion.div>
        )}

        {replies.length > 0 && (
          <div className="mt-3">
            <AnimatedButton
              onClick={() => toggleReplies(comment.id)}
              className="flex items-center gap-1 text-xs mb-2"
              bgColor="transparent"
              bgColorHover="transparent"
              textColor="#9ca3af"
              textColorHover="#14b8a6"
              borderColor={"transparent"}
            >
              {expandedComments.has(comment.id) ? (
                <>
                  <ChevronUp className="size-3" />
                  Hide {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </>
              ) : (
                <>
                  <ChevronDown className="size-3" />
                  View {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </>
              )}
            </AnimatedButton>

            <AnimatePresence>
              {expandedComments.has(comment.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      isReply={true}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      onReport={onReport}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CommentCard;
