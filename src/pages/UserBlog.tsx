import Page from "../animation/Page.tsx";
import Avatar from "../components/img/Avatar.tsx";
import {
  Calendar,
  ExternalLinkIcon,
  Grid3X3,
  ImageIcon,
  LinkIcon,
  MailIcon,
  MapPin,
  Quote,
  TextIcon,
  Video
} from "lucide-react";
import { useMemo, useState } from "react";
import type { TabData } from "../types/types.ts";
import Tabs from "../components/tab/Tabs.tsx";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import useUserProfileByUserIdQuery from "../hooks/queries/useUserProfileByUserIdQuery.ts";
import useAuthentication from "../hooks/useAuthentication.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { format } from "date-fns";
import usePostsByUserIdQuery from "../hooks/queries/usePostsByUserIdQuery.ts";
import { useNavigate, useParams } from "react-router-dom";
import useSharedPostsByUserIdQuery from "../hooks/queries/useSharedPostsByUserIdQuery.ts";
import type { PostUnion } from "../types/post.ts";
import type { UserItem } from "../types/user.ts";
import SharedPostCard from "../components/card/SharedPostCard.tsx";
import useUserSettingsByUserIdQuery from "../hooks/queries/useUserSettingsByUserIdQuery.ts";
import useIsUserFollowedByUserProfileIdQuery from "../hooks/queries/useIsUserFollowedByUserProfileIdQuery.ts";
import ComponentSpinner from "../components/spinner/ComponentSpinner.tsx";
import useFriendRequestStatusQuery from "../hooks/queries/useFriendRequestStatusQuery.ts";
import FollowButton from "../components/button/FollowButton.tsx";
import FriendButton from "../components/button/FriendButton.tsx";
import MessageButton from "../components/button/MessageButton.tsx";

type FilterType =
  | "ALL"
  | "TEXT"
  | "QUOTE"
  | "VIDEO"
  | "LINK"
  | "PHOTO"
  | "SHARED";

type UserBlogProps = {
  isSignedInUserBlog?: boolean;
};

type UserBlogPost = {
  sharedBy?: UserItem;
  postDate: string;
  isShared: boolean;
  post: PostUnion;
};

const UserBlog = ({ isSignedInUserBlog = false }: UserBlogProps) => {
  const { id } = useParams();
  const { userId } = useAuthentication();
  const [chosenFilter, setChosenFilter] = useState<FilterType>("ALL");
  const navigate = useNavigate();

  const targetUserId = isSignedInUserBlog ? userId : id;

  const { userProfile, fetchingUserProfile } =
    useUserProfileByUserIdQuery(targetUserId);

  const { userPosts, fetchingUserPosts } = usePostsByUserIdQuery(targetUserId);

  const { userSettings, fetchingUserSettings } =
    useUserSettingsByUserIdQuery(targetUserId);

  const { sharedPostsByUserId, fetchingSharedPostsByUserId } =
    useSharedPostsByUserIdQuery(targetUserId);

  const { isUserFollowedData, fetchingIsUserFollowed } =
    useIsUserFollowedByUserProfileIdQuery(id);

  const { friendRequestStatus, fetchingFriendRequestStatus } =
    useFriendRequestStatusQuery(id);

  const userBlogPosts = useMemo<UserBlogPost[]>(() => {
    const mappedUserPosts: UserBlogPost[] =
      userPosts?.map((post) => ({
        sharedBy: undefined,
        postDate: post.createdAt,
        isShared: false,
        post,
      })) ?? [];

    const mappedSharedPosts: UserBlogPost[] =
      sharedPostsByUserId?.map((sharedPost) => ({
        sharedBy: sharedPost.sharedBy,
        isShared: true,
        post: sharedPost.originalPost,
        postDate: sharedPost.sharedAt,
      })) ?? [];

    return [...mappedUserPosts, ...mappedSharedPosts];
  }, [userPosts, sharedPostsByUserId]);

  const filteredPosts = useMemo(() => {
    return userBlogPosts.filter((item) => {
      if (chosenFilter === "ALL") {
        return true;
      }

      if (chosenFilter === "SHARED") {
        return item.isShared;
      }

      return item.post.postType === chosenFilter && !item.isShared;
    });
  }, [chosenFilter, userBlogPosts]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort(
      (a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime(),
    );
  }, [filteredPosts]);

  if (
    fetchingUserProfile ||
    !userProfile ||
    fetchingUserPosts ||
    fetchingSharedPostsByUserId ||
    fetchingUserSettings
  ) {
    return <Spinner />;
  }

  const filterOptions: TabData[] = [
    {
      id: "ALL",
      label: "All",
      icon: <Grid3X3 className="size-4" />,
      count: userBlogPosts.length,
      color: "#14b8a6",
    },
    {
      id: "SHARED",
      label: "Shared",
      icon: <ExternalLinkIcon className="size-4" />,
      count: userBlogPosts.filter((userPost) => userPost.isShared).length,
      color: "#14b8a6",
    },
    {
      id: "TEXT",
      label: "Text",
      icon: <TextIcon className="size-4" />,
      count: userBlogPosts.filter(
        (userPost) => userPost.post.postType === "TEXT" && !userPost.isShared,
      ).length,
      color: "#0d9488",
    },
    {
      id: "LINK",
      label: "Link",
      icon: <LinkIcon className="size-4" />,
      count: userBlogPosts.filter(
        (userPost) => userPost.post.postType === "LINK" && !userPost.isShared,
      ).length,
      color: "#0d9488",
    },
    {
      id: "PHOTO",
      label: "Photos",
      icon: <ImageIcon className="size-4" />,
      count: userBlogPosts.filter(
        (userPost) => userPost.post.postType === "PHOTO" && !userPost.isShared,
      ).length,
      color: "#14b8a6",
    },
    {
      id: "VIDEO",
      label: "Videos",
      icon: <Video className="size-4" />,
      count: userBlogPosts.filter(
        (userPost) => userPost.post.postType === "VIDEO" && !userPost.isShared,
      ).length,
      color: "#22d3ee",
    },
    {
      id: "QUOTE",
      label: "Quotes",
      icon: <Quote className="size-4" />,
      count: userBlogPosts.filter(
        (userPost) => userPost.post.postType === "QUOTE" && !userPost.isShared,
      ).length,
      color: "#06b6d4",
    },
  ];

  const {
    displayName,
    username,
    bio,
    location,
    email,
    joinedAt,
    website,
    followersCount,
    followingCount,
    profileLikes,
    avatar,
  } = userProfile;

  const userStats = [
    { label: "Posts", value: userPosts?.length ?? 0 },
    { label: "Followers", value: followersCount },
    { label: "Following", value: followingCount },
    {
      label: "Likes",
      value: profileLikes,
    },
  ];

  const isFriend = friendRequestStatus?.friendStatus === "ACCEPTED";

  return (
    <Page className="w-full mt-8 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        <div className="w-full flex-col rounded-lg bg-black-200 p-8">
          <div className="w-full h-full gap-8 flex">
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <Avatar size="size-32" avatar={avatar} />

              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-white-100">
                  {displayName}
                </h1>
                <p className="text-xl text-gray-300">@{username}</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {userStats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white-100">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-gray-300">
                {userSettings?.showLocation && location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{location}</span>
                  </div>
                )}

                {userSettings?.showEmail && (
                  <div className="flex items-center gap-2">
                    <MailIcon className="size-4" />
                    <span>{email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>Joined in {format(new Date(joinedAt), "yyyy")}</span>
                </div>

                {website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="size-4" />
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-teal-100"
                    >
                      {website}
                    </a>
                  </div>
                )}
              </div>

              <p className="text-lg leading-relaxed text-white-100">{bio}</p>
            </div>
          </div>

          {!isSignedInUserBlog && (
            <div className="flex gap-3 w-auto items-center mt-5">
              {fetchingIsUserFollowed ? (
                <ComponentSpinner size={12} />
              ) : (
                <FollowButton
                  isFollowed={isUserFollowedData ?? false}
                  userId={id}
                />
              )}

              {fetchingFriendRequestStatus ? (
                <ComponentSpinner size={12} />
              ) : (
                <FriendButton
                  friendRequestStatus={friendRequestStatus?.friendStatus}
                  receiverId={id}
                />
              )}

              {isFriend && (
                <MessageButton
                  className="rounded-lg w-full px-4 py-2 border-2"
                  onClick={() => navigate(`/conversation/${id}/${username}`)}
                />
              )}
            </div>
          )}
        </div>

        <div className="rounded-lg p-6 border-2 w-full bg-black-200 border-gray-600 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <Tabs
              data={filterOptions}
              activeTabId={chosenFilter}
              onClick={(id) => setChosenFilter(id as FilterType)}
            />
          </div>
        </div>

        <motion.div className="space-y-6">
          {sortedPosts.map((item, index) => (
            <motion.div
              key={`${item.isShared ? "shared" : "post"}-${item.post.id}-${item.postDate}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.isShared && item.sharedBy ? (
                <SharedPostCard
                  sharedBy={item.sharedBy}
                  post={item.post}
                  sharedAt={item.postDate}
                />
              ) : (
                <DashboardPostCard post={item.post} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Page>
  );
};

export default UserBlog;
