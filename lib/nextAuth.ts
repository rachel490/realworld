/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/hooks/useNextAuth";
import { ILoginBody } from "@/types";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "nextauth-credential",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      authorize: async credentials => {
        const loginData = { email: credentials?.email, password: credentials?.password };
        const response = await login(loginData as ILoginBody["user"]);
        if (response.success && response.user) {
          console.log("logged in user :", response.user);
          return response.user as any;
        }

        console.log("error", response.error);
        throw new Error(JSON.stringify(response?.error));
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
