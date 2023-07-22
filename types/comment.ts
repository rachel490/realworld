import { IAuthor } from "./profile";

export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: IAuthor;
}

export interface ICommentListResponse {
  comments: IComment[];
}

export interface ICommentBody {
  comment: {
    body: string;
  };
}

export interface ICommentItemResponse {
  comment: IComment;
}
