import type {
  AuthenticationResponse,
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
