import axios from "axios";
import { useAuthenticationStore } from "../store/authenticationStore.ts";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const token = useAuthenticationStore.getState().authentication?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    console.log(originalRequest);

    if (error.status === 401 && error.response.data.message.includes("JWT")) {
      useAuthenticationStore.getState().logout();

      if (
        !originalRequest._retry &&
        originalRequest.url === "/authentication/login"
      ) {
        originalRequest._retry = true;
        return instance(originalRequest);
      }
    }

    if (error.response.data.message.includes("JWT")) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default instance;
