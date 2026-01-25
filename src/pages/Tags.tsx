import Page from "../animation/Page.tsx";
import TagsSidebar from "../components/sidebar/TagsSidebar.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";
import type { TabData } from "../types/types.ts";
import { Clock, Eye, Hash, TrendingUp } from "lucide-react";
import Tabs from "../components/tab/Tabs.tsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TagCard from "../components/card/TagCard.tsx";
import useAllTagsQuery from "../hooks/queries/useAllTagsQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useFollowedTagsQuery from "../hooks/queries/useFollowedTagsQuery.ts";
import useFollowTagMutation from "../hooks/mutations/useFollowTagMutation.ts";
import useUnfollowTagMutation from "../hooks/mutations/useUnfollowTagMutation.ts";
import { isThisWeek } from "date-fns";

const Tags = () => {
  const { allTagsData, fetchingAllTagsData } = useAllTagsQuery();
  const { followedTags, fetchingFollowedTags } = useFollowedTagsQuery();
  const { followTag, followingTag } = useFollowTagMutation();
  const { unfollowTag, unfollowingTag } = useUnfollowTagMutation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chosenTab, setChosenTab] = useState<string>("all");
  const [followingTags, setFollowingTags] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    if (followedTags && !fetchingFollowedTags) {
      const mappedTags = followedTags.map((tag) => tag.name.toLowerCase());
      console.log(mappedTags);
      const uniqueTags = new Set(mappedTags);
      setFollowingTags(uniqueTags);
    }
  }, [fetchingFollowedTags, followedTags]);

  if (fetchingAllTagsData || !allTagsData || fetchingFollowedTags) {
    return <Spinner />;
  }

  const tabsData: TabData[] = [
    {
      id: "all",
      label: "All Tags",
      icon: <Hash className="size-4" />,
      count: allTagsData.length,
      color: "#14b8a6",
    },
    {
      id: "following",
      label: "Following",
      icon: <Eye className="size-4" />,
      count: followingTags.size,
      color: "#22d3ee",
    },
    {
      id: "trending",
      label: "Trending",
      icon: <TrendingUp className="size-4" />,
      count: allTagsData.filter((tag) => tag.trending).length,
      color: "#0d9488",
    },
    {
      id: "recent",
      label: "Recent",
      icon: <Clock className="size-4" />,
      count: allTagsData.filter((tag) => isThisWeek(tag.createdAt)).length,
      color: "#0d9488",
    },
  ];

  console.log(followedTags);

  const onFollowToggle = (
    isFollowed: boolean,
    tagId: string | number,
    tagName: string,
  ) => {
    if (isFollowed) {
      unfollowTag(tagId);
    } else {
      followTag({ tagId, tagName });
    }
  };

  const filteredTags = allTagsData.filter((tag) => {
    const matchesSearch = tag.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      chosenTab === "all" ||
      (chosenTab === "following" &&
        followingTags.has(tag.name.toLowerCase())) ||
      (chosenTab === "trending" && tag.trending) ||
      (chosenTab === "recent" && isThisWeek(tag.createdAt));

    return matchesSearch && matchesFilter;
  });

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className={"grid grid-cols-1 lg:grid-cols-4 gap-8"}>
          <TagsSidebar
            tagsData={allTagsData}
            followedTags={followingTags}
            searchQuery={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
          <div className={"lg:col-span-3 space-y-6"}>
            <PageHeaderContainer>
              <Tabs
                data={tabsData}
                activeTabId={chosenTab}
                onClick={(id) => setChosenTab(id)}
              />
              <div className={"flex items-center gap-2"}>
                <span className={"text-sm text-gray-400"}>
                  {filteredTags.length} tags found
                </span>
              </div>
            </PageHeaderContainer>

            <motion.div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
              {filteredTags.map((tag, index) => (
                <TagCard
                  tag={tag}
                  index={index}
                  isFollowed={followingTags.has(tag.name.toLowerCase())}
                  onToggleFollow={(isFollowed, tagId) =>
                    onFollowToggle(isFollowed, tagId, tag.name)
                  }
                  loading={followingTag || unfollowingTag}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Tags;
