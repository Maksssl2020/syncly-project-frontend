import type {
  AuthenticationResponse,
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
} from "../types/authentication.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function handleSignUp(data: SignUpRequest) {
  const response = await axiosConfig.post<void>(
    "/authentication/register",
    data,
  );
  return response.data;
}

export async function handleSignIn(data: SignInRequest) {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/login",
    data,
  );
  return response.data;
}

export async function handle2FA(data: TwoFactorVerificationRequest) {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/verify-2fa",
    data,
  );
  return response.data;
}

export async function handleChangePassword(
  userId: string | number,
  data: ChangePasswordRequest,
) {
  const response = await axiosConfig.put(
    `/authentication/change-password/${userId}`,
    data,
  );
  return response.data;
}

export async function checkUsernameExists(username: string) {
  const response = await axiosConfig.post<boolean>(
    "authentication/exists/username",
    null,
    {
      params: {
        username,
      },
    },
  );
  return response.data;
}

export async function checkEmailExists(email: string) {
  const response = await axiosConfig.post<boolean>(
    "authentication/exists/email",
    null,
    {
      params: {
        email: email,
      },
    },
  );
  return response.data;
}
