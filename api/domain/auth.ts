import { ILoginBody, IRegisterBody, IUserResponse } from "@/types";
import { realWorldApi } from "../axios";
import { API_URI } from "../apiURI";

export const generatePayloadData = (data: IRegisterBody["user"] | ILoginBody["user"]) => {
  return {
    user: data,
  };
};

export const authApi = {
  signup: async (registerData: IRegisterBody["user"]) => {
    const { data } = await realWorldApi.post<IUserResponse>(
      API_URI.auth.post.SIGN_UP,
      generatePayloadData(registerData),
    );

    return data.user;
  },
  login: async (loginData: ILoginBody["user"]) => {
    const { data } = await realWorldApi.post<IUserResponse>(
      API_URI.auth.post.LOGIN,
      generatePayloadData(loginData),
    );

    return data.user;
  },
};
