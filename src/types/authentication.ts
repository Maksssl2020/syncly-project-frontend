import type { Image } from "./image.ts";

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface Authentication {
  userId?: string | number;
  email?: string | number;
  username?: string;
  accessToken?: string;
  role?: string;
  authenticated: boolean;
  profileImage?: Image;
}

export interface AuthenticationResponse {
  userId: string | number;
  username: string;
  email: string;
  accessToken: string;
  role: string;
  profileImage?: Image;
  requiresTwoFactorAuthentication: boolean;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface TwoFactorVerificationRequest {
  userId: string | number;
  code: string;
}
