import type { Tag } from "../types/tags.ts";
import { useEffect, useState } from "react";

const POPULAR_TAGS: Tag[] = [
  { id: "1", name: "photography" },
  { id: "2", name: "art" },
  { id: "3", name: "music" },
  { id: "4", name: "travel" },
  { id: "5", name: "food" },
  { id: "6", name: "nature" },
  { id: "7", name: "fashion" },
  { id: "8", name: "technology" },
  { id: "9", name: "fitness" },
  { id: "10", name: "books" },
  { id: "11", name: "movies" },
  { id: "12", name: "gaming" },
  { id: "13", name: "design" },
  { id: "14", name: "lifestyle" },
  { id: "15", name: "quotes" },
];

function useTagSelection(itemTags?: Tag[]) {
  const tags: Tag[] = POPULAR_TAGS;
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (itemTags) {
      setSelectedTags(itemTags);
      setAvailableTags(
        tags.filter((tag) => !itemTags.some((t) => t.id === tag.id)),
      );
    } else {
      setAvailableTags(tags);
    }
  }, [itemTags]);

  const selectTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
    setAvailableTags(availableTags.filter((t) => t.id !== tag.id));
  };

  const removeTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    setAvailableTags([...availableTags, tag]);
  };

  const resetTags = () => {
    setAvailableTags(tags);
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
  };
}

export default useTagSelection;
