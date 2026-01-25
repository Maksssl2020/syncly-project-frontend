import Page from "../animation/Page.tsx";
import Avatar from "../components/img/Avatar.tsx";
import {
  Calendar,
  ExternalLinkIcon,
  Grid3X3,
  ImageIcon,
  LinkIcon,
  MapPin,
  Quote,
  TextIcon,
  Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TabData } from "../types/types.ts";
import Tabs from "../components/tab/Tabs.tsx";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import useUserProfileByUserIdQuery from "../hooks/queries/useUserProfileByUserIdQuery.ts";
import useAuthentication from "../hooks/useAuthentication.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { format } from "date-fns";
import usePostsByUserIdQuery from "../hooks/queries/usePostsByUserIdQuery.ts";
import { useParams } from "react-router-dom";
import useSharedPostsByUserIdQuery from "../hooks/queries/useSharedPostsByUserIdQuery.ts";
import type { PostUnion } from "../types/post.ts";
import type { UserItem } from "../types/user.ts";
import SharedPostCard from "../components/card/SharedPostCard.tsx";
import useUserSettingsByUserIdQuery from "../hooks/queries/useUserSettingsByUserIdQuery.ts";

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
  sharedBy: UserItem | undefined;
  postDate: string;
  isShared: boolean;
  post: PostUnion;
};

const UserBlog = ({ isSignedInUserBlog = false }: UserBlogProps) => {
  const { id } = useParams();
  const { userId } = useAuthentication();
  const [chosenFilter, setChosenFilter] = useState<FilterType>("ALL");
  const [userBlogPosts, setUserBlogPosts] = useState<UserBlogPost[]>([]);

  const { userProfile, fetchingUserProfile } = useUserProfileByUserIdQuery(
    isSignedInUserBlog ? userId : id,
  );
  const { userPosts, fetchingUserPosts } = usePostsByUserIdQuery(
    isSignedInUserBlog ? userId : id,
  );
  const { userSettings, fetchingUserSettings } = useUserSettingsByUserIdQuery(
    isSignedInUserBlog ? userId : id,
  );

  const { sharedPostsByUserId, fetchingSharedPostsByUserId } =
    useSharedPostsByUserIdQuery(isSignedInUserBlog ? userId : id);

  useEffect(() => {
    if (userPosts && !fetchingUserPosts) {
      const mappedUserPosts: UserBlogPost[] = userPosts.map((post) => ({
        sharedBy: undefined,
        postDate: post.createdAt,
        isShared: false,
        post: post,
      }));

      setUserBlogPosts(mappedUserPosts);
    }
  }, [fetchingUserPosts, userPosts]);

  useEffect(() => {
    if (sharedPostsByUserId && !fetchingSharedPostsByUserId) {
      const mappedUserPosts: UserBlogPost[] = sharedPostsByUserId.map(
        (post) => ({
          sharedBy: post.sharedBy,
          isShared: true,
          post: post.originalPost,
          postDate: post.sharedAt,
        }),
      );

      setUserBlogPosts((prevState) => [...prevState, ...mappedUserPosts]);
    }
  }, [fetchingSharedPostsByUserId, sharedPostsByUserId]);

  const filteredPosts = useMemo(() => {
    return [...userBlogPosts].filter((post) => {
      if (chosenFilter === "ALL") {
        return post;
      } else if (chosenFilter === "SHARED") {
        return post.isShared;
      } else {
        return post.post.postType === chosenFilter && !post.isShared;
      }
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

  console.log("userBlogPosts", userBlogPosts);

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className={"max-w-6xl w-full flex flex-col gap-8"}>
        <div className={"w-full h-full gap-8 flex rounded-lg bg-black-200 p-8"}>
          <div className={"flex flex-col gap-4 items-center lg:items-start"}>
            <Avatar size={"size-32"} avatar={avatar} />
            <div className={"text-center lg:text-left"}>
              <h1 className={"text-3xl font-bold text-white-100"}>
                {displayName}
              </h1>
              <p className={"text-xl text-gray-300"}>@{username}</p>
            </div>
          </div>
          <div className={"flex-1 space-y-4"}>
            <div className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
              {userStats.map((stat, index) => (
                <div key={index} className={"text-center lg:text-left"}>
                  <div className={"text-2xl font-bold text-white-100"}>
                    {stat.value}
                  </div>
                  <div className={"text-gray-400"}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className={"flex flex-wrap gap-4 text-gray-300"}>
              {userSettings?.showLocation && location && (
                <div className={"flex items-center gap-2"}>
                  <MapPin className={"size-4"} />
                  <span>{location}</span>
                </div>
              )}
              <div className={"flex items-center gap-2"}>
                <Calendar className={"size-4"} />
                <span>Joined in {format(joinedAt, "yyyy")}</span>
              </div>
              {website && (
                <div className={"flex items-center gap-2"}>
                  <LinkIcon className={"size-4"} />
                  <a href={"#"} className={"hover:underline text-teal-100"}>
                    {website}
                  </a>
                </div>
              )}
            </div>
            <p className={"text-lg leading-relaxed text-white-100"}>{bio}</p>
          </div>
        </div>

        <div
          className={
            "rounded-lg p-6 border-2 w-full bg-black-200 border-gray-600 mb-8"
          }
        >
          <div
            className={
              "flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
            }
          >
            <Tabs
              data={filterOptions}
              activeTabId={chosenFilter}
              onClick={(id) => setChosenFilter(id as FilterType)}
            />
          </div>
        </div>

        <motion.div className={"space-y-6"}>
          {sortedPosts?.map((post, index) => (
            <motion.div
              key={post.post.id ?? index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {post.isShared ? (
                <SharedPostCard
                  sharedBy={post.sharedBy!}
                  post={post.post}
                  sharedAt={post.postDate}
                />
              ) : (
                <DashboardPostCard post={post.post} />
              )}
              ,
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Page>
  );
};

export default UserBlog;
