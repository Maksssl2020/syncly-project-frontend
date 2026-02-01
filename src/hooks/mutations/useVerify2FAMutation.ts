import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { handle2FA } from "../../api/authentication.ts";
import type {
  AuthenticationResponse,
  TwoFactorVerificationRequest,
} from "../../types/authentication.ts";
import { useAuthenticationStore } from "../../store/authenticationStore.ts";
import { connectStomp } from "../../config/stompClient.ts";
import toast from "react-hot-toast";
import type { ApiErrorResponse } from "../../types/types.ts";
import type { AxiosError } from "axios";

function useVerify2FAMutation() {
  const navigate = useNavigate();

  const { mutate: verify2FA, isPending: validating2FA } = useMutation({
    mutationKey: ["verify2FAMutation"],
    mutationFn: (data: TwoFactorVerificationRequest) => handle2FA(data),
    onSuccess: (data: AuthenticationResponse) => {
      if (!data.requiresTwoFactorAuthentication) {
        useAuthenticationStore.getState().login(data);
        const { accessToken, username } =
          useAuthenticationStore.getState().authentication;

        if (accessToken && username) {
          connectStomp(accessToken, username);
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid veridivation code.");
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { verify2FA, validating2FA };
}

export default useVerify2FAMutation;
