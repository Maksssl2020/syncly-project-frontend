import { useAuthenticationStore } from "../store/authenticationStore.ts";

function useAuthentication() {
  return useAuthenticationStore.getState().authentication;
}

export default useAuthentication;
