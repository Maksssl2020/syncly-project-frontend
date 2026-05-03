import { EyeIcon, EyeOffIcon } from "lucide-react";
import AnimatedButton from "./AnimatedButton.tsx";
import useFollowUserMutation from "../../hooks/mutations/useFollowUserMutation.ts";
import useUnfollowUserMutation from "../../hooks/mutations/useUnfollowUserMutation.ts";

type FollowButton = {
  isFollowed: boolean;
  userId?: string | number;
};

const FollowButton = ({ isFollowed, userId }: FollowButton) => {
  const { followUser, followingUser } = useFollowUserMutation();
  const { unfollowUser, unfollowingUser } = useUnfollowUserMutation();

  const onFollowUserClick = () => {
    if (userId) {
      if (isFollowed) {
        unfollowUser(userId);
      } else {
        followUser(userId);
      }
    }
  };

  return (
    <AnimatedButton
      className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 border-2`}
      bgColor={"#222222"}
      bgColorHover={isFollowed ? "#4D3232" : "#14b8a6"}
      textColor={isFollowed ? "#ef4444" : "#14b8a6"}
      textColorHover={"#111111"}
      borderColor={isFollowed ? "#ef4444" : "#14b8a6"}
      borderColorHover={isFollowed ? "#4D3232" : "#14b8a6"}
      onClick={onFollowUserClick}
      loading={followingUser || unfollowingUser}
    >
      {isFollowed ? (
        <EyeOffIcon className={"size-5"} />
      ) : (
        <EyeIcon className={"size-5"} />
      )}
      {isFollowed ? "Unfollow" : "Follow"}
    </AnimatedButton>
  );
};
export default FollowButton;
