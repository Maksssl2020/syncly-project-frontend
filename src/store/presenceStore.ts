import type { PresenceMessage } from "../types/conversation";
import { create } from "zustand/react";
import { persist, type PersistStorage } from "zustand/middleware";

type PresenceState = {
  presenceMap: Record<string, PresenceMessage>;
  setPresence: (userId: string | number, presence: PresenceMessage) => void;
};

const sessionStorageAdapter: PersistStorage<PresenceState> = {
  getItem: (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
};

export const usePresenceStore = create(
  persist<PresenceState>(
    (set) => ({
      presenceMap: {},
      setPresence: (userId, presence) =>
        set((state) => ({
          presenceMap: { ...state.presenceMap, [userId]: presence },
        })),
    }),
    {
      name: "presence-storage",
      storage: sessionStorageAdapter,
    },
  ),
);
