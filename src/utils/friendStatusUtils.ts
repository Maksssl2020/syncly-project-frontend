import type { FriendStatus } from "../types/friends.ts";

export const getBorderColor = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "PENDING":
      return "#eab308";
    default:
      return "#14b8a6";
  }
};

export const getTextColor = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "ACCEPTED":
    case "NONE":
      return "#14b8a6";
    case "PENDING":
      return "#eab308";
    default:
      return "#111111";
  }
};

export const getTextColorHover = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "ACCEPTED":
    case "PENDING":
      return "#ef4444";
    default:
      return "#111111";
  }
};

export const getBgColorHover = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "ACCEPTED":
    case "PENDING":
      return "#222222";
    default:
      return "#14b8a6";
  }
};

export const getBorderColorHover = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "ACCEPTED":
    case "PENDING":
      return "#ef4444";
    default:
      return "#14b8a6";
  }
};
