import { IUser } from "./auth";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}
