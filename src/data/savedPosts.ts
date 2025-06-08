import type { SavedPostCategory } from "../types/savedPosts.ts";

export const savedPostCategories: SavedPostCategory[] = [
  {
    id: "all",
    name: "All Saved",
    count: 47,
    color: "#14b8a6",
  },
  {
    id: "inspiration",
    name: "Inspiration",
    count: 15,
    color: "#22d3ee",
  },
  {
    id: "tutorials",
    name: "Tutorials",
    count: 42,
    color: "#0d9488",
  },
  {
    id: "favourites",
    name: "Favourites",
    count: 22,
    color: "#06b6d4",
  },
  {
    id: "read-later",
    name: "Read Later",
    count: 12,
    color: "#14b8a6",
  },
];
