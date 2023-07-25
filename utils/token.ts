import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { checkToken, deleteToken, getToken } from "@/app/action";
import { JWTKey } from "@/constants/cookie";

export const getTokenCookie = async () => {
  const requestEnv = typeof window === "undefined" ? "server" : "client";
  if (requestEnv === "server") {
    const serverCookie = await getToken();
    return serverCookie;
  }

  const clientCookie = getCookie(JWTKey);
  return clientCookie;
};

export const deleteTokenCookie = async () => {
  const requestEnv = typeof window === "undefined" ? "server" : "client";
  if (requestEnv === "server") {
    const serverCookie = await deleteToken();
    return serverCookie;
  }

  const clientCookie = deleteCookie(JWTKey);
  return clientCookie;
};

export const checkIsLoggedIn = async () => {
  const requestEnv = typeof window === "undefined" ? "server" : "client";
  if (requestEnv === "server") {
    const hasServerCookie = await checkToken();
    return hasServerCookie;
  }

  const hasClientCookie = hasCookie(JWTKey);
  return hasClientCookie;
};
