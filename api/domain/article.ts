import {
  IArticleBody,
  IArticleItemResponse,
  IArticleListResponse,
  ILikedArticleResponse,
} from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const articleApi = {
  getGlobalFeed: async (tagName?: string, pageNumber?: number) => {
    const { data } = await realWorldApi.get<IArticleListResponse>(
      API_URI.article.get.GLOBAL_FEED(tagName, pageNumber),
    );
    return data;
  },
  getMyFeed: async (pageNumber?: number) => {
    const { data } = await realWorldApi.get<IArticleListResponse>(
      API_URI.article.get.MY_FEED(pageNumber),
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
  postArticle: async (newArticle: IArticleBody) => {
    const { data } = await realWorldApi.post<IArticleItemResponse>(
      API_URI.article.post.ARTICLE,
      newArticle,
      { params: { isAuth: true } },
    );

    return data;
  },
  updateArticle: async (slug: string, updatedArticle: IArticleBody) => {
    const { data } = await realWorldApi.put<IArticleItemResponse>(
      API_URI.article.update.ARTICLE(slug),
      updatedArticle,
      { params: { isAuth: true } },
    );

    return data;
  },
  deleteArticle: async (slug: string) => {
    await realWorldApi.delete(API_URI.article.delete.ARTICLE(slug), { params: { isAuth: true } });
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
