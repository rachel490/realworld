import { IArticleItemResponse, IArticleListResponse } from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const articleApi = {
  getGlobalFeed: async (tagName?: string, pageNumber?: number) => {
    const { data } = await realWorldApi.get<IArticleListResponse>(
      API_URI.article.get.GLOBAL_FEED(tagName, pageNumber),
    );
    return data;
  },
  getArticleDetails: async (slug: string) => {
    const { data } = await realWorldApi.get<IArticleItemResponse>(
      API_URI.article.get.ARTICLE_DETAIL(slug),
    );

    return data;
  },
};
