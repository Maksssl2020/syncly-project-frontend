import { useMutation } from "@tanstack/react-query";
import { handleSignUp } from "../../api/authentication.ts";
import type { SignUpRequest } from "../../types/authentication.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useSignUpMutation() {
  const { mutate: signUp, isPending: signingUp } = useMutation({
    mutationKey: ["signUpUser"],
    mutationFn: (data: SignUpRequest) => handleSignUp(data),
    onSuccess: () => {
      toast.success("Signed Up successfully");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { signUp, signingUp };
}

export default useSignUpMutation;
