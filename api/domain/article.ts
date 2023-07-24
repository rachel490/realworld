import { IArticleItemResponse, IArticleListResponse, ILikedArticleResponse } from "@/types";
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
  getUserPostedArticles: async (username: string) => {
    const { data } = await realWorldApi.get<IArticleListResponse>(
      API_URI.article.get.USER_POSTED_ARTICLES(username),
    );

    return data;
  },
  getUserFavoritedArticles: async (username: string) => {
    const { data } = await realWorldApi.get<IArticleListResponse>(
      API_URI.article.get.USER_FAVORITED_ARTICLES(username),
    );

    return data;
  },
  likeArticle: async (slug: string) => {
    const { data } = await realWorldApi.post<ILikedArticleResponse>(
      API_URI.article.post.ARTICLE_LIKE(slug),
      {},
      { params: { isAuth: true } },
    );

    return data;
  },
  unlikeArticle: async (slug: string) => {
    const { data } = await realWorldApi.delete<ILikedArticleResponse>(
      API_URI.article.post.ARTICLE_LIKE(slug),
      { params: { isAuth: true } },
    );

    return data;
  },
};
