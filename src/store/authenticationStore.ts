import type {
  Authentication,
  AuthenticationResponse,
} from "../types/authentication.ts";
import { persist, type PersistStorage } from "zustand/middleware";
import { create } from "zustand/react";

type AuthenticationState = {
  authentication: Authentication;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
};

const sessionStorageAdapter: PersistStorage<AuthenticationState> = {
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

const initialState: Authentication = {
  userId: undefined,
  username: "",
  role: "",
  accessToken: "",
  authenticated: false,
};

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (setState) => ({
      authentication: initialState,
      login: (data) =>
        setState({
          authentication: {
            authenticated: true,
            ...data,
          },
        }),
      logout: () => setState({ authentication: initialState }),
    }),
    {
      name: "auth-storage",
      storage: sessionStorageAdapter,
    },
  ),
);
