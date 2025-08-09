import axiosConfig from "../config/axiosConfig.ts";
import type { UserItem } from "../types/user.ts";
import type { FriendRequest, FriendUser } from "../types/friends.ts";

export async function fetchUserFriends() {
  const response = await axiosConfig.get<FriendUser[]>("/friends");
  return response.data;
}

export async function fetchUserFriendIds() {
  const response = await axiosConfig.get<number[]>("/ids");
  return response.data;
}

export async function fetchUserPendingFriendRequests() {
  const response = await axiosConfig.get<FriendRequest[]>("/friends/pending");
  return response.data;
}

export async function fetchUserSentFriendRequests() {
  const response = await axiosConfig.get<FriendRequest[]>("/friends/sent");
  return response.data;
}

export async function fetchUserSuggestedFriends() {
  const response = await axiosConfig.get<UserItem[]>("/friends/suggested");
  return response.data;
}

export async function fetchFriendRequestStatus(receiverId: string | number) {
  const response = await axiosConfig.get<string>(
    `/friends/request/status/${receiverId}`,
  );
  return response.data;
}

export async function handleSendFriendRequest(
  requesterId: string | number,
  receiverId: string | number,
) {
  const response = await axiosConfig.post("/friends/send/request", null, {
    params: {
      requesterId,
      receiverId,
    },
  });
  return response.data;
}

export async function handleAcceptFriendRequest(requestId: string | number) {
  const response = await axiosConfig.post("/friends/accept/request", null, {
    params: {
      requestId,
    },
  });
  return response.data;
}

export async function handleBlockUser(
  userId: string | number,
  blockedUserId: string | number,
) {
  const response = await axiosConfig.post("/friends/block/user", null, {
    params: {
      userId,
      blockedUserId,
    },
  });
  return response.data;
}

export async function handleDeclineFriendRequest(requestId: string | number) {
  const response = await axiosConfig.delete("/friends/decline/request", {
    params: {
      requestId,
    },
  });
  return response.data;
}

export async function handleDeleteFriend(
  userId: string | number,
  friendId: string | number,
) {
  const response = await axiosConfig.delete("/friends/remove/friend", {
    params: {
      userId,
      friendId,
    },
  });
  return response.data;
}

export async function handleDeleteFriendRequest(receiverId: string | number) {
  const response = await axiosConfig.delete(
    `/friends/remove/request/${receiverId}`,
  );
  return response.data;
}
