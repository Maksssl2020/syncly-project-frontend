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
  username?: string;
  accessToken?: string;
  role?: string;
  authenticated: boolean;
}

export interface AuthenticationResponse {
  userId: string | number;
  username: string;
  accessToken: string;
  role: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
