import axios, { AxiosError } from "axios";

export const realWorldApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

realWorldApi.interceptors.request.use(
  config => {
    const componentType = typeof window === "undefined" ? "server" : "client";
    console.log("😘 server or client : ", componentType);
    return config;
  },
  error => Promise.reject(error),
);

realWorldApi.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;

    switch (response?.status) {
      case 401:
        console.log("🚨 401 error 🚨");
        break;
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
