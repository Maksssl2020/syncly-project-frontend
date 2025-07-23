import { motion } from "framer-motion";
import Avatar from "../img/Avatar";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { MessageCircle, Send } from "lucide-react";
import CommentCard from "../card/CommentCard.tsx";
import type { Comment } from "../../types/comment.ts";
import useAddPostCommentMutation from "../../hooks/mutations/useAddPostCommentMutation.ts";
import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useState } from "react";
import usePostCommentsQuery from "../../hooks/queries/usePostCommentsQuery.ts";
import Spinner from "../spinner/Spinner.tsx";

type CommentsSectionProps = {
  postId: string | number;
};

const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const { userId } = useAuthentication();
  const { postComments, fetchingPostComments } = usePostCommentsQuery(postId);
  const [postCommentsData, setPostCommentsData] = useState<Comment[]>(
    postComments ?? [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const { addPostComment, addingPostComment } = useAddPostCommentMutation();

  const onAddComment = async (content: string) => {
    console.log(content);
    console.log(userId);

    if (userId) {
      const addedComment = await addPostComment({
        userId: userId,
        postId: postId,
        content: content,
      });
      setPostCommentsData([...postCommentsData, addedComment]);
    }
  };

  if (fetchingPostComments) {
    return <Spinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t-2 border-gray-600 pt-4 space-y-4"
    >
      {/* Add Comment */}
      <div className="flex w-full items-center gap-3">
        <Avatar />
        <div className={"flex-1"}>
          <FormInput
            title={""}
            type={"text"}
            showError={false}
            inputClassname={"rounded-full"}
            placeholder={"Write a comment..."}
            register={register("content", {
              required: {
                value: true,
                message: "Please enter a comment.",
              },
            })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit((data) => onAddComment(data.content))();
              }
            }}
          />
        </div>

        <AnimatedButton
          onClick={handleSubmit((data) => onAddComment(data.content))}
          className=" rounded-full min-w-12 min-h-12 items-center flex justify-center items-center"
          bgColor="#14b8a6"
          bgColorHover="#0d9488"
          textColor="#0a0a0c"
          loading={addingPostComment}
        >
          <Send className="size-5" />
        </AnimatedButton>
      </div>

      <div className="space-y-1">
        {postCommentsData.map((comment) => (
          <CommentCard key={comment.id} comment={comment} isReply={false} />
        ))}
      </div>

      {postCommentsData.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <MessageCircle className="size-12 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </motion.div>
  );
};

export default CommentsSection;
