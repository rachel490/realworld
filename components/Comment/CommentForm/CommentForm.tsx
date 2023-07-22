"use client";

import { useState } from "react";
import Image from "next/image";
import { ICommentBody } from "@/types";

interface IProps {
  slug: string;
}

function CommentForm({ slug }: IProps) {
  const [content, setContent] = useState<ICommentBody["comment"]["body"]>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // TODO: current user image로 변경해야함.
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
          src="http://i.imgur.com/Qr71crq.jpg"
          className="comment-author-img"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
