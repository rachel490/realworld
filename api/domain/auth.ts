/* eslint-disable consistent-return */
import axios from "axios";
import { API_URI } from "@/api/apiURI";
import { IAuthError, ILoginBody, IUser } from "@/types/api";
import { realWorldApi } from "../axios";

export const login = async (loginData: ILoginBody) => {
  const data = {
    user: loginData,
  };

  try {
    const response = await realWorldApi.post<IUser>(API_URI.auth.post.LOGIN, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError<IAuthError>(error)) {
      const loginError = error.response?.data.errors;

      if (loginError) {
        const errorKey = Object.entries(loginError)[0][0];
        const errorValue = Object.entries(loginError)[0][1][0];
        throw new Error(`${errorKey} ${errorValue}`);
      }

      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred");
  }
};
