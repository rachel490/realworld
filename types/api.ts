export interface IAuthor {
  username: string;
  bio: null | string;
  image: string;
  following: boolean;
}

export interface IFavoritedAuthor extends Omit<IAuthor, "following"> {
  id: number;
  email: string;
  password: string;
  demo: boolean;
}

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

export interface ILikedArticle extends IArticle {
  id: number;
  authorId: number;
  favoritedBy: IFavoritedAuthor[];
}

export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: IAuthor;
}

export interface IUser {
  email: string;
  username: string;
  bio: null | string;
  image: string;
  token: string;
}

export interface ILikedArticleResponse {
  article: ILikedArticle;
}

export interface IProfileResponse {
  profile: IAuthor;
}

export interface ICommentsResponse {
  comments: IComment[];
}

export interface ITrendingTagsResponse {
  tags: string[];
}

export interface IFeedResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticle;
}

export interface IUserResponse {
  user: IUser;
}

export interface ILoginBody {
  email: string;
  password: string;
  [key: string]: string;
}

export interface IAuthError {
  errors: {
    [key: string]: string[];
  };
}

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
  [key: string]: string;
}

export interface ISettingsBody {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  [key: string]: string;
}

export interface ICommentBody {
  body: string;
}

export interface ICommentPayload {
  comment: ICommentBody;
}
