import { useMutation } from "@tanstack/react-query";
import type { SignInRequest } from "../../types/authentication.ts";
import { handleSignIn } from "../../api/authentication.ts";
import { useAuthenticationStore } from "../../store/authenticationStore.ts";
import { connectStomp } from "../../config/stompClient.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";

function useSignInMutation() {
  const navigate = useNavigate();

  const { mutate: signIn, isPending: signingIn } = useMutation({
    mutationKey: ["signInUser"],
    mutationFn: (data: SignInRequest) => handleSignIn(data),
    onSuccess: (data) => {
      useAuthenticationStore.getState().login(data);
      console.log(data);
      const { accessToken, username } =
        useAuthenticationStore.getState().authentication;
      if (accessToken && username) {
        connectStomp(accessToken, username);
        navigate("/dashboard");
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { signIn, signingIn };
}

export default useSignInMutation;
