import { ICommentListResponse } from "@/types";
import { API_URI } from "../apiURI";
import { realWorldApi } from "../axios";

export const commentsApi = {
  getComments: async (slug: string) => {
    const { data } = await realWorldApi.get<ICommentListResponse>(
      API_URI.article.get.ARTICLE_COMMENT(slug),
    );

    return data.comments;
  },
};
