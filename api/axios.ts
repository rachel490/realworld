/* eslint-disable no-param-reassign */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { PAGE_LINKS } from "@/constants/links";
import { redirectPage } from "@/utils/redirect";
import { getTokenCookie } from "@/utils/token";

export const realWorldApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    isAuth: false,
  },
  timeout: 5000,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  params?: {
    isAuth: boolean;
  };
}

realWorldApi.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const { params } = config;
    const token = (await getTokenCookie()) || "";
    if (params && params.isAuth) {
      if (!token) {
        redirectPage(PAGE_LINKS.register);
      }
    }
    config.headers.Authorization = `Bearer ${token as string}`;
    return config;
  },
  error => Promise.reject(error),
);

realWorldApi.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const { response } = error;

    switch (response?.status) {
      case 401: {
        const token = await getTokenCookie();
        if (!token) {
          redirectPage(PAGE_LINKS.register);
          console.log("🚨 401 error 🚨 : No Auth");
        }
        break;
      }
      case 403:
        console.log("🚨 403 error 🚨");
        break;
      case 442:
        console.log("🚨 442 error 🚨");
        break;
      default:
    }

    return Promise.reject(error);
  },
);
