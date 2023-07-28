import { realWorldApi } from "@/axios/axios";
import { IProfileResponse } from "@/types";
import { API_URI } from "../apiURI";

export const profileApi = {
  getProfile: async (username: string) => {
    const { data } = await realWorldApi.get<IProfileResponse>(
      API_URI.profile.get.USER_PROFILE(username),
    );

    return data;
  },
  followUser: async (username: string) => {
    const { data } = await realWorldApi.post<IProfileResponse>(
      API_URI.profile.post.FOLLOW_USER(username),
      {},
      { params: { isAuth: true } },
    );

    return data;
  },
  unfollowUser: async (username: string) => {
    const { data } = await realWorldApi.delete<IProfileResponse>(
      API_URI.profile.delete.UNFOLLOW_USER(username),
      { params: { isAuth: true } },
    );

    return data;
  },
};
