import type { Tag } from "../types/tags.ts";
import { useEffect, useState } from "react";
import useAllTagsQuery from "./queries/useAllTagsQuery.ts";

function useTagSelection(itemTags?: Tag[]) {
  const { allTagsData, fetchingAllTagsData } = useAllTagsQuery();
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (itemTags) {
      setSelectedTags(itemTags);
    }
  }, [itemTags]);

  useEffect(() => {
    if (allTagsData) {
      const tagsData: Tag[] = allTagsData.map((tag) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      }));

      setAvailableTags(tagsData);
    }
  }, [allTagsData]);

  const selectTag = (tag: Tag) => {
    const updatedTags = [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setAvailableTags(availableTags.filter((t) => t.id !== tag.id));
    return updatedTags;
  };

  const removeTag = (tag: Tag) => {
    const updatedTags = selectedTags.filter((t) => t.id !== tag.id);
    setSelectedTags(updatedTags);
    setAvailableTags([...availableTags, tag]);
    return updatedTags;
  };

  const resetTags = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  return {
    selectedTags,
    availableTags,
    filteredTags,
    selectTag,
    removeTag,
    resetTags,
    searchQuery,
    setSearchQuery,
    fetchingAllTagsData,
  };
}

export default useTagSelection;
