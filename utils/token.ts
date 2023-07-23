import { getCookie } from "cookies-next";
import { getToken } from "@/app/action";
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
