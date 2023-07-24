/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICommentBody } from "@/types";
import { commentsApi } from "@/api/domain/comment";

interface IProps {
  slug: string;
  userImage: string;
}

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
        <Image alt="" width="30" height="30" src={userImage} className="comment-author-img" />
        <button className="btn btn-sm btn-primary" type="submit" disabled={!content.length}>
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
