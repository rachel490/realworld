/* eslint-disable @typescript-eslint/require-await */

"use server";

import { cookies } from "next/headers";
import { JWTKey } from "@/constants/cookie";

export async function setToken(token: string) {
  cookies().set(JWTKey, token);
}

export async function deleteToken() {
  cookies().delete(JWTKey);
}

export async function getToken() {
  const token = cookies().get(JWTKey)?.value;
  return token;
}

export async function checkToken() {
  return cookies().has(JWTKey);
}
