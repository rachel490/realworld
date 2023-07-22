import { ITrendingTagsResponse } from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const tagApi = {
  getTrendingTags: async () => {
    const { data } = await realWorldApi.get<ITrendingTagsResponse>(API_URI.tag.get.TRENDING_TAG);
    return data;
  },
};
