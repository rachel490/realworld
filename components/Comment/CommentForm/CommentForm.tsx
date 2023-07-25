/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICommentBody } from "@/types";
import { commentsApi } from "@/api/domain/comment";

interface IProps {
  slug: string;
  userImage?: string;
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1690016024119-da444e8451fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

function CommentForm({ slug, userImage }: IProps) {
  const router = useRouter();
  const [content, setContent] = useState<ICommentBody["comment"]["body"]>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { comment } = await commentsApi.postComment(slug, { comment: { body: content } });
    router.refresh();
    setContent("");
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          value={content}
          onChange={handleChange}
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
        />
      </div>
      <div className="card-footer">
        <Image
          alt=""
          width="30"
          height="30"
          src={userImage || PLACEHOLDER_IMAGE}
          className="comment-author-img"
        />
        <button className="btn btn-sm btn-primary" type="submit" disabled={!content.length}>
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
