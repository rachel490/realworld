import { redirect } from "next/navigation";

export const redirectPage = (path: string) => {
  const requestEnv = typeof window === "undefined" ? "server" : "client";
  if (requestEnv === "server") {
    redirect(path);
  } else {
    window.location.href = "/";
  }
};
