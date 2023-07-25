import { IAuthor } from "./profile";

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: IAuthor;
  favorited: boolean;
  favoritesCount: number;
}

export interface IArticleListResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface ILikedAuthor extends Omit<IAuthor, "following"> {
  id: number;
  email: string;
  password: string;
  demo: boolean;
}

export interface ILikedArticle extends IArticle {
  id: number;
  authorId: number;
  favoritedBy: ILikedAuthor[];
}

export interface ILikedArticleResponse {
  article: ILikedArticle;
}

export interface IArticleBody {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    [key: string]: string | string[];
  };
}

export interface IArticleItemResponse {
  article: IArticle;
}
