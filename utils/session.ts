/* eslint-disable import/no-cycle */
import { getServerSession } from "next-auth";
import { getSession as getClientSession } from "next-auth/react";
import { nextAuthOptions } from "@/lib/nextAuth";

export const getSession = async () => {
  const requestEnv = typeof window === "undefined" ? "server" : "client";
  if (requestEnv === "server") {
    const serverSession = await getServerSession(nextAuthOptions);
    return serverSession;
  }
  const session = await getClientSession();
  return session;
};
