import type { Tag } from "../types/tags.ts";
import { useEffect, useState } from "react";
import useCreateCommonTagMutation from "./mutations/useCreateCommonTagMutation.ts";
import useAllEnabledTagsQuery from "./queries/useAllEnabledTagsQuery.ts";

function useTagSelection(itemTags?: Tag[]) {
  const { allEnabledTagsData, fetchingAllEnabledTagsData } =
    useAllEnabledTagsQuery();
  const { createCommonTag, creatingCommonTag } = useCreateCommonTagMutation();
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
    if (allEnabledTagsData) {
      const tagsData: Tag[] = allEnabledTagsData.map((tag) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      }));

      setAvailableTags(tagsData);
    }
  }, [allEnabledTagsData]);

  const selectTag = (tag: Tag) => {
    const updatedTags = [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setAvailableTags(availableTags.filter((t) => t.id !== tag.id));
    return updatedTags;
  };

  const onCreateCommonTag = async (name: string) => {
    const createdTag = await createCommonTag({
      name,
    });
    return selectTag(createdTag);
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
    onCreateCommonTag,
    creatingCommonTag,
    fetchingAllEnabledTagsData,
  };
}

export default useTagSelection;
