import { ILoginBody, IRegisterBody, IUserResponse, IUserSettingsBody } from "@/types";
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
  currentUser: async () => {
    const { data } = await realWorldApi.get<IUserResponse>(API_URI.auth.get.USER, {
      params: { isAuth: true },
    });

    return data.user;
  },
  updateUser: async (updatedUser: IUserSettingsBody) => {
    const { data } = await realWorldApi.put<IUserResponse>(API_URI.auth.update.USER, updatedUser, {
      params: { isAuth: true },
    });
    return data.user;
  },
};
