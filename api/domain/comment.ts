import { ICommentBody, ICommentItemResponse, ICommentListResponse } from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const commentsApi = {
  getComments: async (slug: string) => {
    const { data } = await realWorldApi.get<ICommentListResponse>(
      API_URI.article.get.ARTICLE_COMMENT(slug),
    );

    return data;
  },
  postComment: async (slug: string, body: ICommentBody) => {
    const { data } = await realWorldApi.post<ICommentItemResponse>(
      API_URI.article.post.ARTICLE_COMMENT(slug),
      body,
      { params: { isAuth: true } },
    );

    return data;
  },
  deleteComment: async (slug: string, commentId: number) => {
    await realWorldApi.delete(API_URI.article.delete.ARTICLE_COMMENT(slug, commentId), {
      params: { isAuth: true },
    });
  },
};
