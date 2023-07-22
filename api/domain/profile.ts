import { IProfileResponse } from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const profileApi = {
  getProfile: async (username: string) => {
    const { data } = await realWorldApi.get<IProfileResponse>(
      API_URI.profile.get.USER_PROFILE(username),
    );

    return data;
  },
};
